import { useMemo, useState } from 'react';
import { useDyeingRMLog } from '@/state/Dyeing';
import { useOtherRM } from '@/state/Other';
import { useAccess } from '@/hooks';

import { Suspense } from '@/components/Feedback';
import { DeleteModal } from '@/components/Modal';
import ReactTable from '@/components/Table';
import { DateTime, EditDelete } from '@/ui';

import AddOrUpdate from './AddOrUpdate';

export default function Index({ trxArea = [], info = {} }) {
	const { data, isLoading, deleteData } = useDyeingRMLog(
		`${trxArea?.map((item) => item.value).join(',')}`
	);
	const { invalidateQuery } = useOtherRM(
		'multi-field',
		`${trxArea?.map((item) => item.value).join(',')}`
	);

	const haveAccess = useAccess(info.getTab());

	const columns = useMemo(
		() => [
			{
				accessorKey: 'material_name',
				header: 'Material Name',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},
			{
				accessorKey: 'section',
				header: 'Section',
				enableColumnFilter: false,
				cell: (info) => {
					return (
						<span className='capitalize'>
							{info.getValue()?.replace(/_|n_/g, ' ')}
						</span>
					);
				},
			},
			{
				accessorKey: 'used_quantity',
				header: 'Used QTY',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},
			{
				accessorKey: 'wastage',
				header: 'Wastage',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'created_by_name',
				header: 'Issued By',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'created_at',
				header: 'Created',
				filterFn: 'isWithinRange',
				enableColumnFilter: false,
				width: 'w-24',
				cell: (info) => {
					return <DateTime date={info.getValue()} />;
				},
			},
			{
				accessorKey: 'updated_at',
				header: 'Updated',
				enableColumnFilter: false,
				width: 'w-24',
				cell: (info) => {
					return <DateTime date={info.getValue()} />;
				},
			},
			{
				accessorKey: 'actions',
				header: 'Actions',
				enableColumnFilter: false,
				enableSorting: false,
				hidden:
					!haveAccess.includes('delete') ||
					!haveAccess.includes('update'),
				width: 'w-24',
				cell: (info) => {
					return (
						<EditDelete
							idx={info.row.index}
							handelUpdate={handelUpdate}
							handelDelete={handelDelete}
							showDelete={haveAccess.includes('delete')}
							showUpdate={haveAccess.includes('update')}
						/>
					);
				},
			},
		],
		[data]
	);

	// Update
	const [updateDyeingLog, setUpdateDyeingLog] = useState({
		uuid: null,
	});

	const handelUpdate = (idx) => {
		const selected = data[idx];
		setUpdateDyeingLog((prev) => ({
			...prev,
			...selected,
			trxArea,
		}));
		window[info.getAddOrUpdateModalId()].showModal();
	};

	// Delete
	const [deleteItem, setDeleteItem] = useState({
		itemId: null,
		itemName: null,
	});

	const handelDelete = (idx) => {
		setDeleteItem((prev) => ({
			...prev,
			itemId: data[idx].uuid,
			itemName: data[idx].material_name
				.replace(/#/g, '')
				.replace(/\//g, '-'),
		}));

		window[info.getDeleteModalId()].showModal();
	};
	//invalidateDyeingRM();

	if (isLoading)
		return <span className='loading loading-dots loading-lg z-50' />;

	return (
		<div>
			<ReactTable title={info.getTitle()} data={data} columns={columns} />
			<Suspense>
				<AddOrUpdate
					modalId={info.getAddOrUpdateModalId()}
					{...{
						updateDyeingLog,
						setUpdateDyeingLog,
					}}
				/>
			</Suspense>
			<Suspense>
				<DeleteModal
					modalId={info.getDeleteModalId()}
					title={info.getTitle()}
					{...{
						deleteItem,
						setDeleteItem,
						url: `/material/used`,
						deleteData,
					}}
					invalidateQuery={invalidateQuery}
				/>
			</Suspense>
		</div>
	);
}
