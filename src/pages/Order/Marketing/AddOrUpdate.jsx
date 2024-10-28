import { useAuth } from '@/context/auth';
import { useOrderMarketing } from '@/state/Order';
import { useOtherMarketing } from '@/state/Other';
import { useFetch, useFetchForRhfReset, useRHF } from '@/hooks';

import { AddModal } from '@/components/Modal';
import { FormField, Input, ReactSelect } from '@/ui';

import nanoid from '@/lib/nanoid';
import { MARKETING_NULL, MARKETING_SCHEMA } from '@util/Schema';
import GetDateTime from '@/util/GetDateTime';

export default function Index({
	modalId = '',
	updateMarketing = {
		user_uuid: null,
		uuid: null,
	},
	setUpdateMarketing,
}) {
	const { url, updateData, postData } = useOrderMarketing();
	const { invalidateQuery: invalidateMarketing } = useOtherMarketing();
	const {
		register,
		handleSubmit,
		errors,
		reset,
		Controller,
		control,
		getValues,
		context,
	} = useRHF(MARKETING_SCHEMA, MARKETING_NULL);

	useFetchForRhfReset(
		`/public/marketing/${updateMarketing?.uuid}`,
		updateMarketing?.uuid,
		reset
	);

	const { value: user } = useFetch('/other/marketing-user/value/label');

	const { user: userAth } = useAuth();

	const onClose = () => {
		setUpdateMarketing((prev) => ({
			...prev,
			uuid: null,
			user_uuid: null,
		}));
		reset(MARKETING_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		// Update item
		if (
			updateMarketing?.uuid !== null &&
			updateMarketing?.uuid !== undefined
		) {
			const updatedData = {
				...data,
				updated_at: GetDateTime(),
			};

			await updateData.mutateAsync({
				url: `${url}/${updateMarketing?.uuid}`,
				uuid: updateMarketing?.id,
				updatedData,
				onClose,
			});

			return;
		}
		// Add item
		const updatedData = {
			...data,
			uuid: nanoid(),
			created_by: userAth?.uuid,
			created_at: GetDateTime(),
		};

		await postData.mutateAsync({
			url,
			newData: updatedData,
			onClose,
		});
		invalidateMarketing();
	};

	return (
		<AddModal
			id={modalId}
			title={
				updateMarketing?.uuid !== null
					? 'Update Marketing'
					: 'Marketing'
			}
			formContext={context}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			isSmall={true}>
			<FormField label='user_uuid' title='User' errors={errors}>
				<Controller
					name={'user_uuid'}
					control={control}
					render={({ field: { onChange } }) => {
						return (
							<ReactSelect
								placeholder='Select User'
								options={user}
								value={user?.filter(
									(item) =>
										item.value === getValues('user_uuid')
								)}
								onChange={(e) => {
									onChange(e.value);
								}}
							/>
						);
					}}
				/>
			</FormField>
			<Input label='name' {...{ register, errors }} />
			<Input label='short_name' {...{ register, errors }} />
			<Input label='remarks' {...{ register, errors }} />
		</AddModal>
	);
}
