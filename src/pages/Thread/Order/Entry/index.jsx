import { Suspense, useEffect, useState } from 'react';
import { toggleBleach } from '@/pages/Order/Details/Entry/utils';
import { useAllZipperThreadOrderList } from '@/state/Other';
import { useThreadDetailsByUUID, useThreadOrderInfo } from '@/state/Thread';
import { useAuth } from '@context/auth';
import { FormProvider } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useAccess, useRHF } from '@/hooks';

import { DeleteModal } from '@/components/Modal';
import { Footer } from '@/components/Modal/ui';
import HandsonSpreadSheet from '@/ui/Dynamic/HandsonSpreadSheet'; //! why it is must??

import SwitchToggle from '@/ui/Others/SwitchToggle';

import nanoid from '@/lib/nanoid';
import { DevTool } from '@/lib/react-hook-devtool';
import {
	THREAD_ORDER_INFO_ENTRY_NULL,
	THREAD_ORDER_INFO_ENTRY_SCHEMA,
} from '@util/Schema';
import GetDateTime from '@/util/GetDateTime';

import Header from './Header';
import OrderEntrySpreadsheet from './spreadsheets/order-entry-spreadsheet';

export default function Index() {
	const { user } = useAuth();
	const haveAccess = useAccess('thread__order_info_details');

	const {
		url: threadOrderInfoUrl,
		updateData,
		postData,
		deleteData,
	} = useThreadOrderInfo();

	const threadOrderEntryUrl = '/thread/order-entry';
	const { uuid, order_info_uuid } = useParams();

	const navigate = useNavigate();
	const { invalidateQuery: invalidateOtherZipperThreadOrderList } =
		useAllZipperThreadOrderList();
	const isUpdate = order_info_uuid !== undefined || uuid !== undefined;
	const { data } = useThreadDetailsByUUID(order_info_uuid);
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
		setValue,
		formState: { dirtyFields },
		context: form,
	} = useRHF(THREAD_ORDER_INFO_ENTRY_SCHEMA, THREAD_ORDER_INFO_ENTRY_NULL);

	useEffect(() => {
		uuid !== undefined
			? (document.title = `Thread Shade Recipe: Update ${uuid}`)
			: (document.title = 'Thread Shade Recipe: Entry');
	}, []);

	const {
		fields: threadOrderInfoEntryField,
		append: threadOrderInfoEntryAppend,
		remove: threadOrderInfoEntryRemove,
	} = useFieldArray({
		control,
		name: 'order_info_entry',
	});

	useEffect(() => {
		if (data && isUpdate) {
			reset(data);
		}
	}, [data, isUpdate]);

	// order_info_entry
	const [bleachAll, setBleachAll] = toggleBleach({
		item: threadOrderInfoEntryField,
		setValue,
		field: 'order_info_entry',
	});

	useEffect(() => {
		const subscription = watch((value) => {
			const { order_info_entry } = value;
			if (order_info_entry?.length > 0) {
				const allBleach = order_info_entry.every(
					(item) => item.bleaching === 'bleach'
				);
				const allNonBleach = order_info_entry.every(
					(item) => item.bleaching === 'non-bleach'
				);

				if (allBleach) {
					setBleachAll(true);
				} else if (allNonBleach) {
					setBleachAll(false);
				} else {
					setBleachAll(null);
				}
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const [deleteItem, setDeleteItem] = useState({
		itemId: null,
		itemName: null,
	});

	const handleThreadOrderInfoEntryRemove = (index) => {
		if (getValues(`order_info_entry[${index}].uuid`) !== undefined) {
			setDeleteItem({
				itemId: getValues(`order_info_entry[${index}].uuid`),
				itemName: getValues(`order_info_entry[${index}].uuid`),
			});
			window['order_info_entry_delete'].showModal();
		}
		threadOrderInfoEntryRemove(index);
	};

	const handleThreadOrderInfoEntryAppend = () => {
		threadOrderInfoEntryAppend({
			order_info_uuid: null,
			lab_ref: '',
			style: '',
			color: '',
			count_length_uuid: null,
			type: '',
			quantity: null,
			bleaching: 'non-bleach',
			company_price: 0,
			party_price: 0,
			remarks: '',
		});
	};

	// Submit
	const onSubmit = async (data) => {
		// Update
		if (isUpdate) {
			const order_info_data = {
				...data,
				is_sample: data.is_sample ? 1 : 0,
				is_bill: data.is_bill ? 1 : 0,
				is_cash: data.is_cash ? 1 : 0,
				updated_at: GetDateTime(),
			};

			const order_info_promise = await updateData.mutateAsync({
				url: `${threadOrderInfoUrl}/${data?.uuid}`,
				updatedData: order_info_data,
				uuid: data.uuid,
				isOnCloseNeeded: false,
			});

			const newEntry = data.order_info_entry
				.filter((item) => {
					return item.uuid === undefined;
				})
				.map((item) => ({
					...item,
					order_info_uuid: order_info_uuid,
					color_ref_entry_date: item.color_ref ? GetDateTime() : null,
					created_at: GetDateTime(),
					uuid: nanoid(),
				}));

			// * extract only the edited entries from the current entries & add color_ref_update_date if color_ref is dirty
			const updatedColorRefEntries = data.order_info_entry
				.map((entry, index) => {
					const isDirty = dirtyFields?.order_info_entry?.[index];
					if (!isDirty) return null;

					const isColorRefDirty = isDirty?.color_ref;
					return {
						...entry,
						...(isColorRefDirty &&
							entry.uuid && {
								color_ref_update_date: GetDateTime(),
							}),
					};
				})
				.filter(Boolean);

			const updateEntry = updatedColorRefEntries.filter((item) => {
				return item.uuid !== undefined;
			});

			const entryUpdatePromise = updateEntry.map(async (item) => {
				item.updated_at = GetDateTime();
				const updatedData = {
					...item,
				};
				return await updateData.mutateAsync({
					url: `${threadOrderEntryUrl}/${item.uuid}`,
					uuid: item.uuid,
					updatedData,
					isOnCloseNeeded: false,
				});
			});

			const entryCreatePromise =
				newEntry.length > 0
					? await postData.mutateAsync({
							url: threadOrderEntryUrl,
							newData: newEntry,
							isOnCloseNeeded: false,
						})
					: null;

			try {
				await Promise.all([
					order_info_promise,
					entryCreatePromise,
					...entryUpdatePromise,
				])
					.then(() => reset(THREAD_ORDER_INFO_ENTRY_NULL))
					.then(() => {
						invalidateOtherZipperThreadOrderList();
						navigate(`/thread/order-info/${order_info_uuid}`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		// Add new item
		const new_order_info_uuid = nanoid();
		const created_at = GetDateTime();
		const created_by = user.uuid;

		// Create Shade Recipe description
		const order_info_data = {
			...data,
			is_sample: data.is_sample ? 1 : 0,
			is_bill: data.is_bill ? 1 : 0,
			is_cash: data.is_cash ? 1 : 0,
			uuid: new_order_info_uuid,
			created_at,
			created_by,
		};

		// delete shade_recipe field from data to be sent
		delete order_info_data['order_info_entry'];

		const order_info_promise = await postData.mutateAsync({
			url: threadOrderInfoUrl,
			newData: order_info_data,
			isOnCloseNeeded: false,
		});

		// Create Shade Recipe entries
		const order_info_entries = [...data.order_info_entry].map((item) => ({
			...item,
			order_info_uuid: new_order_info_uuid,
			uuid: nanoid(),
			color_ref_entry_date: item.color_ref ? GetDateTime() : null,
			created_at,
			created_by,
			// swatch_approval_date:
			// 	item.recipe_uuid === null ? null : GetDateTime(),
		}));

		const order_info_entries_promise = await postData.mutateAsync({
			url: threadOrderEntryUrl,
			newData: order_info_entries,
			isOnCloseNeeded: false,
		});

		try {
			await Promise.all([order_info_promise, order_info_entries_promise])
				.then(() => reset(THREAD_ORDER_INFO_ENTRY_NULL))
				.then(() => {
					invalidateOtherZipperThreadOrderList();
					navigate(`/thread/order-info/${new_order_info_uuid}`);
				});
		} catch (err) {
			console.error(`Error with Promise.all: ${err}`);
		}
	};

	// Check if uuid is valuuid
	if (getValues('quantity') === null) return <Navigate to='/not-found' />;

	const headerButtons = [
		<div className='flex items-center gap-2'>
			<label className='text-sm text-white'>Bleach All</label>
			<SwitchToggle
				checked={bleachAll}
				onChange={() => setBleachAll(!bleachAll)}
			/>
		</div>,
	];

	const handleCopy = (index) => {
		const field = form.watch('order_info_entry')[index];

		const length = form.watch('order_info_entry').length;
		let newIndex;
		if (length > 0) {
			// Get the index value of the previous row
			const previousIndex = form.getValues(
				`order_info_entry.${length - 1}.index`
			);
			newIndex = previousIndex ? previousIndex + 1 : length + 1;
		} else {
			// For the first row, set index to 1
			newIndex = length + 1;
		}

		threadOrderInfoEntryAppend({
			index: newIndex,
			color: field.color,
			color_ref: field.color_ref,
			style: field.style,
			count_length_uuid: field.count_length_uuid,
			bleaching: field.bleaching,
			quantity: field.quantity,
			company_price: field.company_price,
			party_price: field.party_price,
			remarks: field.remarks,
		});
	};

	return (
		<FormProvider {...form}>
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
						setValue,
					}}
				/>

				<OrderEntrySpreadsheet
					extraHeader={headerButtons}
					title='Details'
					form={form}
					fieldName='order_info_entry'
					handleCopy={handleCopy}
					handleAdd={handleThreadOrderInfoEntryAppend}
					handleRemove={handleThreadOrderInfoEntryRemove}
				/>

				<Footer buttonClassName='!btn-primary' />
			</form>
			<Suspense>
				<DeleteModal
					modalId={'order_info_entry_delete'}
					title={'Order info Entry'}
					deleteItem={deleteItem}
					setDeleteItem={setDeleteItem}
					setItems={threadOrderInfoEntryField}
					url={threadOrderEntryUrl}
					deleteData={deleteData}
				/>
			</Suspense>
			<DevTool control={control} placement='top-left' />
		</FormProvider>
	);
}
