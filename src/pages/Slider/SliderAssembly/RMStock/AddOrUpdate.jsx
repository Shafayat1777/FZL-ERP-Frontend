import { AddModal } from '@/components/Modal';
import { useAuth } from '@/context/auth';
import { useFetchForRhfReset, useRHF, useUpdateFunc } from '@/hooks';
import nanoid from '@/lib/nanoid';

import { useSliderAssemblyRM, useSliderAssemblyRMLog } from '@/state/Slider';
import { Input, JoinInput } from '@/ui';
import GetDateTime from '@/util/GetDateTime';
import { RM_MATERIAL_USED_NULL, RM_MATERIAL_USED_SCHEMA } from '@util/Schema';
import * as yup from 'yup';

export default function Index({
	modalId = '',
	updateSliderAssemblyStock = {
		uuid: null,
		unit: null,
		slider_assembly: null,
	},
	setUpdateSliderAssemblyStock,
}) {
	const { user } = useAuth();
	const { url, postData } = useSliderAssemblyRM();
	const { invalidateQuery: invalidateSliderAssemblyRMLog } =
		useSliderAssemblyRMLog();
	const MAX_QUANTITY = updateSliderAssemblyStock?.slider_assembly;

	const schema = {
		used_quantity: RM_MATERIAL_USED_SCHEMA.remaining.max(
			updateSliderAssemblyStock?.slider_assembly
		),
		wastage: RM_MATERIAL_USED_SCHEMA.remaining.max(
			MAX_QUANTITY,
			'Must be less than or equal ${MAX_QUANTITY}'
		),
	};

	const { register, handleSubmit, errors, reset, watch } = useRHF(
		schema,
		RM_MATERIAL_USED_NULL
	);

	const onClose = () => {
		setUpdateSliderAssemblyStock((prev) => ({
			...prev,
			uuid: null,
			unit: null,
			slider_assembly: null,
		}));
		reset(RM_MATERIAL_USED_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		const updatedData = {
			...data,

			material_uuid: updateSliderAssemblyStock?.uuid,
			section: 'slider_assembly',
			created_by: user?.uuid,
			created_by_name: user?.name,
			uuid: nanoid(),
			created_at: GetDateTime(),
		};
		await postData.mutateAsync({
			url: '/material/used',
			newData: updatedData,
			onClose,
		});
		invalidateSliderAssemblyRMLog();
	};

	return (
		<AddModal
			id={modalId}
			title={
				updateSliderAssemblyStock?.uuid !== null &&
				'Material Usage Entry'
			}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			isSmall={true}>
			<JoinInput
				label='used_quantity'
				sub_label={`Max: ${Number(updateSliderAssemblyStock?.slider_assembly)}`}
				unit={updateSliderAssemblyStock?.unit}
				max={updateSliderAssemblyStock?.slider_assembly}
				placeholder={`Max: ${Number(updateSliderAssemblyStock?.slider_assembly)}`}
				{...{ register, errors }}
			/>
			<JoinInput
				label='wastage'
				unit={updateSliderAssemblyStock?.unit}
				sub_label={`Max: ${(updateSliderAssemblyStock?.slider_assembly -
					watch('used_quantity') <
				0
					? 0
					: updateSliderAssemblyStock?.slider_assembly -
						watch('used_quantity')
				).toFixed(2)}`}
				placeholder={`Max: ${(updateSliderAssemblyStock?.slider_assembly -
					watch('used_quantity') <
				0
					? 0
					: updateSliderAssemblyStock?.slider_assembly -
						watch('used_quantity')
				).toFixed(2)}`}
				{...{ register, errors }}
			/>
			<Input label='remarks' {...{ register, errors }} />
		</AddModal>
	);
}
