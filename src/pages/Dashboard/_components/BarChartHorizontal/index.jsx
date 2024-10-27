'use client';

import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { RefreshCcw, TrendingUp } from 'lucide-react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from 'recharts';
import { useFetch } from '@/hooks';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const daysMap = {
	yesterday: 1,
	last_seven_days: 7,
	last_fifteen_days: 15,
	last_thirty_days: 30,
};

function capitalizeAndRemoveUnderscore(str) {
	return str
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function BarChartHorizontal(props) {
	const [time, setTime] = useState('yesterday');
	const [status, setStatus] = useState(false); 

	let to = format(addDays(new Date(), -1), 'yyyy-MM-dd');
	let from = format(addDays(new Date(), -daysMap[time] || 1), 'yyyy-MM-dd');

	const chartConfig = {
		[props.label2]: {
			label: capitalizeAndRemoveUnderscore(props.label2),
			color: '#4185f4',
		},
		[props.label1]: {
			label: capitalizeAndRemoveUnderscore(props.label1),
			color: '#FF0000',
		},
		label: {
			color: 'hsl(var(--background))',
		},
	};

	const { value: data } = useFetch(
		props.time
			? `${props?.url}?start_date=${from}&end_date=${to}`
			: `${props?.url}`,
		[from, to, props.status]
	);

	return (
		<Card>
			<CardHeader className='flex items-center justify-between'>
				<CardTitle>{props.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<div className='flex items-center justify-between'>
						{props?.total && (
							<div className='rounded-md border border-secondary/30 bg-base-200 px-3 py-1'>
								<span className='text-sm font-semibold'>
									{props?.total_title}: {data?.total_number}
								</span>
							</div>
						)}
						{props?.time && (
							<select
								name='time'
								className='select select-secondary h-8 min-h-0 border-secondary/30 bg-base-200 transition-all duration-100 ease-in-out'
								value={time}
								onChange={(e) => setTime(e.target.value)}>
								<option value='yesterday'>Yesterday</option>
								<option value='last_seven_days'>7 Days</option>
								<option value='last_fifteen_days'>
									15 Days
								</option>
								<option value='last_thirty_days'>
									30 Days
								</option>
							</select>
						) 
						// : (
						// 	<button
						// 		type='button'
						// 		className='btn-filter-outline'
						// 		onClick={() => setStatus((prev) => !prev)}>
						// 		<RefreshCcw className='size-4' />
						// 	</button>
							// <span className='live-indicator'>
							// 	(<span className='live-dot'></span>
							// 	<span className='live-text'> Live</span>)
							// </span>
						// )
						}
					</div>
					<br />
					<BarChart
						accessibilityLayer
						data={data?.chart_data}
						layout='vertical'
						margin={{
							right: 16,
						}}>
						<CartesianGrid horizontal={false} />
						<YAxis
							dataKey='item_name'
							type='category'
							tickLine={true}
							tickMargin={10}
							axisLine={true}
							tickFormatter={(value) => value}
						/>
						<XAxis type='number' />
						<ChartLegend content={<ChartLegendContent />} />
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Bar
							dataKey={props.label2}
							fill={chartConfig[props.label2].color}
							radius={[4, 0, 0, 4]}>
							<LabelList
								dataKey={props.label2}
								position='right'
								fill='black'
								fontSize={12}
							/>
						</Bar>
						<Bar
							dataKey={props.label1}
							fill={chartConfig[props.label1].color}
							radius={[0, 4, 4, 0]}>
							<LabelList
								dataKey={props.label1}
								position='right'
								fill='black'
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}