import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';
import { useAccess } from '@/hooks';
import { usePurchaseDescription } from '@/state/Store';
import { DateTime, EditDelete, LinkOnly } from '@/ui';
import PageInfo from '@/util/PageInfo';
import { lazy, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOrUpdate = lazy(() => import('./AddOrUpdate'));
const DeleteModal = lazy(() => import('@/components/Modal/Delete'));

export default function Index() {
	const { data, isLoading, url, deleteData } = usePurchaseDescription();
	console.log({
		data,
	});

	const navigate = useNavigate();
	const info = new PageInfo('Details', url, 'store__receive');
	const haveAccess = useAccess('store__receive');

	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	const columns = useMemo(
		() => [
			{
				accessorKey: 'pd_id',
				header: 'ID',
				enableColumnFilter: false,
				cell: (info) => {
					const { purchase_description_uuid } = info.row.original;
					return (
						<LinkOnly
							uri='/store/receive'
							id={purchase_description_uuid}
							title={info.getValue()}
						/>
					);
				},
			},
			{
				accessorKey: 'vendor_name',
				header: 'Vendor',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'is_local',
				header: 'Local/LC',
				enableColumnFilter: false,
				cell: (info) => {
					return info.getValue() == 1 ? 'Local' : 'LC';
				},
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
				hidden: !haveAccess.includes('update'),
				width: 'w-24',
				cell: (info) => {
					return (
						<EditDelete
							idx={info.row.index}
							handelUpdate={handelUpdate}
							handelDelete={handelDelete}
							// showDelete={false}
						/>
					);
				},
			},
		],
		[data]
	);

	// Add
	const handelAdd = () => navigate('/store/receive/entry');

	// Update
	const [updatePurchase, setUpdatePurchase] = useState({
		uuid: null,
		vendor_uuid: null,
		material_uuid: null,
		section_uuid: null,
		unit: null,
		is_local: null,
	});

	const handelUpdate = (idx) => {
		const { purchase_description_uuid, uuid } = data[idx];
		navigate(`/store/receive/update/${uuid}/${purchase_description_uuid}`);
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
			itemName: data[idx].uuid,
		}));

		window[info.getDeleteModalId()].showModal();
	};

	if (isLoading)
		return <span className='loading loading-dots loading-lg z-50' />;

	return (
		<div className='container mx-auto px-2 md:px-4'>
			<ReactTable
				title={info.getTitle()}
				handelAdd={handelAdd}
				accessor={haveAccess.includes('create')}
				data={data}
				columns={columns}
				extraClass='py-2'
			/>

			{/* <Suspense>
				<AddOrUpdate
					modalId={info.getAddOrUpdateModalId()}
					{...{
						updatePurchase,
						setUpdatePurchase,
					}}
				/>
			</Suspense> */}
			<Suspense>
				<DeleteModal
					modalId={info.getDeleteModalId()}
					title={info.getTitle()}
					{...{
						deleteItem,
						setDeleteItem,
						url,
						deleteData,
					}}
				/>
			</Suspense>
		</div>
	);
}