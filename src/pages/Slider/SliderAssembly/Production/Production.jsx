import { useAuth } from '@/context/auth';
import {
	useSliderAssemblyProduction,
	useSliderAssemblyProductionEntry,
} from '@/state/Slider';
import { DevTool } from '@hookform/devtools';
import { useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { JoinInput, Textarea } from '@/ui';

import nanoid from '@/lib/nanoid';
import {
	NUMBER_REQUIRED,
	SLIDER_ASSEMBLY_PRODUCTION_ENTRY_NULL,
	SLIDER_ASSEMBLY_PRODUCTION_ENTRY_SCHEMA,
} from '@util/Schema';
import GetDateTime from '@/util/GetDateTime';

export default function Index({
	modalId = '',
	updateSliderProd = {
		uuid: null,
		stock_uuid: null,
		production_quantity: null,
		section: null,
		wastage: null,
		remarks: '',
	},
	setUpdateSliderProd,
}) {
	const { postData, url } = useSliderAssemblyProductionEntry();
	const { invalidateQuery} = useSliderAssemblyProduction();
	const { user } = useAuth();

	const MAX_PROD_KG = Number(updateSliderProd.balance_quantity).toFixed(3);
	const MAX_PROD =
		updateSliderProd?.end_type_name == 'Open End'
			? Math.floor(Number(updateSliderProd.open_end_min_quantity))
			: Math.floor(Number(updateSliderProd.close_end_min_quantity));

	const { register, handleSubmit, errors, reset, watch, control, context } =
		useRHF(
			{
				...SLIDER_ASSEMBLY_PRODUCTION_ENTRY_SCHEMA,
				production_quantity: NUMBER_REQUIRED.max(
					MAX_PROD,
					'Beyond Max'
				),
			},
			SLIDER_ASSEMBLY_PRODUCTION_ENTRY_NULL
		);

	// TODO: Wastage
	const MAX_WASTAGE_KG = Number(
		MAX_PROD_KG - (watch('production_quantity_in_kg') || 0)
	).toFixed(3);

	const onClose = () => {
		setUpdateSliderProd((prev) => ({
			...prev,
			uuid: null,
			stock_uuid: null,
			production_quantity: null,
			section: null,
			wastage: null,
			remarks: '',
		}));

		reset(SLIDER_ASSEMBLY_PRODUCTION_ENTRY_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		const updatedData = {
			...data,
			uuid: nanoid(),
			stock_uuid: updateSliderProd?.uuid,
			section: 'sa_prod',
			created_by: user?.uuid,
			created_at: GetDateTime(),
		};

		await postData.mutateAsync({
			url,
			newData: updatedData,
			onClose,
		});

		invalidateQuery();
	};

	return (
		<AddModal
			id='TeethMoldingProdModal'
			title={'Slider Assembly ⇾ Production'}
			subTitle={`
				${updateSliderProd.order_number} -> 
				${updateSliderProd.item_description} -> 
				${updateSliderProd.item_name} 
				`}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			isSmall={true}>
			<JoinInput
				title='Production Quantity'
				label='production_quantity'
				unit='PCS'
				sub_label={`MAX: ${MAX_PROD} PCS`}
				{...{ register, errors }}
			/>
			<JoinInput
				title='wastage'
				label='wastage'
				unit='PCS'
				sub_label={`MAX: ${MAX_WASTAGE_KG} PCS`}
				{...{ register, errors }}
			/>
			<Textarea label='remarks' {...{ register, errors }} />
			<DevTool control={control} placement='top-left' />
		</AddModal>
	);
}
