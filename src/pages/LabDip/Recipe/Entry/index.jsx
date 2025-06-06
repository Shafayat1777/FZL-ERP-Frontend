import { Suspense, useCallback, useEffect, useState } from 'react';
import { useLabDipRecipe, useLabDipRecipeDetailsByUUID } from '@/state/LabDip';
import { useOtherMaterialByParams } from '@/state/Other';
import { useAuth } from '@context/auth';
import { FormProvider } from 'react-hook-form';
import { configure, HotKeys } from 'react-hotkeys';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useRHF } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import { Footer } from '@/components/Modal/ui';
import {
	ActionButtons,
	DynamicField,
	FormField,
	Input,
	ReactSelect,
	Textarea,
} from '@/ui';

import nanoid from '@/lib/nanoid';
import { LAB_RECIPE_NULL, LAB_RECIPE_SCHEMA } from '@util/Schema';
import { exclude } from '@/util/Exclude';
import GetDateTime from '@/util/GetDateTime';

import Header from './Header';

export default function Index() {
	const {
		url,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateQueryRecipe,
	} = useLabDipRecipe();
	const { recipe_id, recipe_uuid } = useParams();
	const [status, setStatus] = useState(false);
	const { user } = useAuth();
	const navigate = useNavigate();

	// * used for checking if it is for update*//
	const isUpdate = recipe_uuid !== undefined && recipe_id !== undefined;
	const { data, invalidateQuery: invalidateRecipeDetails } =
		useLabDipRecipeDetailsByUUID(recipe_uuid);
	const {
		register,
		handleSubmit,
		errors,
		reset,
		control,
		Controller,
		useFieldArray,
		getValues,
		watch,
		context: form,
	} = useRHF(LAB_RECIPE_SCHEMA, LAB_RECIPE_NULL);

	useEffect(() => {
		recipe_id !== undefined
			? (document.title = `Order: Update ${recipe_id}`)
			: (document.title = 'Order: Entry');
	}, []);

	const { data: material } = useOtherMaterialByParams(
		'type=dyes,dyes chemicals'
	);
	let excludeItem = exclude(
		watch,
		material,
		'recipe_entry',
		'material_uuid',
		status
	);
	// recipe_entry
	const {
		fields: recipeEntryField,
		append: recipeEntryAppend,
		remove: recipeEntryRemove,
	} = useFieldArray({
		control,
		name: 'recipe_entry',
	});

	useEffect(() => {
		if (data && isUpdate) {
			reset(data);
		}
	}, [data, isUpdate]);

	const [deleteItem, setDeleteItem] = useState({
		itemId: null,
		itemName: null,
	});

	const handleRecipeEntryRemove = (index) => {
		if (getValues(`recipe_entry[${index}].uuid`) !== undefined) {
			setDeleteItem({
				itemId: getValues(`recipe_entry[${index}].uuid`),
				itemName: getValues(`recipe_entry[${index}].uuid`),
			});
			window['recipe_entry_delete'].showModal();
		} else {
			recipeEntryRemove(index);
		}
	};

	const handelRecipeEntryAppend = () => {
		recipeEntryAppend({
			color: '',
			quantity: '',
			remarks: '',
		});
	};
	const onClose = () => reset(LAB_RECIPE_NULL);

	// Submit
	const onSubmit = async (data) => {
		const DEFAULT_SWATCH_APPROVAL_DATE = null;

		// * Update data * //
		if (isUpdate) {
			// * updated order description * //
			const recipe_updated = {
				...data,
				// lab_dip_info_uuid: null,
				approved: data.approved ? 1 : 0,
				status: data.status ? 1 : 0,
				updated_at: GetDateTime(),
			};

			await updateData.mutateAsync({
				url: `/lab-dip/recipe/${data?.uuid}`,
				updatedData: recipe_updated,
				isOnCloseNeeded: false,
			});

			// * updated order entry * //
			const recipe_entry_updated = data.recipe_entry
				.filter((item) => item.uuid)
				.map((item, index) => ({
					...item,
					index: index,
					updated_at: GetDateTime(),
				}));

			const newEntry = data.recipe_entry
				.filter((item) => item.uuid === undefined)
				.map((item) => ({
					...item,
					uuid: nanoid(),
					recipe_uuid: data?.uuid,
					created_at: GetDateTime(),
				}));

			//* Post new entry */ //
			let order_entry_updated_promises = [
				...recipe_entry_updated.map(async (item) => {
					await updateData.mutateAsync({
						url: `/lab-dip/recipe-entry/${item.uuid}`,
						updatedData: item,
						isOnCloseNeeded: false,
					});
				}),

				newEntry.length > 0 &&
					(await postData.mutateAsync({
						url: '/lab-dip/recipe-entry',
						newData: newEntry,
						isOnCloseNeeded: false,
					})),
			];
			await Promise.all(order_entry_updated_promises)
				.then(() => reset(LAB_RECIPE_NULL))
				.then(() => {
					invalidateQueryRecipe();
					navigate(`/lab-dip/recipe/details/${data?.uuid}`);
				})
				.catch((err) => console.log(err));

			// TODO: ReferenceError: Cannot access 'recipe_uuid' before initialization
			//navigate(`/lab-dip/recipe/details/${recipe_uuid}`);

			return;
		}

		// * Add new data*//
		const recipe_uuid = nanoid();
		const created_at = GetDateTime();

		const recipe = {
			...data,
			uuid: recipe_uuid,
			lab_dip_info_uuid: null,
			approved: data.approved ? 1 : 0,
			status: data.status ? 1 : 0,
			created_at,
			created_by: user?.uuid,
		};

		//* Post new order description */ //
		await postData.mutateAsync({
			url,
			newData: recipe,
			isOnCloseNeeded: false,
		});

		const recipe_entry = [...data.recipe_entry].map((item, index) => ({
			...item,
			uuid: nanoid(),
			index: index,
			recipe_uuid,
			created_at,
		}));

		//* Post new entry */ //
		let recipe_entry_promises = [
			await postData.mutateAsync({
				url: '/lab-dip/recipe-entry',
				newData: recipe_entry,
				isOnCloseNeeded: false,
			}),
		];

		await Promise.all(recipe_entry_promises)
			.then(() => reset(LAB_RECIPE_NULL))
			.then(() => {
				invalidateQueryRecipe();
				navigate(`/lab-dip/recipe/details/${recipe_uuid}`);
			})
			.catch((err) => console.log(err));
	};

	// Check if recipe_id is valid
	if (getValues('quantity') === null) return <Navigate to='/not-found' />;

	const handelDuplicateDynamicField = useCallback(
		(index) => {
			const item = getValues(`recipe_entry[${index}]`);
			recipeEntryAppend({ ...item, uuid: undefined });
		},
		[getValues, recipeEntryAppend]
	);

	const handleEnter = (event) => {
		event.preventDefault();
		if (Object.keys(errors).length > 0) return;
	};

	const keyMap = {
		NEW_ROW: 'alt+n',
		COPY_LAST_ROW: 'alt+c',
		ENTER: 'enter',
	};

	const handlers = {
		NEW_ROW: handelRecipeEntryAppend,
		COPY_LAST_ROW: () =>
			handelDuplicateDynamicField(recipeEntryField.length - 1),
		ENTER: (event) => handleEnter(event),
	};

	configure({
		ignoreTags: ['input', 'select', 'textarea'],
		ignoreEventsCondition: function () {},
	});

	const rowClass =
		'group whitespace-nowrap text-left text-sm font-normal tracking-wide';

	return (
		<FormProvider {...form}>
			<HotKeys {...{ keyMap, handlers }}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className='flex flex-col gap-4'
				>
					<Header
						{...{
							register,
							errors,
							control,
							getValues,
							Controller,
							watch,
							is_Approved: getValues('approved'),
							is_Status: getValues('status'),
							isUpdate,
						}}
					/>
					<DynamicField
						title='Recipe Entry'
						handelAppend={handelRecipeEntryAppend}
						tableHead={[
							'Index',
							'Dyes',
							'quantity(Solution %)',
							'remarks',
							'Action',
						].map((item) => (
							<th
								key={item}
								scope='col'
								className='group cursor-pointer select-none whitespace-nowrap bg-secondary py-2 text-left font-semibold tracking-wide text-secondary-content transition duration-300 first:pl-2'
							>
								{item}
							</th>
						))}
					>
						{recipeEntryField.map((item, index) => (
							<tr key={item.id}>
								<td>
									<span className='mx-2'>
										{getValues(
											`recipe_entry[${index}].index`
										)
											? getValues(
													`recipe_entry[${index}].index`
												) + 1
											: index + 1}
									</span>
								</td>
								<td className={`${rowClass}`}>
									<FormField
										label={`recipe_entry[${index}].material_uuid`}
										title='Dyes'
										is_title_needed='false'
										dynamicerror={
											errors?.recipe_entry?.[index]
												?.material_uuid
										}
									>
										<Controller
											name={`recipe_entry[${index}].material_uuid`}
											control={control}
											render={({
												field: { onChange },
											}) => {
												return (
													<ReactSelect
														placeholder='Select Dyes'
														options={material?.filter(
															(inItem) =>
																!excludeItem?.some(
																	(
																		excluded
																	) =>
																		excluded?.value ===
																		inItem?.value
																)
														)}
														value={material?.find(
															(inItem) =>
																inItem.value ==
																getValues(
																	`recipe_entry[${index}].material_uuid`
																)
														)}
														onChange={(e) => {
															onChange(e.value);
															// setUnit({
															// 	...unit,
															// 	[index]: e.unit,
															// });
															setStatus(!status);
														}}
														menuPortalTarget={
															document.body
														}
													/>
												);
											}}
										/>
									</FormField>
								</td>

								{/* Quantity */}
								<td className={` ${rowClass} w-96`}>
									<Input
										label={`recipe_entry[${index}].quantity`}
										is_title_needed='false'
										dynamicerror={
											errors?.recipe_entry?.[index]
												?.quantity
										}
										register={register}
									/>
								</td>

								{/* Remarks */}
								<td className={` ${rowClass} w-96`}>
									<Textarea
										label={`recipe_entry[${index}].remarks`}
										is_title_needed='false'
										dynamicerror={
											errors?.recipe_entry?.[index]
												?.remarks
										}
										register={register}
									/>
								</td>
								<td
									className={`w-16 ${rowClass} border-l-4 border-l-primary`}
								>
									<ActionButtons
										duplicateClick={() =>
											handelDuplicateDynamicField(index)
										}
										removeClick={() =>
											handleRecipeEntryRemove(index)
										}
										showRemoveButton={
											recipeEntryField.length > 1
										}
										showDuplicateButton={false}
									/>
								</td>
							</tr>
						))}
					</DynamicField>
					<Footer buttonClassName='!btn-primary' />
				</form>
			</HotKeys>
			<Suspense>
				<DeleteModal
					modalId={'recipe_entry_delete'}
					title={'Recipe Entry'}
					deleteItem={deleteItem}
					setDeleteItem={setDeleteItem}
					setItems={recipeEntryField}
					url={`/lab-dip/recipe-entry`}
					invalidateQuery={invalidateRecipeDetails}
					deleteData={deleteData}
				/>
			</Suspense>

			{/* <DevTool control={control} placement='top-left' /> */}
		</FormProvider>
	);
}
