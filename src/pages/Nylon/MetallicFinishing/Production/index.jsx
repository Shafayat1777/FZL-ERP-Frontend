import { lazy, useMemo, useState } from 'react';
import { useNylonMFProduction } from '@/state/Nylon';
import { BookOpen } from 'lucide-react';
import { useAccess } from '@/hooks';

import { Suspense } from '@/components/Feedback';
import ReactTable from '@/components/Table';
import { CustomLink, LinkWithCopy, StatusButton, Transfer } from '@/ui';

import PageInfo from '@/util/PageInfo';

const Production = lazy(() => import('./Production'));
const Transaction = lazy(() => import('./Transaction'));
const PolyTransfer = lazy(() => import('./PolyTransfer'));

export default function Index() {
	const { data, url, isLoading } = useNylonMFProduction();
	const info = new PageInfo(
		'Metallic Finishing Production',
		url,
		'nylon__metallic_finishing_production'
	);
	const haveAccess = useAccess('nylon__metallic_finishing_production');

	const columns = useMemo(
		() => [
			{
				accessorKey: 'batch_number',
				header: 'Batch No.',
				enableColumnFilter: true,
				cell: (info) => (
					<CustomLink
						label={info.getValue()}
						url={`/planning/finishing-batch/${info.row.original.finishing_batch_uuid}`}
						openInNewTab={true}
					/>
				),
			},
			{
				accessorKey: 'order_number',
				header: 'O/N',
				enableColumnFilter: true,
				cell: (info) => (
					<CustomLink
						label={info.getValue()}
						url={`/order/details/${info.getValue()}`}
						openInNewTab={true}
					/>
				),
			},
			{
				accessorKey: 'item_description',
				header: 'Item Description',
				enableColumnFilter: true,
				cell: (info) => (
					<CustomLink
						label={info.getValue()}
						url={`/order/details/${info.row.original.order_number}/${info.row.original.order_description_uuid}`}
						openInNewTab={true}
					/>
				),
			},
			{
				accessorKey: 'tape',
				header: 'Tape',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'slider',
				header: 'Slider',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'order_type',
				header: 'Type',
				enableColumnFilter: true,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'party_name',
				header: 'Party',
				enableColumnFilter: true,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'is_waterproof',
				header: 'Waterproof',
				enableColumnFilter: false,
				width: 'w-24',
				cell: (info) => (
					<StatusButton size='btn-sm' value={info.getValue()} />
				),
			},
			{
				accessorKey: 'style',
				header: 'Style',
				width: 'w-32',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},
			{
				accessorKey: 'color',
				header: 'Color',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},
			{
				accessorKey: 'color_ref',
				header: 'Color Ref',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'size',
				header: 'Size',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},
			{
				accessorKey: 'unit',
				header: 'Unit',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},
			{
				accessorKey: 'batch_quantity',
				header: <span>Batch QTY</span>,
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'tape_transferred',
				header: <span>Tape (KG)</span>,
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorFn: (row) => row.slider_finishing_stock,
				id: 'slider_finishing_stock',
				header: 'Slider (PCS)',
				enableColumnFilter: false,
				cell: (info) => {
					const { slider_provided } = info.row.original;

					return (
						info.getValue() + (slider_provided ? ` (Provided)` : '')
					);
				},
			},
			{
				accessorKey: 'balance_quantity',
				header: (
					<span>
						Balance
						<br />
						(PCS)
					</span>
				),
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'actions_add_production',
				header: 'Add Production',
				enableColumnFilter: false,
				enableSorting: false,
				hidden: !haveAccess.includes('click_production'),
				cell: (info) => {
					const {
						balance_quantity,
						slider_finishing_stock,
						order_type,
						slider_provided,
					} = info.row.original;

					const access =
						order_type === 'tape'
							? Number(balance_quantity) <= 0
							: Math.min(
									Number(balance_quantity),
									Number(slider_finishing_stock)
								) <= 0;

					return (
						<Transfer
							onClick={() => handelProduction(info.row.index)}
							disabled={access && !slider_provided}
						/>
					);
				},
			},
			{
				accessorKey: 'finishing_prod',
				header: 'Production',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'warehouse',
				header: 'Warehouse',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'action',
				header: 'Sticker',
				enableColumnFilter: false,
				enableSorting: false,
				width: 'w-8',
				cell: (info) => {
					return (
						<button
							type='button'
							className='btn btn-accent btn-sm font-semibold text-white shadow-md'
							onClick={() => handleUpdateSticker(info.row.index)}
						>
							<BookOpen />
						</button>
					);
				},
			},
		],
		[data]
	);
	const [update, setUpdate] = useState({
		uuid: null,
		quantity: null,
	});
	const handleUpdateSticker = (idx) => {
		const val = data[idx];

		setUpdate((prev) => ({
			...prev,
			...val,
		}));

		window['polyModal'].showModal();
	};
	const [updateMFProd, setUpdateMFProd] = useState({
		sfg_uuid: null,
		section: null,
		coloring_prod: null,
		balance_quantity: null,
		nylon_metallic_finishing: null,
		production_quantity_in_kg: null,
		production_quantity: null,
		wastage: null,
		remarks: null,
	});
	const handelProduction = (idx) => {
		const val = data[idx];
		setUpdateMFProd((prev) => ({
			...prev,
			...val,
		}));

		window['MFProdModal'].showModal();
	};

	const [updateMFTRX, setUpdateMFTRX] = useState({
		uuid: null,
		sfg_uuid: null,
		trx_quantity_in_kg: null,
		trx_quantity_in: null,
		trx_from: null,
		trx_to: null,
		remarks: '',
		finishing_prod: null,
	});
	const handelTransaction = (idx) => {
		const val = data[idx];
		setUpdateMFTRX((prev) => ({
			...prev,
			...val,
		}));

		window['MFTrxModal'].showModal();
	};

	if (isLoading)
		return <span className='loading loading-dots loading-lg z-50' />;
	// if (error) return <h1>Error:{error}</h1>;

	return (
		<div>
			<ReactTable title={info.getTitle()} data={data} columns={columns} />
			<Suspense>
				<Production
					modalId='MFProdModal'
					{...{
						updateMFProd,
						setUpdateMFProd,
					}}
				/>
			</Suspense>
			<Suspense>
				<Transaction
					modalId='MFTrxModal'
					{...{
						updateMFTRX,
						setUpdateMFTRX,
					}}
				/>
			</Suspense>
			<Suspense>
				<PolyTransfer
					modalId={'polyModal'}
					{...{
						update,
						setUpdate,
					}}
				/>
			</Suspense>
		</div>
	);
}
