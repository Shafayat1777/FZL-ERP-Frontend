/**
 *? Effective React Query Keys
 ** https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
 ** https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories
 **/

import { all } from 'axios';

import { useDeliveryThreadDashboard } from './Delivery';
import { useOtherThreadOrderPackingList } from './Other';

export const orderQK = {
	all: () => ['order'],

	//* details
	details: () => [...orderQK.all(), 'details'],
	detailsByQuery: (query) => [...orderQK.all(), 'detailsByQuery', query],
	detail: (uuid) => [...orderQK.details(), uuid],
	detailByOrderNumber: (orderNumber) => [...orderQK.details(), orderNumber],
	detailsByOrderDescription: (orderNumber, uuid) => [
		...orderQK.details(),
		orderNumber,
		uuid,
	],

	//* Description
	descriptions: () => [...orderQK.all(), 'description'],
	description: (uuid) => [...orderQK.descriptions(), uuid],
	orderDescriptionWithEntry: (uuid) => [
		...orderQK.descriptions(),
		uuid,
		'entry',
	],

	//* Entry
	entries: () => [...orderQK.all(), 'entries'],
	entry: (uuid) => [...orderQK.entries(), uuid],

	//* info
	info: () => [...orderQK.all(), 'info'],
	infoByUUID: (uuid) => [...orderQK.info(), uuid],

	//* buyers
	buyers: () => [...orderQK.all(), 'buyer'], //* [order, buyer]
	buyer: (uuid) => [...orderQK.buyers(), uuid], //* [order, buyer, uuid]

	//* marketing
	marketings: () => [...orderQK.all(), 'marketing'],
	marketing: (uuid) => [...orderQK.marketings(), uuid],

	//* marketing
	factories: () => [...orderQK.all(), 'factory'],
	factory: (uuid) => [...orderQK.factories(), uuid],

	//* merchandisers
	merchandisers: () => [...orderQK.all(), 'merchandisers'],
	merchandiser: (uuid) => [...orderQK.merchandisers(), uuid],

	//Party
	party: () => [...orderQK.all(), 'party'],
	partyByUUID: (uuid) => [...orderQK.party(), uuid],

	//properties
	properties: () => [...orderQK.all(), 'properties'],
	propertiesByUUID: (uuid) => [...orderQK.party(), uuid],
};

export const adminQK = {
	all: () => ['admin'],

	//* departments
	departments: () => [...adminQK.all(), 'departments'],
	department: (uuid) => [...adminQK.departments(), uuid],

	//* designation
	designations: () => [...adminQK.all(), 'designations'],
	designation: (uuid) => [...adminQK.designations(), uuid],

	//* users
	users: () => [...adminQK.all(), 'users'],
	user: (uuid) => [...adminQK.users(), uuid],

	//* permissions
	permissions: () => [...adminQK.all(), 'permissions'],
	permission: (uuid) => [...adminQK.permissions(), uuid],
};

export const commercialQK = {
	all: () => ['commercial'],

	//* dashboard
	dashboard: () => [...commercialQK.all(), 'dashboard'],
	dashboardByUUID: (uuid) => [...commercialQK.dashboard(), uuid],

	//* bank
	bank: () => [...commercialQK.all(), 'bank'],
	bankByUUID: (uuid) => [...commercialQK.bank(), uuid],

	//* pi
	pi: () => [...commercialQK.all(), 'pi'],
	piByQuery: (params) => [...commercialQK.all(), 'piByQuery', params],
	piCash: () => [...commercialQK.all(), 'pi-cash'],
	piByUUID: (uuid) => [...commercialQK.pi(), uuid],
	piDetailsByUUID: (uuid) => [...commercialQK.pi(), 'details', uuid],
	piDetailsByPiID: (uuid) => [...commercialQK.pi(), 'details-by-id', uuid],
	piByOrderInfo: (orderId, partyId, marketingId) => [
		...commercialQK.pi(),
		'zipper',
		orderId,
		partyId,
		marketingId,
	],
	piThreadByOrderInfo: (orderId, partyId, marketingId) => [
		...commercialQK.pi(),
		'thread',
		orderId,
		partyId,
		marketingId,
	],
	receiveAmount: () => [...commercialQK.all(), 'receive-amount'],
	receiveAmountByUUID: (uuid) => [...commercialQK.receiveAmount(), uuid],
	//* pi-entry
	piEntry: () => [...commercialQK.all(), 'pi-entry'],
	piEntryByUUID: (uuid) => [...commercialQK.piEntry(), uuid],

	//* lc
	lc: () => [...commercialQK.all(), 'lc'],
	lcByQuery: (params) => [...commercialQK.all(), 'lcByQuery', params],
	lcByUUID: (uuid) => [...commercialQK.lc(), uuid],
	lcByPi: (uuid) => [...commercialQK.all(), 'lc-by-pi', uuid],
	lcByNumber: (number) => [...commercialQK.all(), 'lc-by-number', number],

	//* MANUAL PI
	manualPI: (query) => [
		...commercialQK.all(),
		'manual-pi',
		...(query ? [query] : []),
	],
	manualPIDetails: (uuid) => [...commercialQK.manualPI(), 'details', uuid],
};

//* Material Query Keys
export const materialQK = {
	all: () => ['material'],

	//* stock
	stock: () => [...materialQK.all(), 'stock'],
	stockByUUID: (uuid) => [...materialQK.stock(), uuid],

	//* section
	section: () => [...materialQK.all(), 'section'],
	sectionByUUID: (uuid) => [...materialQK.section(), uuid],

	//* types
	type: () => [...materialQK.all(), 'type'],
	typeByUUID: (uuid) => [...materialQK.type(), uuid],

	//* infos
	info: () => [...materialQK.all(), 'info'],
	infoByUUID: (uuid) => [...materialQK.info(), uuid],

	//* trx
	trx: () => [...materialQK.all(), 'trx'],
	trxByUUID: (uuid) => [...materialQK.trx(), uuid],

	//* booking
	booking: () => [...materialQK.all(), 'booking'],
	bookingByUUID: (uuid) => [...materialQK.booking(), uuid],

	//* stock to sfg
	stockToSGF: () => [...materialQK.all(), 'stock-to-sfg'],
	stockToSFGByUUID: (uuid) => [...materialQK.stockToSGF(), uuid],

	//* TrxAgainstOrderDescription//
	trxAgainstOrderDescription: () => [
		...materialQK.all(),
		'trx-against-order-description',
	],
	trxAgainstOrderDescriptionByUUID: (uuid) => [
		...materialQK.trxAgainstOrderDescription(),
		uuid,
	],
};

//* Purchase Query Keys
export const purchaseQK = {
	all: () => ['purchase'],

	//* vendor
	vendor: () => [...purchaseQK.all(), 'vendor'],
	vendorByUUID: (uuid) => [...purchaseQK.vendor(), uuid],

	//* description
	description: () => [...purchaseQK.all(), 'description'],
	descriptionByUUID: (uuid) => [...purchaseQK.description(), uuid],

	//* entry
	entry: () => [...purchaseQK.all(), 'entries'],
	entryByUUID: (uuid) => [...purchaseQK.entry(), uuid],

	//* details
	details: () => [...purchaseQK.all(), 'details'],
	detailsByUUID: (uuid) => [...purchaseQK.details(), uuid],

	//* log
	log: () => [...purchaseQK.all(), 'log'],
};

