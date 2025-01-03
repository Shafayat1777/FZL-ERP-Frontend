import { useMemo } from 'react';
import { useAccess } from '@/hooks';

import ReactTable from '@/components/Table';

import getColumn from './Column';

export default function Table({ order_entry, total }) {
	const haveAccess = useAccess('order__details');

	const columns = useMemo(
		() =>
			getColumn({
				show_price: haveAccess?.includes('show_price'),
				is_sample: order_entry?.[0]?.is_sample,
			}),
		[order_entry]
	);

	return (
		<ReactTable title='Details' data={order_entry} columns={columns}>
			<tr className='bg-slate-200 text-lg font-bold text-primary'>
				<td colSpan={10} className='text-right'>
					Total:
				</td>
				<td className='px-3 py-1'>{total.Quantity}</td>
				<td className='px-3 py-1'>{total.piQuantity}</td>
				<td className='px-3 py-1'>{total.rejectQuantity}</td>
				<td className='px-3 py-1'>{total.shortQuantity}</td>
				<td></td>
				<td className='px-3 py-1'>{total.deliveryQuantity}</td>
				<td></td>
			</tr>
		</ReactTable>
	);
}
