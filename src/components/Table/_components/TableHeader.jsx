import { useState } from 'react';

import {
	ColumnVisibility,
	DateRange,
	GlobalFilter,
	HandleEntry,
	HandleExport,
	HandlePDF,
	HandleReload,
	SearchBox,
} from '../_helpers';
// import DateRange from '../components/DateRange';
import { dateRangeColumnId } from '../utils';
import TableTitle from './TableTitle';

const TableHeader = (props) => {
	const [open, setOpen] = useState((prev) => ({
		...prev,
	}));

	const showDateRange = props
		.getAllLeafColumns()
		.some((column) => dateRangeColumnId.includes(column.id));

	return (
		<div key={props.title} className='mb-4 flex flex-col'>
			<div className='mb-4 flex w-full flex-col justify-between gap-2 border-b pb-4 lg:flex-row lg:items-end'>
				<TableTitle
					{...{
						title: props.title,
						subtitle: props.subtitle,
					}}
				/>

				{props.showSearchBox && <SearchBox {...props} />}
			</div>

			<div className='flex w-full items-end justify-between'>
				<div className='flex w-fit items-end gap-2'>
					<GlobalFilter
						{...{
							getHeaderGroups: props.getHeaderGroups,
							getPreFilteredRowModel:
								props.getPreFilteredRowModel,
							title: props.title,
						}}
					/>

					{props.showColumns && (
						<ColumnVisibility
							columns={props.getAllLeafColumns()}
							open={open.columns}
							setOpen={setOpen}
						/>
					)}

					{props?.showDateRange && showDateRange && (
						<DateRange getHeaderGroups={props.getHeaderGroups} />
					)}

					{props.select}
					{props.extraButton}

					{props.onClickPdfDownload && (
						<HandlePDF onClick={props.onClickPdfDownload} />
					)}

					<HandleExport
						{...{
							getAllLeafColumns: props.getAllLeafColumns,
							filteredRows: props.filteredRows,
							title: props.title,
						}}
					/>
					{props.showPdf && (
						<HandlePDF
							{...{
								filteredRows: props.filteredRows,
								title: props.title,
								pdfData: props.pdfData,
								//filterTableHeader: props.filterTableHeader,
								//pdf: props.pdf,
								//extraData: props.extraData,
							}}
						/>
					)}
				</div>

				<div className='flex w-fit items-end gap-2'>
					{props.handleReload && (
						<HandleReload onClick={props.handleReload} />
					)}

					{props.accessor && props.handelAdd && (
						<HandleEntry onClick={props.handelAdd} />
					)}
				</div>
			</div>
		</div>
	);
};

export default TableHeader;