//Library
export const libraryQK = {
	all: () => ['library'],
	//* users
	users: () => [...libraryQK.all(), 'users'],
	userByUUID: (uuid) => [...libraryQK.users(), uuid],
	//* policies
	policies: () => [...libraryQK.all(), 'policies'],
	policyByUUID: (uuid) => [...libraryQK.policies(), uuid],
};

//Common
export const commonQK = {
	all: () => ['common'],

	//* tapeSFG
	tapeSFG: () => [...commonQK.all(), 'tape/SFG'],
	tapeSFGByUUID: (uuid) => [...commonQK.tapeSFG(), uuid],

	//* tapeProduction
	tapeProduction: () => [...commonQK.all(), 'tape/production'],
	tapeProductionByUUID: (uuid) => [...commonQK.tapeProduction(), uuid],

	//* tapeToCoil
	tapeToCoil: () => [...commonQK.all(), 'tape/to-coil'],
	tapeToCoilByUUID: (uuid) => [...commonQK.tapeToCoil(), uuid],
	//* tapeTransferFromStock
	tapeTransfer: () => [...commonQK.all(), 'tape/transfer'],
	tapeTransferByUUID: (uuid) => [...commonQK.tapeTransfer(), uuid],

	//* tapeRM
	tapeRM: () => [...commonQK.all(), 'tape/rm'],
	tapeRMByUUID: (uuid) => [...commonQK.tapeRM(), uuid],

	//* tapeRequired
	tapeRequired: () => [...commonQK.all(), 'tape/required'],
	tapeRequiredByUUID: (uuid) => [...commonQK.tapeRequired(), uuid],

	//* tapeRMLog
	tapeRMLog: () => [...commonQK.all(), 'tape/rm-log'],
	tapeRMLogByUUID: (uuid) => [...commonQK.tapeRMLog(), uuid],

	//*  Order Against Tape RM Log
	orderAgainstTapeRMLog: () => [
		...commonQK.all(),
		'tape/order/against/rm-log',
	],
	orderAgainstTapeRMLogByUUID: (uuid) => [
		...commonQK.orderAgainstTapeRMLog(),
		uuid,
	],

	//* coilSFG
	coilSFG: () => [...commonQK.all(), 'coil/SFG'],
	coilSFGByUUID: (uuid) => [...commonQK.coilSFG(), uuid],

	//* coilProduction
	coilProduction: () => [...commonQK.all(), 'coil/production'],
	coilProductionByUUID: (uuid) => [...commonQK.coilProduction(), uuid],

	//* coilRM
	coilRM: () => [...commonQK.all(), 'coil/rm'],
	coilRMByUUID: (uuid) => [...commonQK.coilRM(), uuid],

	//* coilRMLog
	coilRMLog: () => [...commonQK.all(), 'coil/rm-log'],
	coilRMLogByUUID: (uuid) => [...commonQK.coilRMLog(), uuid],

	//* coilToStockLog
	coilToStock: () => [...commonQK.all(), 'coil/to-stock'],
	coilToStockByUUID: (uuid) => [...commonQK.coilToStock(), uuid],
	//* coilTransfer
	coilTransfer: () => [...commonQK.all(), 'coil/transfer'],
	coilTransferByUUID: (uuid) => [...commonQK.coilTransfer(), uuid],

	//* materialUsed
	materialUsed: () => [...commonQK.all(), 'material/used'],
	materialUsedByUUID: (uuid) => [...commonQK.materialUsed(), uuid],

	//* Coil Order Against Coil RM Log
	orderAgainstCoilRMLog: () => [
		...commonQK.all(),
		'coil/order/against/rm-log',
	],
	orderAgainstCoilRMLogByUUID: (uuid) => [
		...commonQK.orderAgainstCoilRMLog(),
		uuid,
	],

	//* MATERIAL TRX *//
	materialTrx: () => [...commonQK.all(), 'material/trx'],
	materialTrxByUUID: (uuid) => [...commonQK.materialTrx(), uuid],

	//* Coil to Dyeing
	coilToDyeing: () => [...commonQK.all(), 'coil/to-dyeing'],
	coilToDyeingByUUID: (uuid) => [...commonQK.coilToDyeing(), uuid],

	//* Tape to Dyeing
	tapeToDyeing: () => [...commonQK.all(), 'tape/to-dyeing'],
	tapeToDyeingByUUID: (uuid) => [...commonQK.tapeToDyeing(), uuid],

	//* Multi Color Dashboard
	multiColorDashboard: () => [...commonQK.all(), 'multi-color-dashboard'],
	multiColorDashboardByUUID: (uuid) => [
		...commonQK.multiColorDashboard(),
		uuid,
	],

	//*  Multi Color Log
	multiColorLog: () => [...commonQK.all(), 'multi-color-log'],

	//*  Multi Color Log Tape Received
	multiColorLogTapeReceived: () => [
		...commonQK.all(),
		'multi-color-log/tape-received',
	],
	multiColorLogTapeReceivedByUUID: (uuid) => [
		...commonQK.multiColorLogTapeReceived(),
		uuid,
	],
	//* Tape Assign
	tapeAssign: (query) => [
		...commonQK.all(),
		'tape/assign',
		...(query ? [query] : []),
	],
	tapeAssignByUUID: (uuid) => [...commonQK.tapeAssign(), uuid],
};

//* LabDip
export const labDipQK = {
	all: () => ['labDip'],
	//* dashboard
	dashboard: () => [...labDipQK.all(), 'dashboard'],
	//* recipe
	recipe: () => [...labDipQK.all(), 'recipe'],
	recipeByUUID: (uuid) => [...labDipQK.recipe(), uuid],
	recipeDetailsByUUID: (uuid) => [...labDipQK.recipe(), 'details', uuid],

	//* info
	info: () => [...labDipQK.all(), 'info'],
	infoByUUID: (uuid) => [...labDipQK.info(), uuid],
	//* info Details
	infoByDetails: (uuid) => [...labDipQK.info(), 'details', uuid],

	//* RM
	LabDipRM: () => [...labDipQK.all(), 'rm'],
	LabDipRMByUUID: (uuid) => [...labDipQK.LabDipRM(), uuid],

	//* RM Log
	LabDipRMLog: () => [...labDipQK.all(), 'rm-log'],
	LabDipRMLogByUUID: (uuid) => [...labDipQK.LabDipRMLog(), uuid],

	//* Order Against lab_dip RM Log
	orderAgainstLabDipRMLog: () => [
		...labDipQK.all(),
		'lab_dip/order-against-rm-log',
	],
	orderAgainstLabDipRMLogByUUID: (uuid) => [
		...labDipQK.orderAgainstLabDipRMLog(),
		uuid,
	],
	//* Shade Recipe
	shadeRecipe: () => [...labDipQK.all(), 'shade-recipe'],
	shadeRecipeByUUID: (uuid) => [...labDipQK.shadeRecipe(), uuid],
	//* Shade Recipe Description
	shadeRecipeDescription: () => [
		...labDipQK.all(),
		'shade-recipe/description',
	],
	shadeRecipeDescriptionByUUID: (uuid) => [
		...labDipQK.shadeRecipeDescription(),
		uuid,
	],
	//* Shade Recipe Entry
	shadeRecipeEntry: () => [...labDipQK.all(), 'shade-recipe/entry'],
	shadeRecipeEntryByUUID: (uuid) => [...labDipQK.shadeRecipeEntry(), uuid],
};

