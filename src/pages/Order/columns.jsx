import { useMemo } from 'react';

import {
	DateTime,
	EditDelete,
	LinkWithCopy,
	Progress,
	StatusButton,
} from '@/ui';

import { DEFAULT_COLUMNS } from '@/util/Table/DefaultColumns';

export const BuyerColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'short_name',
				header: 'Short Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const PropertiesColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},
			{
				accessorKey: 'type',
				header: 'Type',
				enableColumnFilter: false,
				cell: (info) => {
					return (
						<span className='capitalize'>
							{info.getValue().split('_').join(' ')}
						</span>
					);
				},
			},
			{
				accessorKey: 'item_for',
				header: 'Item For',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>
						{info.getValue().split('_').join(' ')}
					</span>
				),
			},
			{
				accessorKey: 'short_name',
				header: 'Short Name',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},
			{
				accessorKey: 'order_sheet_name',
				header: 'Order Sheet Name',
				enableColumnFilter: false,
				cell: (info) => (
					<span className='capitalize'>{info.getValue()}</span>
				),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const PartyColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'short_name',
				header: 'Short Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'address',
				header: 'Address',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const FactoryColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'party_name',
				header: 'Party Name',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'address',
				header: 'Address',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const MerchandiserColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'party_name',
				header: 'Party Name',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'email',
				header: 'Email',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'address',
				header: 'Address',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const MarketingColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'short_name',
				header: 'Short Name',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'user_designation',
				header: 'Designation',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const InfoColumns = ({
	handelUpdate,
	handelDelete,
	haveAccess,
	data,
}) => {
	return useMemo(
		() => [
			{
				accessorKey: 'id',
				header: 'Sample/Bill/Cash',
				enableColumnFilter: false,
				width: 'w-28',
				cell: (info) => {
					const { is_sample, is_bill, is_cash } = info.row.original;
					return (
						// TODO: need to fix bill vs cash
						<div className='flex gap-6'>
							<StatusButton size='btn-xs' value={is_sample} />
							<StatusButton size='btn-xs' value={is_bill} />
							<StatusButton size='btn-xs' value={is_cash} />
						</div>
					);
				},
			},
			{
				accessorKey: 'order_number',
				header: 'O/N',
				enableColumnFilter: true,
				cell: (info) => (
					<LinkWithCopy
						title={info.getValue()}
						id={info.getValue()}
						uri='/order/details'
					/>
				),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'party_name',
				header: 'Party',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'marketing_name',
				header: 'Marketing',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'merchandiser_name',
				header: 'Merchandiser',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'factory_name',
				header: 'Factory',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'marketing_priority',
				header: 'Priority (Mkt/Fac)',
				enableColumnFilter: false,
				cell: (info) => {
					const { marketing_priority, factory_priority } =
						info.row.original;
					return `${marketing_priority}/${factory_priority}`;
				},
			},
			{
				accessorKey: 'status',
				header: 'Status',
				enableColumnFilter: false,
				cell: (info) => (
					<StatusButton size='btn-xs' value={info.getValue()} />
				),
			},

			...DEFAULT_COLUMNS({ handelUpdate, handelDelete, haveAccess }),
		],
		[data]
	);
};

export const DetailsColumns = ({ handelUpdate, haveAccess, data }) => {
	return useMemo(
		() => [
			{
				accessorKey: 'is_sample',
				header: 'Sample',
				enableColumnFilter: false,
				width: 'w-12',
				cell: (info) => (
					<StatusButton size='btn-sm' value={info.getValue()} />
				),
			},
			{
				accessorKey: 'order_number',
				header: 'O/N',
				enableColumnFilter: true,
				width: 'w-36',
				cell: (info) => (
					<LinkWithCopy
						title={info.getValue()}
						id={info.getValue()}
						uri='/order/details'
					/>
				),
			},
			{
				accessorKey: 'party_name',
				header: 'Party',
				enableColumnFilter: true,
				width: 'w-36',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'order_number_wise_rank',
				header: 'Count',
				enableColumnFilter: false,
				width: 'w-12',
				cell: ({ row }) => {
					const { order_number_wise_rank, order_number_wise_count } =
						row.original;
					return `${order_number_wise_rank} / ${order_number_wise_count}`;
				},
			},
			{
				accessorKey: 'item_description',
				header: 'Item Description',
				enableColumnFilter: false,
				cell: ({ row }) => {
					const { order_description_uuid, order_number } =
						row.original;
					return (
						<LinkWithCopy
							title={row.getValue('item_description')}
							id={order_description_uuid}
							uri={`/order/details/${order_number}`}
						/>
					);
				},
			},
			{
				accessorKey: 'order_type',
				header: 'Type',
				enableColumnFilter: false,
				// cell: (info) =>
				// 	info.getValue().charAt(0).toUpperCase() +
				// 	info.getValue().slice(1),
			},
			{
				accessorKey: 'is_multi_color',
				header: 'Multi Color',
				enableColumnFilter: false,
				cell: (info) => (
					<StatusButton size='btn-sm' value={info.getValue()} />
				),
			},
			{
				accessorFn: (row) =>
					`${row.is_inch ? 'Inch' : row.order_type === 'tape' ? 'Meter' : 'Cm'}`,
				id: 'kg',
				header: 'Size Unit',
				enableColumnFilter: false,
			},
			// {
			// 	accessorKey: 'production_percentage',
			// 	header: 'Progress',
			// 	enableColumnFilter: false,
			// 	cell: (info) => <Progress value={info.getValue() || 0} />,
			// },
			{
				accessorKey: 'marketing_name',
				header: 'Marketing',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'buyer_name',
				header: 'Buyer',
				width: 'w-32',
				enableColumnFilter: false,
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'swatch_count',
				header: 'Swatch Count',
				enableColumnFilter: false,
				cell: (info) => {
					const { order_entry_count, swatch_approval_count } =
						info.row.original;

					return `${swatch_approval_count}/${order_entry_count}`;
				},
			},
			{
				accessorKey: 'price_approval_count',
				header: 'Price App.Count',
				enableColumnFilter: false,
				cell: (info) => {
					const { price_approval_count, order_entry_count } =
						info.row.original;

					return `${price_approval_count}/${order_entry_count}`;
				},
			},
			{
				accessorKey: 'is_swatch_approved',
				header: 'Status',
				enableColumnFilter: false,
				cell: (info) => (
					<StatusButton size='btn-sm' value={info.getValue()} />
				),
			},
			// * for order_details the created_at needs to be order_description_created at
			{
				accessorKey: 'remarks',
				header: 'Remarks',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'created_by_name',
				header: 'Created By',
				enableColumnFilter: false,
				width: 'w-32',
				cell: (info) => info.getValue(),
			},
			{
				accessorKey: 'order_description_created_at',
				header: 'Created',
				enableColumnFilter: false,
				filterFn: 'isWithinRange',
				cell: (info) => <DateTime date={info.getValue()} />,
			},
			{
				accessorKey: 'order_description_updated_at',
				header: 'Updated',
				enableColumnFilter: false,
				cell: (info) => <DateTime date={info.getValue()} />,
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
						showUpdate={haveAccess.includes('update')}
						showDelete={false}
					/>
				),
			},
			// ...DEFAULT_COLUMNS({ handelUpdate, haveAccess }),
		],
		[data]
	);
};
