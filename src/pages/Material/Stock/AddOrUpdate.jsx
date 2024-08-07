import { AddModal } from "@/components/Modal";
import { useAuth } from "@/context/auth";
import { useFetchForRhfReset, useRHF, useUpdateFunc } from "@/hooks";
import { FormField, Input, ReactSelect } from "@/ui";
import GetDateTime from "@/util/GetDateTime";
import { MATERIAL_STOCK_NULL, MATERIAL_STOCK_SCHEMA } from "@util/Schema";

export default function Index({
	modalId = "",
	setMaterialStock,
	updateMaterialStock = {
		id: null,
		name: null,
		stock: null,
	},
	setUpdateMaterialStock,
}) {
	const { user } = useAuth();

	const schema = {
		...MATERIAL_STOCK_SCHEMA,
		quantity: MATERIAL_STOCK_SCHEMA.quantity
			.moreThan(0)
			.max(updateMaterialStock?.stock),
	};

	const { register, handleSubmit, errors, control, Controller, reset } =
		useRHF(schema, MATERIAL_STOCK_NULL);

	useFetchForRhfReset(
		`/material/stock/${updateMaterialStock?.id}`,
		updateMaterialStock?.id,
		reset
	);

	const onClose = () => {
		setUpdateMaterialStock((prev) => ({
			...prev,
			id: null,
			name: null,
			stock: null,
		}));
		reset(MATERIAL_STOCK_NULL);
		window[modalId].close();
	};

	const onSubmit = async (data) => {
		// Update item
		if (updateMaterialStock?.id !== null) {
			const updatedData = {
				...data,
				material_stock_id: updateMaterialStock.id,
				name: updateMaterialStock?.name.replace(/[#&/]/g, ""),
				stock: updateMaterialStock.stock - data?.quantity,
				[`${data.trx_to}`]:
					updateMaterialStock[`${data.trx_to}`] + data?.quantity,
				issued_by: user?.id,
				created_at: GetDateTime(),
			};

			await useUpdateFunc({
				uri: `/material/trx`,
				itemId: updateMaterialStock?.id,
				data: data,
				updatedData: updatedData,
				setItems: setMaterialStock,
				onClose: onClose,
			});

			return;
		}
	};

	const transactionArea = [
		{ label: "Tape Making", value: "tape_making" },
		{ label: "Coil Forming", value: "coil_forming" },
		{ label: "Dying and Iron", value: "dying_and_iron" },
		{ label: "Metal Gapping", value: "m_gapping" },
		{ label: "Vislon Gapping", value: "v_gapping" },
		{ label: "Vislon Teeth Molding", value: "v_teeth_molding" },
		{ label: "Metal Teeth Molding", value: "m_teeth_molding" },
		{
			label: "Teeth Assembling and Polishing",
			value: "teeth_assembling_and_polishing",
		},
		{ label: "Metal Teeth Cleaning", value: "m_teeth_cleaning" },
		{ label: "Vislon Teeth Cleaning", value: "v_teeth_cleaning" },
		{ label: "Plating and Iron", value: "plating_and_iron" },
		{ label: "Metal Sealing", value: "m_sealing" },
		{ label: "Vislon Sealing", value: "v_sealing" },
		{ label: "Nylon T Cutting", value: "n_t_cutting" },
		{ label: "Vislon T Cutting", value: "v_t_cutting" },
		{ label: "Metal Stopper", value: "m_stopper" },
		{ label: "Vislon Stopper", value: "v_stopper" },
		{ label: "Nylon Stopper", value: "n_stopper" },
		{ label: "Cutting", value: "cutting" },
		{ label: "QC and Packing", value: "qc_and_packing" },
		{ label: "Die Casting", value: "die_casting" },
		{ label: "Slider Assembly", value: "slider_assembly" },
		{ label: "Coloring", value: "coloring" },
	];

	return (
		<AddModal
			id={modalId}
			title={"Material Trx of " + updateMaterialStock?.name}
			onSubmit={handleSubmit(onSubmit)}
			onClose={onClose}
			isSmall={true}
		>
			<FormField label="trx_to" title="Transfer To" errors={errors}>
				<Controller
					name={"trx_to"}
					control={control}
					render={({ field: { onChange } }) => {
						return (
							<ReactSelect
								placeholder="Select Transaction Area"
								options={transactionArea}
								onChange={(e) => onChange(e.value)}
							/>
						);
					}}
				/>
			</FormField>

			<Input
				label="quantity"
				sub_label={`Max: ${updateMaterialStock?.stock}`}
				placeholder={`Max: ${updateMaterialStock?.stock}`}
				{...{ register, errors }}
			/>
			<Input label="remarks" {...{ register, errors }} />
		</AddModal>
	);
}