//* Dyeing

export const dyeingQK = {
	all: () => ['dyeing'],

	//* RM
	dyeingRM: () => [...dyeingQK.all(), 'rm'],
	dyeingRMByUUID: (uuid) => [...dyeingQK.dyeingRM(), uuid],

	//* RM Log
	dyeingRMLog: () => [...dyeingQK.all(), 'rm-log'],
	dyeingRMLogByUUID: (uuid) => [...dyeingQK.dyeingRMLog(), uuid],

	//* swatch
	swatch: (query) => [...dyeingQK.all(), 'swatch', ...(query ? [query] : [])],
	swatchByUUID: (uuid) => [...dyeingQK.swatch(), uuid],

	//* dummy query for updating swatches
	dyeingDummy: () => [...dyeingQK.all(), 'dummy'],

	//* planning
	planning: () => [...dyeingQK.all(), 'planning'],
	planningByUUID: (uuid) => [...dyeingQK.planning(), uuid],

	//*  batch
	batch: (query) => [...dyeingQK.all(), 'batch', ...(query ? [query] : [])],
	batchByUUID: (uuid) => [...dyeingQK.batch(), uuid],
	//* Order batch
	orderBatch: (params) => [...dyeingQK.all(), 'order-batch', params],
	orderBatchByUUID: (uuid) => [...dyeingQK.orderBatch(), uuid],
	//* Batch Details
	batchDetails: () => [...dyeingQK.all(), 'batch-details'],
	batchDetailsByUUID: (uuid, params = '') => [
		...dyeingQK.batchDetails(),
		uuid,
		params,
	],

	//* Thread Batch
	threadBatch: (query) => [
		...dyeingQK.all(),
		'thread-batch',
		...(query ? [query] : []),
	],
	threadBatchByUUID: (uuid) => [...dyeingQK.threadBatch(), uuid],
	//* Thread Batch Entry
	threadBatchEntry: () => [...dyeingQK.all(), 'thread-batch-entry'],
	threadBatchEntryByUUID: (uuid) => [...dyeingQK.threadBatchEntry(), uuid],
	//* Thread Order Batch
	threadOrderBatch: (params) => [
		...dyeingQK.all(),
		'thread-order-batch',
		params,
	],
	threadOrderBatchByUUID: (uuid) => [...dyeingQK.threadOrderBatch(), uuid],
	//* Thread Batch Details
	threadBatchDetails: () => [...dyeingQK.all(), 'thread-batch-details'],
	threadBatchDetailsByUUID: (uuid, params = '') => [
		...dyeingQK.threadBatchDetails(),
		uuid,
		params,
	],
	//* Order Against dyeing RM Log
	orderAgainstDyeingRMLog: () => [
		...dyeingQK.all(),
		'dyeing/order-against-rm-log',
	],
	orderAgainstDyeingRMLogByUUID: (uuid) => [
		...dyeingQK.orderAgainstDyeingRMLog(),
		uuid,
	],
	//* Dyeing Transfer
	dyeingTransfer: () => [...dyeingQK.all(), 'dyeing-transfer'],
	dyeingTransferByUUID: (uuid) => [...dyeingQK.dyeingTransfer(), uuid],

	//* ? Finishing Batch
	finishingBatch: (query) => [
		...dyeingQK.all(),
		'finishing-batch',
		...(query ? [query] : []),
	],
	finishingBatchByUUID: (uuid, params) => [
		...dyeingQK.finishingBatch(),
		uuid,
		...(params ? [params] : []),
	],
	//* To get finishing batch orders
	finishingBatchOrders: (uuid) => [
		...dyeingQK.finishingBatch(),
		uuid,
		'orders',
	],

	//* Dyeing Dashboard
	dyeingDashboard: (param) => [...dyeingQK.all(), 'dyeing-dashboard', param],

	//* Finishing Dashboard
	finishingDashboard: (from, to) => [
		...dyeingQK.all(),
		'finishing-dashboard',
		from,
		to,
	],

	//* Production Capacity
	productCapacity: () => [...dyeingQK.all(), 'production-capacity'],
	productCapacityByUUID: (uuid) => [...dyeingQK.productCapacity(), uuid],
};

