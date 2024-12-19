import { useAccess } from '@/hooks';

import { StatusButton } from '@/ui';

const createColumn = (props) => ({
	...props,
});

const createStockProdColumn = ({ accessorKey, header }) =>
	createColumn({
		accessorKey,
		header,
		enableColumnFilter: false,
		cell: (info) => {
			const stock = Number(info.row.original[`${accessorKey}_stock`]);
			const prod = Number(info.row.original[`${accessorKey}_prod`]);
			return info.getValue() ? info.getValue() : `${stock} / ${prod}`;
		},
	});

const createStatusColumn = ({ accessorKey, header }) =>
	createColumn({
		accessorKey,
		header,
		enableColumnFilter: false,
		cell: (info) => {
			const { company_price, party_price, swatch_approval_date } =
				info.row.original;
			return (
				<div className='flex items-center justify-start gap-2'>
					<StatusButton
						size='btn-xs'
						value={
							Number(company_price) > 0 && Number(party_price) > 0
								? 1
								: 0
						}
						idx={info.row.index + 1}
						// showIdx={true}
					/>
					<StatusButton
						size='btn-xs'
						value={swatch_approval_date ? 1 : 0}
						idx={info.row.index + 1}
						// showIdx={true}
					/>
				</div>
			);
		},
	});

const getColumn = ({
	item_name,
	show_price,
	bleaching,
	sizes,
	order_type,
	is_sample,
}) => {
	// default columns
	const DefaultStartColumn = [
		createColumn({
			accessorKey: 'id',
			header: 'ID',
			enableColumnFilter: false,
			cell: (info) => info.row.index + 1,
		}),
		createStatusColumn({
			accessorKey: 'swatch_status',
			header: (
				<span>
					Status <br /> (Price/Swatch)
				</span>
			),
		}),
		createColumn({
			accessorKey: 'style',
			header: 'Style',
			enableColumnFilter: true,
			cell: (info) => info.getValue(),
		}),
		createColumn({
			accessorKey: 'color',
			header: 'Color',
			enableColumnFilter: true,
			cell: (info) => info.getValue(),
		}),
		// createColumn({
		// 	accessorKey: 'size',
		// 	header: `${sizes.is_inch ? 'Size (Inch)' : 'Size (Meter)'}`,
		// 	enableColumnFilter: true,
		// 	hidden: !(sizes.is_inch || sizes.is_meter),
		// 	cell: (info) => {
		// 		return info.getValue();
		// 	},
		// }),

		createColumn({
			accessorFn: (row) => {
				return `${
					sizes.is_inch
						? Number(row.size * 2.54).toFixed(2)
						: Number(row.size)
				}`;
			},
			id: 'sizes',
			header:
				order_type === 'tape'
					? 'Size (M)'
					: sizes.is_inch
						? 'Size (Inch)'
						: `Size (Cm)`,
			enableColumnFilter: true,
		}),

		createColumn({
			accessorKey: 'quantity',
			header: 'Quantity',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		}),
		createColumn({
			accessorKey: 'total_pi_quantity',
			header: 'PI',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		}),
		createColumn({
			accessorKey: 'total_reject_quantity',
			header: 'Reject',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		}),
		createColumn({
			accessorKey: 'total_short_quantity',
			header: 'Short',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		}),
		createColumn({
			accessorKey: 'bleaching',
			header: 'Bleaching',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		}),

		...(!is_sample
			? [
					createColumn({
						accessorKey: 'dying_and_iron_prod',
						header: (
							<span>
								Tape <br /> Production
							</span>
						),
						enableColumnFilter: false,
						cell: (info) => info.getValue(),
					}),
				]
			: []),
		// createTapRequiredColumn({ measurement }),
	];

	const DefaultEndColumn = [
		...(!is_sample
			? [
					createColumn({
						accessorKey: 'coloring_prod',
						header: 'Slider',
						enableColumnFilter: false,
						cell: (info) => info.getValue(),
					}),
					createStockProdColumn({
						accessorKey: 'finishing',
						header: 'Finishing',
					}),
				]
			: []),

		createColumn({
			accessorKey: 'total_warehouse_quantity',
			header: 'Warehouse',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		}),
		createColumn({
			accessorKey: 'total_delivery_quantity',
			header: 'Delivered',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		}),

		createColumn({
			accessorKey: 'company_price',
			header: (
				<span>
					Price (USD)
					<br />
					(Company/Party)
				</span>
			),
			enableColumnFilter: false,
			hidden: !show_price,
			cell: (info) =>
				Number(info.getValue()) +
				' / ' +
				Number(info.row.original.party_price),
		}),
	];

	// return columns based on item_name
	if (item_name === 'nylon') {
		return [...DefaultStartColumn, ...DefaultEndColumn];
	}
	if (item_name === 'vislon') {
		return [
			...DefaultStartColumn,

			...(!is_sample
				? [
						createStockProdColumn({
							accessorKey: 'teeth_molding',
							header: (
								<span>
									Teeth <br /> Molding
								</span>
							),
						}),
					]
				: []),

			...DefaultEndColumn,
		];
	}
	if (item_name === 'metal') {
		return [
			...DefaultStartColumn,

			...(!is_sample
				? [
						createStockProdColumn({
							accessorKey: 'teeth_molding',
							header: (
								<span>
									Teeth <br /> Molding
								</span>
							),
						}),
						createStockProdColumn({
							accessorKey: 'teeth_coloring',
							header: (
								<span>
									Teeth <br /> Coloring
								</span>
							),
						}),
					]
				: []),

			...DefaultEndColumn,
		];
	}
};

export default getColumn;
