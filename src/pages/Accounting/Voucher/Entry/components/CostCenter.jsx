import { useWatch } from 'react-hook-form';

import { FormField, Input, ReactSelect } from '@/ui';

import { useOtherCostCenter } from '../../config/query';

export default function CostCenter({
	entryPath,
	control,
	errors,
	p,
	Controller,
	subIdx,
	watch,
	register,
	displayIndex,
	setValue,
}) {
	const filterCostOptions = (options, index) => {
		return options?.filter((option) => {
			const isSelected = watch(
				`voucher_entry[${index}].voucher_entry_cost_center`
			)?.some((item) => item.cost_center_uuid === option.value);
			return !isSelected;
		});
	};
	const watchedLedgers =
		useWatch({ control, name: `voucher_entry.${p}.ledger_uuid` }) || [];

	const { data: costCenterOptions = [] } = useOtherCostCenter(
		watchedLedgers ? `ledger_uuid=${watchedLedgers}` : ''
	);

	return (
		<div className='flex gap-2'>
			<p className='justify-center py-4 align-baseline text-sm font-medium text-gray-900'>
				{p + 1}.{displayIndex}
			</p>
			<div className='flex gap-2'>
				<FormField
					label={`${entryPath}.voucher_entry_cost_center[${subIdx}].cost_center_uuid`}
					is_title_needed='false'
					dynamicerror={
						errors?.voucher_entry?.[p]?.voucher_entry_cost_center?.[
							subIdx
						]?.cost_center_uuid
					}
				>
					<Controller
						name={`${entryPath}.voucher_entry_cost_center[${subIdx}].cost_center_uuid`}
						control={control}
						render={({ field: { onChange, value } }) => (
							<ReactSelect
								placeholder='Select Cost Center'
								options={filterCostOptions(
									costCenterOptions,
									p
								)}
								value={
									costCenterOptions.find(
										(o) => o.value === value
									) ?? null
								}
								onChange={(e) => {
									setValue(
										`${entryPath}.voucher_entry_cost_center[${subIdx}].invoice_no`,
										e.invoice_no
									);
									onChange(e?.value);
								}}
								menuPortalTarget={document.body}
							/>
						)}
					/>
				</FormField>
				<Input
					title='Narration'
					label={`${entryPath}.voucher_entry_cost_center[${subIdx}].invoice_no`}
					placeholder='Enter Narration'
					is_title_needed='false'
					dynamicerror={
						errors?.voucher_entry?.[p]?.voucher_entry_cost_center?.[
							subIdx
						]?.invoice_no
					}
					register={register}
				/>
			</div>
		</div>
	);
}