//* Nylon
export const nylonQK = {
	all: () => ['nylon'],
	metallicFinish: () => [...nylonQK.all(), 'metallic-finish'],

	//* Metallic Finishing
	//* Production
	nylonMFProduction: () => [...nylonQK.metallicFinish(), 'production'],
	//* Production Log
	nylonMFProductionLog: () => [...nylonQK.metallicFinish(), 'production-log'],
	nylonMFProductionLogByUUID: (uuid) => [
		...nylonQK.nylonMFProductionLog(),
		uuid,
	],
	//* Trx Log
	nylonMFTrxLog: () => [...nylonQK.metallicFinish(), 'trx-log'],
	nylonMFTrxLogByUUID: (uuid) => [...nylonQK.nylonMFTrxLog(), uuid],

	//* RM
	nylonMetallicFinishingRM: () => [...nylonQK.all(), 'rm'],
	nylonMetallicFinishingRMByUUID: (uuid) => [
		...nylonQK.nylonMetallicFinishingRM(),
		uuid,
	],

	//* RM Log
	nylonMetallicFinishingRMLog: () => [...nylonQK.all(), 'rm-log'],
	nylonMetallicFinishingRMLogByUUID: (uuid) => [
		...nylonQK.nylonMetallicFinishingRMLog(),
		uuid,
	],

	//* Order Against nylonFinishing RM Log
	orderAgainstNylonFinishingRMLog: () => [
		...nylonQK.all(),
		'nylonFinishing/order-against-rm-log',
	],
	orderAgainstNylonFinishingRMLogByUUID: (uuid) => [
		...nylonQK.orderAgainstNylonFinishingRMLog(),
		uuid,
	],
	//*Tape Log
	nylonMetallicTapeLog: () => [...nylonQK.all(), 'metallic-tape-log'],
	nylonMetallicTapeLogByUUID: (uuid) => [...nylonQK.nylonTapeLog(), uuid],
	//*Plastic Finishing
	//*Tape Log
	nylonPlasticFinishingTapeLog: () => [...nylonQK.all(), 'plastic-tape-log'],
	nylonPlasticFinishingTapeLogByUUID: (uuid) => [
		...nylonQK.nylonPlasticFinishingTapeLog(),
	],
	//* Production Log
	nylonPlasticFinishingProductionLog: () => [
		...metalQK.all(),
		'npf-production-log',
	],
	nylonPlasticFinishingProductionLogByUUID: (uuid) => [
		...metalQK.all(),
		'npf-production-log',
		uuid,
	],
	//* Trx Log
	nylonPlasticFinishingTrxLog: () => [...nylonQK.all(), 'npf-trx-log'],
	nylonPlasticFinishingTrxLogByUUID: (uuid) => [
		...nylonQK.nylonPlasticFinishingTrxLog(),
		uuid,
	],

	//* PRODUCTION
	nylonPlasticProduction: () => [...metalQK.all(), 'np-production'],
};
//* Vislon
export const vislonQK = {
	all: () => ['vislon'],

	//* Teeth Molding
	//* RM
	VislonTMRM: () => [...vislonQK.all(), 'vtm-rm'],
	VislonTMRMByUUID: (uuid) => [...vislonQK.VislonTMRM(), uuid],

	//* RM Log
	VislonTMRMLog: () => [...vislonQK.all(), 'vtm-rm-log'],
	VislonTMRMLogByUUID: (uuid) => [...vislonQK.VislonTMRMLog(), uuid],

	//* Order Against vislonTMRMLog //* Order Against vislonTM RM Log
	orderAgainstVislonTMRMLog: () => [
		...vislonQK.all(),
		'vislonTM/order-against-rm-log',
	],
	orderAgainstVislonTMRMLogByUUID: (uuid) => [
		...vislonQK.orderAgainstVislonTMRMLog(),
		uuid,
	],

	//* Vislon Teeth Molding Production combined data
	vislonTMP: () => [...vislonQK.all(), 'vislonTMP'],
	vislonTMPByUUID: (uuid) => [...vislonQK.vislonTMP(), uuid],

	//* Vislon Teeth Molding Transaction combined data
	vislonTMT: () => [...vislonQK.all(), 'vislonTMT'],
	vislonTMTByUUID: (uuid) => [...vislonQK.vislonTMT(), uuid],

	//* Vislon Teeth Molding Production Entry
	vislonTMPEntry: () => [...vislonQK.all(), 'vislonTMPEntry'],
	vislonTMPEntryByUUID: (uuid) => [...vislonQK.vislonTMPEntry(), uuid],

	//* Vislon Teeth Molding Transaction Entry
	vislonTMTEntry: () => [...vislonQK.all(), 'vislonTMTEntry'],
	vislonTMTEntryByUUID: (uuid) => [...vislonQK.vislonTMTEntry(), uuid],

	//* Vislon Teeth Molding Production Log
	vislonTMPLog: () => [...vislonQK.all(), 'vislonTMPLog'],
	vislonTMPLogByUUID: (uuid) => [...vislonQK.vislonTMPLog(), uuid],

	//* Vislon Teeth Molding Transaction Log
	vislonTMTLog: () => [...vislonQK.all(), 'vislonTMTLog'],
	vislonTMTLogByUUID: (uuid) => [...vislonQK.vislonTMTLog(), uuid],
	//* Vislon Teeth Molding Tape Log
	vislonTMTapeLog: () => [...vislonQK.all(), 'vislonTMTapeLog'],
	vislonTMTapeLogByUUID: (uuid) => [...vislonQK.vislonTMTapeLog(), uuid],

	//* Finishing
	//*RM
	VislonFinishingRM: () => [...vislonQK.all(), 'fin-rm'],
	VislonFinishingRMByUUID: (uuid) => [
		...vislonQK.VislonFinishingRM(),
		'rm',
		uuid,
	],

	//*RM Log
	VislonFinishingRMLog: () => [...vislonQK.all(), 'fin-rm-log'],
	VislonFinishingRMLogByUUID: (uuid) => [
		...vislonQK.VislonFinishingRMLog(),
		'rm-log',
		uuid,
	],

	//* Order Against vislonFinishing RM Log
	orderAgainstVislonFinishingRMLog: () => [
		...vislonQK.all(),
		'vislonFinishing/order-against-rm-log',
	],
	orderAgainstVislonFinishingRMLogByUUID: (uuid) => [
		...vislonQK.orderAgainstVislonFinishingRMLog(),
		uuid,
	],

	//* finishing  Production & Transaction combined data
	vislonFinishingProd: () => [...vislonQK.all(), 'vislonFinishingProd'],
	vislonFinishingProdByUUID: (uuid) => [
		...vislonQK.vislonFinishingProd(),
		uuid,
	],

	//* Finishing Production Log
	vislonFinishingProdLog: () => [...vislonQK.all(), 'vislonFinishingProdLog'],

	//* Finishing Transaction Log
	vislonFinishingTrxLog: () => [...vislonQK.all(), 'vislonFinishingTrxLog'],
};

//* Metal

export const metalQK = {
	all: () => ['metal'],

	//* ! Teeth Molding
	//* Transaction Log
	metalTMTrxLog: () => [...metalQK.all(), 'mtm-trx-log'],
	metalTMTrxLogByUUID: (uuid) => [...metalQK.all(), 'mtm-trx-log', uuid],

	//* PRODUCTION Log
	metalTMProductionLog: () => [...metalQK.all(), 'mtm-production-log'],
	metalTMProductionLogByUUID: (uuid) => [
		...metalQK.all(),
		'mtm-production-log',
		uuid,
	],

	//* Tape Log
	metalTMTapeLog: () => [...metalQK.all(), 'mtm-tape-log'],
	metalTMTapeLogByUUID: (uuid) => [...metalQK.all(), 'mtm-tape-log', uuid],

	//* PRODUCTION
	metalTMProduction: () => [...metalQK.all(), 'mtm-production'],

	//* RM
	metalTMRM: () => [...metalQK.all(), 'mtm-rm'],
	metalTMRMByUUID: (uuid) => [...metalQK.metalTMRM(), uuid],

	//* RM Log
	metalTMRMLog: () => [...metalQK.all(), 'mtm-rm-log'],
	metalTMRMLogByUUID: (uuid) => [...metalQK.metalTMRMLog(), uuid],

	//* Order Against Metal TM RM Log
	orderAgainstMetalTMRMLog: () => [
		...metalQK.all(),
		'metalTM/order-against-rm-log',
	],
	orderAgainstMetalTMRMLogByUUID: (uuid) => [
		...metalQK.orderAgainstMetalTMRMLog(),
		uuid,
	],

	//* ! Teeth Coloring
	//* PRODUCTION
	metalTCProduction: () => [...metalQK.all(), 'tc-production'],

	//* Transaction Log
	metalTCTrxLog: () => [...metalQK.all(), 'tc-trx-log'],
	metalTCTrxLogByUUID: (uuid) => [...metalQK.all(), 'tc-trx-log', uuid],

	//* PRODUCTION Log
	metalTCProductionLog: () => [...metalQK.all(), 'tc-production-log'],
	metalTCProductionLogByUUID: (uuid) => [
		...metalQK.all(),
		'tc-production-log',
		uuid,
	],

	//* RM
	metalTCRM: () => [...metalQK.all(), 'tc-rm'],
	metalTCRMByUUID: (uuid) => [...metalQK.metalTCRM(), uuid],

	//* RM Log
	metalTCRMLog: () => [...metalQK.all(), 'tc-rm-log'],
	metalTCRMLogByUUID: (uuid) => [...metalQK.metalTCRMLog(), uuid],
	//* Order Against metalTC RM Log
	orderAgainstMetalTCRMLog: () => [
		...metalQK.all(),
		'metalTC/order-against-rm-log',
	],
	orderAgainstMetalTCRMLogByUUID: (uuid) => [
		...metalQK.orderAgainstMetalTCRMLog(),
		uuid,
	],

	//* ! Finishing
	//* PRODUCTION
	metalFProduction: () => [...metalQK.all(), 'fin-production'],

	//*RM
	metalFinishingRM: () => [...metalQK.all(), 'fin-rm'],
	metalFinishingRMByUUID: (uuid) => [...metalQK.metalFinishingRM(), uuid],

	//*RM Log
	metalFinishingRMLog: () => [...metalQK.all(), 'fin-rm-log'],
	metalFinishingRMLogByUUID: (uuid) => [
		...metalQK.metalFinishingRMLog(),
		uuid,
	],

	//* Order Against metalFinishing RM Log
	orderAgainstMetalFinishingRMLog: () => [
		...metalQK.all(),
		'metalFinishing/order-against-rm-log',
	],
	orderAgainstMetalFinishingRMLogByUUID: (uuid) => [
		...metalQK.orderAgainstmetalFinishingRMLog(),
		uuid,
	],

	//* Finishing  Production log
	metalFinishingProdLog: () => [...metalQK.all(), 'finishingProdLog'],

	//* Finishing Transaction Log
	metalFinishingTrxLog: () => [...metalQK.all(), 'finishingTrxLog'],
};

