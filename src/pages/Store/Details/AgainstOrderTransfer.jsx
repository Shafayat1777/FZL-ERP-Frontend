import { AddModal } from '@/components/Modal';
import { useAuth } from '@/context/auth';
import { useFetch, useFetchForRhfReset, useRHF } from '@/hooks';
import nanoid from '@/lib/nanoid';
import { useCommonOrderAgainstCoilRMLog } from '@/state/Common';
import { useMaterialInfo, useMaterialStockToSFG } from '@/state/Store';
import { FormField, Input, ReactSelect } from '@/ui';
import GetDateTime from '@/util/GetDateTime';
import { DevTool } from '@hookform/devtools';
import {
	MATERIAL_TRX_AGAINST_ORDER_NULL,
	MATERIAL_TRX_AGAINST_ORDER_SCHEMA,
} from '@util/Schema';

export default function Index({
	modalId = '',
	updateMaterialDetails = {
		uuid: null,
		name: null,
		stock: null,
	},
	setUpdateMaterialDetails,
}) {
	const { postData } = useMaterialInfo();
	const { invalidateQuery: invalidateMaterialStockToSFG } =
		useMaterialStockToSFG();
	const { invalidateQuery: invalidateCommonOrderAgainstCoilRM } =
		useCommonOrderAgainstCoilRMLog();

	const { user } = useAuth();

	const schema = {
		...MATERIAL_TRX_AGAINST_ORDER_SCHEMA,
		trx_quantity: MATERIAL_TRX_AGAINST_ORDER_SCHEMA.trx_quantity
			.moreThan(0)
			.max(updateMaterialDetails?.stock),
	};

	const { value: order } = useFetch(`/other/order/description/value/label`);

	const { register, handleSubmit, errors, control, Controller, reset } =
		useRHF(schema, MATERIAL_TRX_AGAINST_ORDER_NULL);

	useFetchForRhfReset(
		`/material/stock/${updateMaterialDetails?.material_stock_uuid}`,
		updateMaterialDetails?.material_stock_uuid,
		reset
	);

	const onClose = () => {
		setUpdateMaterialDetails((prev) => ({
			...prev,
			uuid: null,
			stock: 0,
		}));
		reset(MATERIAL_TRX_AGAINST_ORDER_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		// Update item
		if (updateMaterialDetails?.uuid !== null) {
			const updatedData = {
				...data,
				material_uuid: updateMaterialDetails.uuid,
				created_by: user?.uuid,
				uuid: nanoid(),
				created_at: GetDateTime(),
			};

			await postData.mutateAsync({
				url: '/zipper/material-trx-against-order',
				newData: updatedData,
				onClose,
			});

			invalidateMaterialStockToSFG();
			invalidateCommonOrderAgainstCoilRM();
			return;
		}
	};

	const transactionArea = [
		{ label: 'Tape Making', value: 'tape_making' },
		{ label: 'Coil Forming', value: 'coil_forming' },
		{ label: 'Dying and Iron', value: 'dying_and_iron' },
		{ label: 'Metal Gapping', value: 'm_gapping' },
		{ label: 'Vislon Gapping', value: 'v_gapping' },
		{ label: 'Vislon Teeth Molding', value: 'v_teeth_molding' },
		{ label: 'Metal Teeth Molding', value: 'm_teeth_molding' },
		{
			label: 'Teeth Assembling and Polishing',
			value: 'teeth_assembling_and_polishing',
		},
		{ label: 'Metal Teeth Cleaning', value: 'm_teeth_cleaning' },
		{ label: 'Vislon Teeth Cleaning', value: 'v_teeth_cleaning' },
		{ label: 'Plating and Iron', value: 'plating_and_iron' },
		{ label: 'Metal Sealing', value: 'm_sealing' },
		{ label: 'Vislon Sealing', value: 'v_sealing' },
		{ label: 'Nylon T Cutting', value: 'n_t_cutting' },
		{ label: 'Vislon T Cutting', value: 'v_t_cutting' },
		{ label: 'Metal Stopper', value: 'm_stopper' },
		{ label: 'Vislon Stopper', value: 'v_stopper' },
		{ label: 'Nylon Stopper', value: 'n_stopper' },
		{ label: 'Cutting', value: 'cutting' },
		{ label: 'Metal QC and Packing', value: 'm_qc_and_packing' },
		{ label: 'Nylon QC and Packing', value: 'n_qc_and_packing' },
		{ label: 'Vislon QC and Packing', value: 'v_qc_and_packing' },
		{ label: 'Slider QC and Packing', value: 's_qc_and_packing' },
		{ label: 'Die Casting', value: 'die_casting' },
		{ label: 'Slider Assembly', value: 'slider_assembly' },
		{ label: 'Coloring', value: 'coloring' },
		{ label: 'Lab Dip', value: 'lab_dip' },
	];

	return (
		<AddModal
			id={`MaterialTrxAgainstOrder`}
			title={
				'Material Trx Against Order of ' + updateMaterialDetails?.name
			}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			isSmall={true}>
			<FormField
				label='order_description_uuid'
				title='Order'
				errors={errors}>
				<Controller
					name={'order_description_uuid'}
					control={control}
					render={({ field: { onChange } }) => {
						return (
							<ReactSelect
								placeholder='Select Order'
								options={order}
								onChange={(e) => {
									onChange(e.value);
								}}
							/>
						);
					}}
				/>
			</FormField>

			<FormField label='trx_to' title='Transfer To' errors={errors}>
				<Controller
					name={'trx_to'}
					control={control}
					render={({ field: { onChange } }) => {
						return (
							<ReactSelect
								placeholder='Select Transaction Area'
								options={transactionArea}
								onChange={(e) => onChange(e.value)}
							/>
						);
					}}
				/>
			</FormField>

			<Input
				label='trx_quantity'
				sub_label={`Max: ${updateMaterialDetails?.stock}`}
				placeholder={`Max: ${updateMaterialDetails?.stock}`}
				{...{ register, errors }}
			/>
			<Input label='remarks' {...{ register, errors }} />
			<DevTool control={control} placement='top-left' />
		</AddModal>
	);
}
