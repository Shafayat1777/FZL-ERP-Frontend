import {
	DEFAULT_FONT_SIZE,
	tableLayoutStyle,
	xMargin,
} from '@/components/Pdf/ui';
import { DEFAULT_A4_PAGE, getTable, TableHeader } from '@/components/Pdf/utils';

import pdfMake from '..';
import { getPageFooter, getPageHeader } from './utils';

const node = [
	getTable('challan_number', 'C/N'),
	getTable('order_number', 'O/N'),
	getTable('marketing_name', 'Marketing'),
	getTable('party_name', 'Party'),
	getTable('packing_numbers', 'Packing List'),
	getTable('carton_quantity', 'Carton', 'right'),
	getTable('total_quantity', 'Qty', 'right'),
	getTable('total_poly_quantity', 'Poly', 'right'),
];

export default function Index(data) {
	const headerHeight = 100;
	let footerHeight = 50;

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Header
		header: {
			table: getPageHeader(data),
			layout: 'noBorders',
			margin: [xMargin, 30, xMargin, 0],
		},
		// * Page Footer
		footer: (currentPage, pageCount) => ({
			table: getPageFooter({
				currentPage,
				pageCount,
			}),
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE - 2,
		}),

		// * Main Table
		content: [
			{
				table: {
					headerRows: 1,
					widths: [50, 50, '*', '*', '*', 28, 40, 40],
					body: [
						// * Header
						TableHeader(node),
						// * Body
						...(data ?? []).map((item) =>
							node.map((nodeItem) => ({
								text:
									nodeItem.field === 'packing_numbers'
										? (item[nodeItem.field] || []).join(
												', '
											)
										: nodeItem.field === 'receive_status'
											? item[nodeItem.field] === 0
												? 'pending'
												: 'received'
											: item[nodeItem.field],
								style: nodeItem.cellStyle,
								alignment: nodeItem.alignment,
							}))
						),
					],
				},
				layout: tableLayoutStyle,
			},
		],
	});

	return pdfDocGenerator;
}