//* Slider

export const sliderQK = {
	all: () => ['slider'],
	//* Slider Assembly

	//* RM
	sliderAssemblyRM: () => [...sliderQK.all(), 'assembly-rm'],
	sliderAssemblyRMByUUID: (uuid) => [...sliderQK.sliderAssemblyRM(), uuid],

	//* RM Log
	sliderAssemblyRMLog: () => [...sliderQK.all(), 'assembly-rm-log'],
	sliderAssemblyRMLogByUUID: (uuid) => [
		...sliderQK.sliderAssemblyRMLog(),
		uuid,
	],

	//* Slider/Dashboard--> (INFO)
	sliderDashboardInfo: () => [...sliderQK.all(), 'dashboard-info'],
	sliderDashboardInfoByUUID: (uuid) => [
		...sliderQK.sliderDashboardInfo(),
		uuid,
	],

	//* Die Casting --> (STOCK)
	sliderDieCastingStock: () => [...sliderQK.all(), 'dc-stock'],
	sliderDieCastingStockByUUID: (uuid) => [
		...sliderQK.sliderDieCastingStock(),
		uuid,
	],
	sliderDieCastingStockByOrderNumbers: (...uuid) => [
		...sliderQK.sliderDieCastingStock(),
		...uuid,
	],

	//* Die Casting --> (TRANSFER)
	sliderDieCastingTransfer: () => [...sliderQK.all(), 'dc-transfer'],
	sliderDieCastingTransferByUUID: (uuid) => [
		...sliderQK.sliderDieCastingStock(),
		uuid,
	],

	sliderDiecastingTrxLog: () => [...sliderQK.all(), 'dc-trx-log'],

	//* Die Casting --> (BY STOCK)
	sliderDieCastingByStock: () => [...sliderQK.all(), 'dc-by-stock'],
	sliderDieCastingByStockByUUID: (uuid) => [
		...sliderQK.sliderDieCastingByStock(),
		uuid,
	],

	//* Die Casting --> (BY ORDER)
	sliderDieCastingByOrder: () => [...sliderQK.all(), 'dc-by-order'],
	sliderDieCastingByOrderByUUID: (uuid) => [
		...sliderQK.sliderDieCastingByOrder(),
		uuid,
	],

	//* Die Casting --> (PRODUCTION)
	sliderDieCastingProduction: () => [...sliderQK.all(), 'dc-production'],
	sliderDieCastingProductionByUUID: (uuid) => [
		...sliderQK.sliderDieCastingProduction(),
		uuid,
	],

	//* Order Against sliderAssembly RM Log
	orderAgainstSliderAssemblyRMLog: () => [
		...sliderQK.all(),
		'sliderAssembly/order-against-rm-log',
	],
	orderAgainstSliderAssemblyRMLogByUUID: (uuid) => [
		...sliderQK.orderAgainstSliderAssemblyRMLog(),
		uuid,
	],

	//* Die Casting
	//* RM
	sliderDieCastingRM: () => [...sliderQK.all(), 'dc-rm'],
	sliderDieCastingRMByUUID: (uuid) => [
		...sliderQK.sliderDieCastingRM(),
		uuid,
	],

	//* RM Log
	sliderDieCastingRMLog: () => [...sliderQK.all(), 'dc-rm-log'],
	sliderDieCastingRMLogByUUID: (uuid) => [
		...sliderQK.sliderDieCastingRMLog(),
		uuid,
	],
	//* Order Against dieCasting RM Log
	orderAgainstDieCastingRMLog: () => [
		...sliderQK.all(),
		'dieCasting/order-against-rm-log',
	],
	orderAgainstDieCastingRMLogByUUID: (uuid) => [
		...sliderQK.orderAgainstDieCastingRMLog(),
		uuid,
	],

	//* Coloring
	//* RM
	sliderColoringRM: () => [...sliderQK.all(), 'c-rm'],
	sliderColoringRMByUUID: (uuid) => [...sliderQK.sliderColoringRM(), uuid],

	//* RM Log
	sliderColoringRMLog: () => [...sliderQK.all(), 'c-rm-log'],
	sliderColoringRMLogByUUID: (uuid) => [
		...sliderQK.sliderColoringRMLog(),
		uuid,
	],
	//* Order Against sliderColor RM Log
	orderAgainstSliderColorRMLog: () => [
		...sliderQK.all(),
		'sliderFinishing/order-against-rm-log',
	],
	orderAgainstSliderColorRMLogByUUID: (uuid) => [
		...sliderQK.orderAgainstSliderColorRMLog(),
		uuid,
	],

	//* Slider Assembly Stock
	sliderAssemblyStock: () => [...sliderQK.all(), 'assembly-stock'],
	sliderAssemblyStockByUUID: (uuid) => [
		...sliderQK.sliderAssemblyStock(),
		uuid,
	],

	//* Slider Assembly Production
	sliderAssemblyProduction: () => [...sliderQK.all(), 'assembly-production'],
	sliderAssemblyProductionByUUID: (uuid) => [
		...sliderQK.sliderAssemblyProduction(),
		uuid,
	],

	//* Slider Assembly Production Entry
	sliderAssemblyProductionEntry: () => [
		...sliderQK.all(),
		'assembly-production-entry',
	],
	sliderAssemblyProductionEntryByUUID: (uuid) => [
		...sliderQK.sliderAssemblyProductionEntry(),
		uuid,
	],

	//* Slider Assembly Transfer Entry
	sliderAssemblyTransferEntry: () => [
		...sliderQK.all(),
		'assembly-transfer-entry',
	],
	sliderAssemblyTransferEntryByUUID: (uuid) => [
		...sliderQK.sliderAssemblyTransferEntry(),
		uuid,
	],

	//* Slider Assembly Log Joined Production
	sliderAssemblyLogjoinedProduction: () => [
		...sliderQK.all(),
		'assembly-joined-log-production',
	],

	//* Slider Assembly Log Production
	sliderAssemblyLogProduction: () => [
		...sliderQK.all(),
		'assembly-log-production',
	],
	sliderAssemblyLogProductionByUUID: (uuid) => [
		...sliderQK.sliderAssemblyLogProduction(),
		uuid,
	],
	//* Slider Assembly Log Transaction
	sliderAssemblyLogTransaction: () => [
		...sliderQK.all(),
		'assembly-log-transaction',
	],
	sliderAssemblyLogTransactionByUUID: (uuid) => [
		...sliderQK.sliderAssemblyLogTransaction(),
		uuid,
	],

	//* Slider Assembly Stock Transaction
	sliderAssemblyStockTransaction: () => [
		...sliderQK.all(),
		'assembly-stock-transaction',
	],
	sliderAssemblyStockTransactionByUUID: (uuid) => [
		...sliderQK.sliderAssemblyStockTransaction(),
		uuid,
	],

	//* slider assembly stock production
	sliderAssemblyStockProduction: () => [
		...sliderQK.all(),
		'assembly-stock-production',
	],
	sliderAssemblyStockProductionByUUID: (uuid) => [
		...sliderQK.sliderAssemblyStockProduction(),
		uuid,
	],

	//* slider coloring log production
	sliderColoringLogProduction: () => [
		...sliderQK.all(),
		'coloring-log-production',
	],

	//* slider coloring log transaction
	sliderColoringLogTransaction: () => [
		...sliderQK.all(),
		'coloring-log-transaction',
	],

	//* Slider coloring Production
	sliderColoringProduction: () => [...sliderQK.all(), 'coloring-production'],
	sliderColoringProductionByUUID: (uuid) => [
		...sliderQK.sliderColoringProduction(),
		uuid,
	],
};

