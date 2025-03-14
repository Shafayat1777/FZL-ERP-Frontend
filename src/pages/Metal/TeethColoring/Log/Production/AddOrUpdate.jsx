import { useEffect } from 'react';
import {
	useMetalTCProduction,
	useMetalTCProductionLog,
	useMetalTCProductionLogByUUID,
} from '@/state/Metal';
import { useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, ReactSelect } from '@/ui';

import { DevTool } from '@/lib/react-hook-devtool';
import {
	SFG_PRODUCTION_SCHEMA_IN_PCS,
	SFG_PRODUCTION_SCHEMA_IN_PCS_NULL,
} from '@util/Schema';
import GetDateTime from '@/util/GetDateTime';

export default function Index({
	modalId = '',
	updateTeethColoringLog = {
		uuid: null,
		order_entry_uuid: null,
		order_description: null,
		item_description: null,
		order_number: null,
		section: null,
		production_quantity: null,
		teeth_coloring_stock: null,
		wastage: null,
	},
	setUpdateTeethColoringLog,
}) {
	const { invalidateQuery } = useMetalTCProduction();
	const { updateData } = useMetalTCProductionLog();
	const { data: dataByUUID } = useMetalTCProductionLogByUUID(
		updateTeethColoringLog.uuid,
		{
			enabled: updateTeethColoringLog.uuid !== null,
		}
	);

	const MAX_QUANTITY =
		Number(updateTeethColoringLog?.teeth_coloring_stock) +
		Number(updateTeethColoringLog?.teeth_molding_prod) +
		Number(dataByUUID?.production_quantity);

	const {
		register,
		handleSubmit,
		errors,
		control,
		Controller,
		reset,
		context,
	} = useRHF(
		{
			...SFG_PRODUCTION_SCHEMA_IN_PCS,
			production_quantity:
				SFG_PRODUCTION_SCHEMA_IN_PCS.production_quantity.max(
					MAX_QUANTITY,
					'Beyond Max Quantity'
				),
		},
		SFG_PRODUCTION_SCHEMA_IN_PCS_NULL
	);

	useEffect(() => {
		if (dataByUUID) {
			reset(dataByUUID);
		}
	}, [dataByUUID]);

	const onClose = () => {
		setUpdateTeethColoringLog((prev) => ({
			...prev,
			uuid: null,
			order_entry_uuid: null,
			order_description: null,
			item_description: null,
			order_number: null,
			section: null,
			production_quantity: null,
			teeth_coloring_stock: null,
			wastage: null,
		}));
		reset(SFG_PRODUCTION_SCHEMA_IN_PCS_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		// Update item
		if (updateTeethColoringLog?.uuid !== null) {
			const updatedData = {
				...data,
				updated_at: GetDateTime(),
			};

			await updateData.mutateAsync({
				url: `/zipper/finishing-batch-production/${updatedData?.uuid}`,
				updatedData: updatedData,
				onClose,
			});
			invalidateQuery();
			return;
		}
	};

	const sectionName = [
		{ label: 'Dying and Iron', value: 'dying_and_iron' },
		{ label: 'Teeth Molding', value: 'teeth_molding' },
		{ label: 'Teeth Cleaning', value: 'teeth_cleaning' },
		{ label: 'Teeth Coloring', value: 'teeth_coloring' },
		{ label: 'Finishing', value: 'finishing' },
		{ label: 'Slider Assembly', value: 'slider_assembly' },
		{ label: 'Coloring', value: 'coloring' },
	];

	return (
		<AddModal
			id={modalId}
			title={`Teeth Coloring Production Log`}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			isSmall={true}
		>
			<FormField label='section' title='Section' errors={errors}>
				<Controller
					name={'section'}
					control={control}
					render={({ field: { onChange } }) => {
						return (
							<ReactSelect
								placeholder='Select Production Area'
								options={sectionName}
								value={sectionName?.find(
									(item) =>
										item.value ==
										updateTeethColoringLog?.section
								)}
								onChange={(e) => onChange(e.value)}
								isDisabled={
									updateTeethColoringLog?.uuid !== null
								}
							/>
						);
					}}
				/>
			</FormField>
			<Input
				label='production_quantity'
				sub_label={`Max: ${MAX_QUANTITY}`}
				{...{ register, errors }}
			/>
			<Input label='remarks' {...{ register, errors }} />
			<DevTool control={control} placement='top-left' />
		</AddModal>
	);
}
