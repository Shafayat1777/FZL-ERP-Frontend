import { AddModal } from '@/components/Modal';
import { useAuth } from '@/context/auth';
import { useFetchForRhfReset, useRHF, useUpdateFunc } from '@/hooks';
import { useCommonMaterialUsed, useCommonTapeRM } from '@/state/Common';
import { useLabDipRM } from '@/state/LabDip';

import { FormField, Input, ReactSelect } from '@/ui';
import GetDateTime from '@/util/GetDateTime';
import {
	RM_MATERIAL_USED_EDIT_NULL,
	RM_MATERIAL_USED_EDIT_SCHEMA,
} from '@util/Schema';

export default function Index({
	modalId = '',
	updateLabDipRMLog = {
		uuid: null,
		section: null,
		used_quantity: null,
		lab_dip: null,
	},
	setUpdateLabDipRMLog,
}) {
	const { url, updateData } = useCommonMaterialUsed();
	const { invalidateQuery: invalidateLabDipRM } = useLabDipRM();

	const MAX_QUANTITY =
		Number(updateLabDipRMLog?.lab_dip) +
		Number(updateLabDipRMLog?.used_quantity);
	const schema = {
		...RM_MATERIAL_USED_EDIT_SCHEMA,
		used_quantity:
			RM_MATERIAL_USED_EDIT_SCHEMA.used_quantity.max(MAX_QUANTITY),
	};

	const {
		register,
		handleSubmit,
		errors,
		control,
		Controller,
		reset,
		getValues,
		wa,
	} = useRHF(schema, RM_MATERIAL_USED_EDIT_NULL);

	useFetchForRhfReset(
		`${url}/${updateLabDipRMLog?.uuid}`,
		updateLabDipRMLog?.uuid,
		reset
	);

	const onClose = () => {
		setUpdateLabDipRMLog((prev) => ({
			...prev,
			uuid: null,
			section: null,
			used_quantity: null,
			lab_dip: null,
		}));
		reset(RM_MATERIAL_USED_EDIT_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		// Update item
		if (updateLabDipRMLog?.uuid !== null) {
			const updatedData = {
				...data,
				material_name: updateLabDipRMLog?.material_name,
				updated_at: GetDateTime(),
			};

			await updateData.mutateAsync({
				url: `${url}/${updateLabDipRMLog?.uuid}`,
				uuid: updateLabDipRMLog?.uuid,
				updatedData,
				onClose,
			});
			invalidateLabDipRM();

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
		{
			label: 'Metal Teeth Molding',
			value: 'm_teeth_molding',
		},
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
		{ label: 'QC and Packing', value: 'qc_and_packing' },
		{ label: 'Die Casting', value: 'die_casting' },
		{ label: 'Slider Assembly', value: 'slider_assembly' },
		{ label: 'Coloring', value: 'coloring' },
		{ label: 'Lab Dip', value: 'lab_dip' },
	];

	return (
		<AddModal
			id={modalId}
			title={`Teeth Coloring Log of ${updateLabDipRMLog?.material_name}`}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			isSmall={true}>
			<FormField label='section' title='Section' errors={errors}>
				<Controller
					name={'section'}
					control={control}
					render={({ field: { onChange } }) => {
						return (
							<ReactSelect
								placeholder='Select Section'
								options={transactionArea}
								value={transactionArea?.find(
									(item) => item.value == getValues('section')
								)}
								onChange={(e) => onChange(e.value)}
								isDisabled='1'
							/>
						);
					}}
				/>
			</FormField>
			<Input
				label='used_quantity'
				sub_label={`Max: ${Number(updateLabDipRMLog?.lab_dip) + Number(updateLabDipRMLog?.used_quantity)}`}
				placeholder={`Max: ${Number(updateLabDipRMLog?.lab_dip) + Number(updateLabDipRMLog?.used_quantity)}`}
				{...{ register, errors }}
			/>
			<Input
				label='wastage'
				sub_label={`Max: ${Number(updateLabDipRMLog?.lab_dip) + Number(updateLabDipRMLog?.used_quantity)}`}
				placeholder={`Max: ${Number(updateLabDipRMLog?.lab_dip) + Number(updateLabDipRMLog?.used_quantity)}`}
				{...{ register, errors }}
			/>
			<Input label='remarks' {...{ register, errors }} />
		</AddModal>
	);
}