//* Delivery
export const deliveryQk = {
	all: () => ['delivery'],
	//* Dashboard
	//* Zipper
	deliveryZipperDashboard: () => [...deliveryQk.all(), 'dashboard-zipper'],
	deliveryZipperDashboardByUUID: (uuid) => [
		...deliveryQk.deliveryDashboard(),
		uuid,
	],
	//* Thread
	deliveryThreadDashboard: () => [...deliveryQk.all(), 'dashboard-thread'],
	deliveryThreadDashboardByUUID: (uuid) => [
		...deliveryQk.deliveryThreadDashboard(),
		uuid,
	],

	//* Packing List
	deliveryPackingList: (query) => [
		...deliveryQk.all(),
		'packing-list',
		query,
	],
	deliveryPackingListByUUID: (uuid) => [
		...deliveryQk.deliveryPackingList(),
		uuid,
	],
	deliveryPackingListDetailsByUUID: (uuid) => [
		...deliveryQk.all(),
		'packing-list',
		'details',
		uuid,
	],

	deliveryPackingListByOrderInfoUUID: (order_info_uuid) => [
		...deliveryQk.all(),
		'packing-list',
		'order',
		order_info_uuid,
	],

	deliveryPackingListEntryByPackingListUUID: (packing_list_uuids) => [
		...deliveryQk.all(),
		'packing-list',
		'entry',
		...packing_list_uuids,
	],

	deliveryChallanEntryForPackingListByPackingListUUID: (
		packing_list_uuids
	) => [...deliveryQk.all(), 'challan', 'entry', ...packing_list_uuids],

	//* Packing List Entry
	deliveryPackingListEntry: () => [
		...deliveryQk.all(),
		'packing-list',
		'entry',
	],
	deliveryPackingListEntryByUUID: (uuid) => [
		...deliveryQk.deliveryPackingListEntry(),
		uuid,
	],
	//* Vehicle
	deliveryVehicle: () => [...deliveryQk.all(), 'vehicle'],
	deliveryVehicleByUUID: (uuid) => [...deliveryQk.deliveryVehicle(), uuid],

	//* Carton
	deliveryCarton: () => [...deliveryQk.all(), 'carton'],
	deliveryCartonByUUID: (uuid) => [...deliveryQk.deliveryCarton(), uuid],

	//* RM
	deliveryRM: () => [...deliveryQk.all(), 'rm'],
	deliveryRMByUUID: (uuid) => [...deliveryQk.deliveryRM(), uuid],

	//* RM Log
	deliveryRMLog: () => [...deliveryQk.all(), 'rm-log'],
	deliveryRMLogByUUID: (uuid) => [...deliveryQk.deliveryRMLog(), uuid],

	//*  Order Against Delivery RM Log
	orderAgainstDeliveryRMLog: () => [
		...deliveryQk.all(),
		'order-against-rm-log',
	],
	orderAgainstDeliveryRMLogByUUID: (uuid) => [
		...deliveryQk.orderAgainstDeliveryRMLog(),
		uuid,
	],
};

//Thread
export const threadQK = {
	all: () => ['thread'],

	//Count-length
	countLength: () => [...threadQK.all(), 'count-length'],
	countLengthByUUID: (uuid) => [...threadQK.countLength(), uuid],

	//Machine
	machine: () => [...threadQK.all(), 'machine'],
	machineByUUID: (uuid) => [...threadQK.machine(), uuid],

	//Order-info
	orderInfo: () => [...threadQK.all(), 'order-info'],
	orderInfoByQuery: (query) => [...threadQK.orderInfo(), query],
	orderInfoByUUID: (uuid) => [...threadQK.orderInfo(), uuid],
	detailsByUUID: (uuid) => [...otherQK.all(), 'details-by-uuid', uuid],

	//Order-info-entry
	orderInfoEntry: () => [...threadQK.all(), 'order-info-entry'],
	orderInfoEntryByUUID: (uuid) => [...threadQK.orderInfoEntry(), uuid],

	//Swatch
	swatch: (query) => [...threadQK.all(), 'swatch', ...(query ? [query] : [])],
	swatchByUUID: (uuid) => [...threadQK.swatch(), uuid],

	//DyesCategory
	dyesCategory: () => [...threadQK.all(), 'dyes-category'],
	dyesCategoryByUUID: (uuid) => [...threadQK.dyesCategory(), uuid],

	//Programs
	programs: () => [...threadQK.all(), 'programs'],
	programsByUUID: (uuid) => [...threadQK.programs(), uuid],

	//* Coning
	coning: () => [...threadQK.all(), 'coning'],

	//* log
	ConningProdlog: () => [...threadQK.all(), 'conning/prodlog'],
	ConningTrxlog: () => [...threadQK.all(), 'conning/trxlog'],

	//* prod entry
	ConningProd: () => [...threadQK.all(), 'conning/prod'],
	ConningProdByUUID: (uuid) => [...threadQK.ConningProd(), uuid],

	//* trx entry
	ConningTrx: () => [...threadQK.all(), 'conning/trx'],
	ConningTrxByUUID: (uuid) => [...threadQK.ConningTrx(), uuid],

	//* Challan
	challan: () => [...threadQK.all(), 'challan'],
	challanByUUID: (uuid) => [...threadQK.all(), 'challan', uuid],
	challanDetailsByUUID: (uuid) => [...threadQK.challan(), 'details', uuid],
};

