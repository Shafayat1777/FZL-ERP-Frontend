import ReactTable from '@/components/Table';
import { useAccess } from '@/hooks';
import { useCommercialLC } from '@/state/Commercial';
import { DateTime, EditDelete, LinkWithCopy } from '@/ui';
import PageInfo from '@/util/PageInfo';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
	const navigate = useNavigate();
	const { data, isLoading, url } = useCommercialLC();
	const info = new PageInfo('LC', url, 'commercial__lc');
	const haveAccess = useAccess('commercial__lc');

	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	const columns = useMemo(
		() => [
			{
				accessorKey: 'lc_number',
				header: 'LC Number',
				enableColumnFilter: false,
				cell: (info) => (
					<LinkWithCopy
						title={info.getValue()}
						id={info.getValue()}
						uri={`details`}
					/>
				),
			},
			{
				accessorKey: 'pi_ids',
				header: 'PI ID',
				width: 'w-28',
				enableColumnFilter: false,
				cell: (info) => {
					return info?.getValue()?.map((piId) => {
						if (piId === 'PI-') return '-';
						return (
							<LinkWithCopy
								key={piId}
								title={piId}
								id={piId}
								uri='/commercial/pi/details'
							/>
						);
					});
				},
			},
			{
				accessorKey: 'total_value',
				header: 'Value ($)',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'file_no',
				header: 'File No',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'lc_date',
				header: 'LC Date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'payment_value',
				header: 'Payment Value',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'payment_date',
				header: 'Payment Date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'ldbc_fdbc',
				header: 'LDBC/FDBC',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'acceptance_date',
				header: 'Acceptance Date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'maturity_date',
				header: 'Maturity Date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'commercial_executive',
				header: 'Commercial Executive',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'party_bank',
				header: 'Party Bank',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'production_complete',
				header: 'Production Complete',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'lc_cancel',
				header: 'LC Cancel',
				enableColumnFilter: false,
				cell: (info) => (info.getValue() ? 'Yes' : 'No'),
			},
			{
				accessorKey: 'handover_date',
				header: 'Handover Date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'shipment_date',
				header: 'Shipment Date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'expiry_date',
				header: 'Expiry Date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'ud_no',
				header: 'UD No',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'ud_received',
				header: 'UD Received',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'at_sight',
				header: 'At Sight',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'amd_date',
				header: 'Amendment Date',
				enableColumnFilter: false,
				cell: (info) => (
					<DateTime date={info.getValue()} isTime={false} />
				),
			},
			{
				accessorKey: 'amd_count',
				header: 'Amendment Count',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'problematical',
				header: 'Problematic',
				enableColumnFilter: false,
				cell: (info) => (info.getValue() ? 'Yes' : 'No'),
			},
			{
				accessorKey: 'epz',
				header: 'EPZ',
				enableColumnFilter: false,
				cell: (info) => (info.getValue() ? 'Yes' : 'No'),
			},
			{
				accessorKey: 'created_at',
				header: 'Created At',
				enableColumnFilter: false,
				cell: (info) => <DateTime date={info.getValue()} />,
			},
			{
				accessorKey: 'updated_at',
				header: 'Updated',
				enableColumnFilter: false,
				cell: (info) => <DateTime date={info.getValue()} />,
			},
			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'actions',
				header: 'Actions',
				enableColumnFilter: false,
				enableSorting: false,
				hidden: !haveAccess.includes('update'),
				width: 'w-24',
				cell: (info) => (
					<EditDelete
						idx={info.row.index}
						handelUpdate={handelUpdate}
						showDelete={false}
					/>
				),
			},
		],
		[data]
	);

	const handelAdd = () => navigate('/commercial/lc/entry');

	const handelUpdate = (idx) => {
		const uuid = data[idx]?.uuid;
		navigate(`/commercial/lc/update/${uuid}`);
	};

	if (isLoading)
		return <span className='loading loading-dots loading-lg z-50' />;

	return (
		<div className='container mx-auto px-2 md:px-4'>
			<ReactTable
				title={info.getTitle()}
				data={data}
				columns={columns}
				accessor={haveAccess.includes('create')}
				handelAdd={handelAdd}
				extraClass='py-2'
			/>
		</div>
	);
}
