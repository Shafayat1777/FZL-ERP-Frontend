import { flexRender } from '@tanstack/react-table';

import { cn } from '@/lib/utils';

import FilterColumn from '../_helpers/globalFilter/FilterColumn';
import { SortingIndicator } from '../ui';

const TableHead = ({ getHeaderGroups, getPreFilteredRowModel }) => {
	return (
		<thead className='select-none border-b-2 border-primary/30 bg-base-200 text-sm text-primary'>
			<tr>
				{getHeaderGroups().map(({ headers }) =>
					headers.map(
						({
							id,
							getContext,
							column,
							colSpan,
							isPlaceholder,
						}) => (
							<th
								key={id}
								colSpan={colSpan}
								className={cn(
									'group space-y-1 whitespace-nowrap px-3 py-2 text-left font-semibold tracking-wide text-primary first:pl-6',
									column.getCanSort()
										? 'cursor-pointer select-none transition duration-300 hover:bg-secondary/10'
										: null
								)}
								onClick={
									!column.getCanFilter()
										? column.getToggleSortingHandler()
										: undefined
								}
							>
								{!isPlaceholder && (
									<div
										className={cn(
											'flex place-items-baseline gap-1 place-self-start',
											column.columnDef.width
										)}
										onClick={column.getToggleSortingHandler()}
									>
										{flexRender(
											column.columnDef.header,
											getContext()
										)}
										<SortingIndicator
											type={column.getIsSorted()}
											canSort={column.getCanSort()}
										/>
									</div>
								)}
								{column.getCanFilter() ? (
									<FilterColumn
										{...{ column, getPreFilteredRowModel }}
									/>
								) : null}
							</th>
						)
					)
				)}
			</tr>
		</thead>
	);
};

export default TableHead;