//* OTHER QUERY KEYS
export const otherQK = {
	all: () => ['other'],

	//* HR User
	hrUser: () => [...otherQK.all(), 'hr-user'],
	hrUserByDesignation: (designation) => [
		...otherQK.all(),
		'hr-user-by-designation',
		...(designation ? [designation] : []),
	],
	//*dyes category
	dyesCategory: () => [...otherQK.all(), 'dyes-category'],

	//* Thread Orders

	threadOrders: (query) => [
		...otherQK.all(),
		...(query ? ['thread-orders', query] : ['thread-orders']),
	],
	threadOrderPackingList: () => [
		...otherQK.all(),
		'thread-order-packing-list',
	],
	threadOrdersForChallan: () => [
		...otherQK.all(),
		'thread-orders-for-challan',
	],
	//Order
	order: (query) => [...otherQK.all(), 'order', query],
	orderPackingList: () => [...otherQK.all(), 'order-packing-list'],
	packingList: () => [...otherQK.all(), 'packing-list'],
	orderDescription: (params) => [
		...otherQK.all(),
		'order-description',
		...(params ? [params] : []),
	],
	orderBatchDescription: (params) => [
		...otherQK.all(),
		'order-batch-description',
		...(params ? [params] : []),
	],
	orderEntry: () => [...otherQK.all(), 'order-entry'],
	orderDescriptionByOrderNumber: (orderNumber) => [
		...otherQK.all(),
		'order-description-by-order-number',
		orderNumber,
	],
	orderPropertiesByTypeName: (typeName) => [
		...otherQK.all(),
		'properties-by-type-name',
		typeName,
	],
	orderNumberForZipperByMarketingAndPartyUUID: (
		marketingUUID,
		partyUUID,
		params
	) => [
		...otherQK.all(),
		'order-number',
		'for-zipper',
		'by-marketing-and-party',
		marketingUUID,
		partyUUID,
		params,
	],
	orderNumberForThreadByMarketingAndPartyUUID: (
		marketingUUID,
		partyUUID,
		params
	) => [
		...otherQK.all(),
		'order-number',
		'for-thread',
		'by-marketing-and-party',
		marketingUUID,
		partyUUID,
		params,
	],

	//Vendor
	vendor: () => [...otherQK.all(), 'vendor'],

	//Bank
	bank: () => [...otherQK.all(), 'bank'],

	//Material
	material: () => [...otherQK.all(), 'material'],
	materialByParams: (params) => [...otherQK.all(), 'material', params],
	materialSection: () => [...otherQK.all(), 'material-section'],
	materialType: () => [...otherQK.all(), 'material-type'],

	//Lab Dip
	labDip: () => [...otherQK.all(), 'lab-dip'],

	//Slider Item
	sliderItem: () => [...otherQK.all(), 'slider-item'],

	//slider die-casting type
	sliderDieCastingType: (param) => [
		...otherQK.all(),
		'slider-die-casting-type',
		param,
	],

	//Slider Stock
	sliderStockWithDescription: () => [
		...otherQK.all(),
		'slider-stock-with-description',
	],

	//LC
	lcByPartyUUID: (uuid) => [...otherQK.all(), 'lc-by-party', uuid],

	//PI
	pi: (query) => [...otherQK.all(), 'pi', ...(query ? [query] : [])],

	//Department
	department: () => [...otherQK.all(), 'department'],

	//* Party
	party: (params) => [...otherQK.all(), 'party', ...(params ? [params] : [])],

	//Buyer
	buyer: () => [...otherQK.all(), 'buyer'],

	//Marketing
	marketing: () => [...otherQK.all(), 'marketing'],
	marketingUser: () => [...otherQK.all(), 'marketing-user'],

	//Merchandiser
	merchandiserByPartyUUID: (uuid) => [
		...otherQK.all(),
		'merchandiser-by-party',
		uuid,
	],

	//Factory
	factoryByPartyUUID: (uuid) => [...otherQK.all(), 'factory-by-party', uuid],

	//Delivery
	deliveryPackingListByOrderInfoUUID: (uuid) => [
		...otherQK.all(),
		'delivery-packing-list-by-order-info',
		uuid,
	],
	deliveryPackingListByOrderInfoUUIDAndChallanUUID: (
		uuid,
		challan_uuid,
		item_for
	) => [
		...otherQK.all(),
		'delivery-packing-list-by-order-info-and-challan',
		uuid,
		challan_uuid,
		item_for,
	],

	//* ORDER INFO VALUE LABEL
	orderInfoValueLabel: (query) => [
		...otherQK.all(),
		...(query
			? ['order-info-value-label', query]
			: ['order-info-value-label']),
	],

	//* ORDER PROPERTIES BY ITEM
	orderPropertiesByItem: () => [...otherQK.all(), 'order-properties-by-item'],

	//* ORDER PROPERTIES BY ZIPPER NUMBER
	orderPropertiesByZipperNumber: () => [
		...otherQK.all(),
		'order-properties-by-zipper-number',
	],

	//* ORDER PROPERTIES BY END TYPE
	orderPropertiesByEndType: () => [
		...otherQK.all(),
		'order-properties-by-end-type',
	],

	//* ORDER PROPERTIES BY GARMENTS WASH
	orderPropertiesByGarmentsWash: () => [
		...otherQK.all(),
		'order-properties-by-garments-wash',
	],

	//* ORDER PROPERTIES BY LIGHT PREFERENCE
	orderPropertiesByLightPreference: () => [
		...otherQK.all(),
		'order-properties-by-light-preference',
	],

	//* ORDER PROPERTIES BY END USER
	orderPropertiesByEndUser: () => [
		...otherQK.all(),
		'order-properties-by-end-user',
	],

	//* ORDER PROPERTIES BY SLIDER BODY SHAPE
	orderPropertiesBySliderBodyShape: () => [
		...otherQK.all(),
		'order-properties-by-slider-body-shape',
	],

	//* ORDER PROPERTIES BY SLIDER LINK
	orderPropertiesBySliderLink: () => [
		...otherQK.all(),
		'order-properties-by-slider-link',
	],

	//* ORDER PROPERTIES BY LOCK TYPE
	orderPropertiesByLockType: () => [
		...otherQK.all(),
		'order-properties-by-lock-type',
	],

	//* ORDER PROPERTIES BY PULLER TYPE
	orderPropertiesByPullerType: () => [
		...otherQK.all(),
		'order-properties-by-puller-type',
	],

	//* ORDER PROPERTIES BY PULLER LINK
	orderPropertiesByPullerLink: () => [
		...otherQK.all(),
		'order-properties-by-puller-link',
	],

	//* ORDER PROPERTIES BY COLOR
	orderPropertiesByColor: () => [
		...otherQK.all(),
		'order-properties-by-color',
	],

	//* ORDER PROPERTIES BY HAND
	orderPropertiesByHand: () => [...otherQK.all(), 'order-properties-by-hand'],

	//* ORDER PROPERTIES BY NYLON STOPPER
	orderPropertiesByNylonStopper: () => [
		...otherQK.all(),
		'order-properties-by-nylon-stopper',
	],

	//* ORDER PROPERTIES BY SPECIAL REQUIREMENT
	orderPropertiesBySpecialRequirement: () => [
		...otherQK.all(),
		'order-properties-by-special-requirement',
	],

	//* ORDER PROPERTIES BY COLORING TYPE
	orderPropertiesByColoringType: () => [
		...otherQK.all(),
		'order-properties-by-coloring-type',
	],

	//* ORDER PROPERTIES BY SLIDER
	orderPropertiesBySlider: () => [
		...otherQK.all(),
		'order-properties-by-slider',
	],

	//* ORDER PROPERTIES BY TOP STOPPER
	orderPropertiesByTopStopper: () => [
		...otherQK.all(),
		'order-properties-by-top-stopper',
	],

	//* ORDER PROPERTIES BY BOTTOM STOPPER
	orderPropertiesByBottomStopper: () => [
		...otherQK.all(),
		'order-properties-by-bottom-stopper',
	],

	//* ORDER PROPERTIES BY LOGO TYPE
	orderPropertiesByLogoType: () => [
		...otherQK.all(),
		'order-properties-by-logo-type',
	],

	//* ORDER PROPERTIES BY TEETH TYPE
	orderPropertiesByTeethType: () => [
		...otherQK.all(),
		'order-properties-by-teeth-type',
	],
	//* Vehicle
	vehicle: () => [...otherQK.all(), 'delivery-vehicle'],

	//* Carton
	carton: () => [...otherQK.all(), 'delivery-carton'],
	//* Party All
	partyAll: (params) => [...otherQK.all(), 'party-all'],
	//* Count Length
	countLength: () => [...otherQK.all(), 'thread-count-length'],
	//* All Zipper Thread Order list
	allZipperThreadOrderList: (query) => [
		...otherQK.all(),
		'all-zipper-thread-order-list',
		...(query ? [query] : []),
	],

	shadeRecipe: () => [...otherQK.all(), 'shade-recipe'],

	//* lAB DIP RECIPE
	recipe: (query) => [...otherQK.all(), 'recipe', ...(query ? [query] : [])],

	//*Challan
	challan: () => [...otherQK.all(), 'challan'],

	//* TAPE-COIL
	tapeCoil: (query) => [
		...otherQK.all(),
		'tape-coil',
		...(query ? [query] : []),
	],

	//* GET GIVEN URL DATA
	getURLData: (url) => [...otherQK.all(), 'get-url-data', url],

	//* GET ALL MACHINES
	machines: () => [...otherQK.all(), 'machines'],

	//* GET MACHINES WITH SLOT
	machinesWithSlot: (param) => [
		...otherQK.all(),
		'machines-with-slot',
		param,
	],

	//* GET RM
	rm: (field, param) => [...otherQK.all(), 'rm', field, param],
};

//* Challan
export const challanQK = {
	all: () => ['challan'],

	//Challan
	deliveryChallan: (query) => [
		...challanQK.all(),
		'delivery-challan',
		...(query ? [query] : []),
	],
	deliveryChallanByUUID: (uuid) => [...challanQK.deliveryChallan(), uuid],
	deliveryChallanDetailsByUUID: (uuid) => [
		...challanQK.all(),
		'delivery-challan',
		'details',
		uuid,
	],

	//* Challan Entry
	deliveryChallanEntry: () => [...challanQK.all(), 'delivery-challan-entry'],
	deliveryChallanEntryByUUID: (uuid) => [
		...challanQK.deliveryChallanEntry(),
		uuid,
	],
	deliveryChallanEntryByChallanUUID: (challanUUID) => [
		...challanQK.all(),
		'delivery-challan-entry',
		challanUUID,
	],
};

//* Report
export const reportQK = {
	all: () => ['report'],

	//* Stock
	stock: (from, to) => [...reportQK.all(), 'stock', from, to],
	//*Production Report DateWise
	productionReportDateWise: (from, to, query) => [
		...reportQK.all(),
		'production-report-date-wise',
		from,
		to,
		query,
	],
	productionReportStatementReport: (
		from,
		to,
		party,
		marketing,
		type,
		order
	) => [
		...reportQK.all(),
		'production-report',
		from,
		to,
		party,
		marketing,
		type,
		order,
	],
	//* Zipper Production
	zipperProduction: (query) => [
		...reportQK.all(),
		'zipper-production',
		query,
	],

	//* Thread Production
	threadProduction: (query) => [
		...reportQK.all(),
		'thread-production',
		query,
	],

	//* Daily Challan
	dailyChallan: (query) => [...reportQK.all(), 'daily-challan', query],

	//* PI Register
	piRegister: (query) => [...reportQK.all(), 'pi-register', query],

	//* PI To Be Submitted
	piToBeSubmitted: (query) => [
		...reportQK.all(),
		'pi-to-be-submitted',
		query,
	],

	//* Lc
	lc: (url) => [...reportQK.all(), 'lc' + url],

	//* Production Report
	productionReport: (url) => [...reportQK.all(), `production-report-${url}`],
	//* Delivery Statement
	deliveryStatement: () => [...reportQK.all(), 'delivery-statement-report'],

	//* Production Report Thread Party Wise
	productionReportThreadPartyWise: (query) => [
		...reportQK.all(),
		'production-report-thread-party-wise',
		query,
	],

	// * Sample Report
	sample: (date, is_sample) => [
		...reportQK.all(),
		'sample-report-by-date',
		date,
		is_sample,
	],
	sampleCombined: (date, is_sample) => [
		...reportQK.all(),
		'sample-report-by-date-combined',
		date,
		is_sample,
	],
};

export const marketingQK = {
	all: () => ['marketing'],

	//* Dashboard
	getDashboard: (type) => [...marketingQK.all(), 'dashboard', type],

	//* Teams
	getTeams: () => [...marketingQK.all(), 'teams'],
	getTeamDetails: (uuid) => [...marketingQK.all(), 'teams', 'details', uuid],

	//* Targets
	getTargets: (query) => [
		...marketingQK.all(),
		'targets',
		...(query ? [query] : []),
	],
	getTargetDetails: (uuid) => [...marketingQK.all(), 'targets', uuid],
};

export const planningQK = {
	all: () => ['planning'],

	//*Date Wise Batch Report
	dateWiseBatchReport: (date, item) => [
		...planningQK.all(),
		'date-wise-batch-report',
		date,
		item,
	],
};
