import { DateTime, LinkWithCopy, TitleValue } from '@/ui';

const LCInfo = (lc) => {
	return (
		<div className=''>
			<TitleValue title='LC ID' value={lc?.uuid} />
			<TitleValue
				title='PI ID'
				value={lc?.pi_ids.map((piId) => (
					<LinkWithCopy
						key={piId}
						title={piId}
						id={piId}
						uri='/commercial/pi/details'
					/>
				))}
			/>
			<TitleValue title='LC Number' value={lc?.lc_number} />
			<TitleValue title='File Number' value={lc?.file_no} />
			<TitleValue title='LC Date' value={lc?.lc_date} />
			<TitleValue title='Payment Value' value={lc?.payment_value} />
			<TitleValue title='LDBC/FDBC' value={lc?.ldbc_fdbc} />
			<TitleValue title='Expiry' value={lc?.expiry_date} />
			<TitleValue title='Payment Receive In' value={lc?.at_sight} />
		</div>
	);
};

function OthersInfo(lc) {
	return (
		<div className=''>
			<TitleValue title='Payment' value={lc?.payment_date} />
			<TitleValue title='Acceptance' value={lc?.acceptance_date} />
			<TitleValue title='Maturity' value={lc?.maturity_date} />
			<TitleValue
				title='Commercial Executive'
				value={lc?.commercial_executive}
			/>
			<TitleValue title='Party Bank' value={lc?.party_bank} />
			<TitleValue title='UD No.' value={lc?.ud_no} />
			<TitleValue title='UD Receive' value={lc?.ud_received} />
			<TitleValue title='Amendment' value={lc?.amd_date} />
			<TitleValue title='Amendment Count' value={lc?.amd_count} />
		</div>
	);
}
function BankInfo(lc) {
	return (
		<div className=''>
			<TitleValue
				title='Production Complete'
				value={lc?.production_complete ? 'Yes' : 'No'}
			/>
			<TitleValue
				title='LC Cancelled'
				value={lc?.lc_cancel ? 'Yes' : 'No'}
			/>
			<TitleValue title='Handover' value={lc?.handover_date} />
			<TitleValue title='Shipment' value={lc?.shipment_date} />
			<TitleValue
				title='Problematic'
				value={lc?.problematical ? 'Yes' : 'No'}
			/>
			<TitleValue title='EPZ' value={lc?.epz ? 'Yes' : 'No'} />
			<TitleValue title='Remarks' value={lc?.remarks} />
			<TitleValue
				title='Created'
				value={<DateTime date={lc?.created_at} isTime={false} />}
			/>
			<TitleValue
				title='Updated'
				value={<DateTime date={lc?.updated_at} isTime={false} />}
			/>
		</div>
	);
}

export default function Information({ lc }) {
	return (
		<div className='my-2 flex flex-col rounded-md px-2 shadow-md'>
			<span className='flex items-center gap-2 text-2xl font-semibold capitalize leading-tight text-primary md:text-3xl'>
				Information
			</span>
			<hr className='border-1 my-2 border-secondary-content' />

			<div className='flex flex-col items-baseline justify-start text-sm md:flex-row'>
				<LCInfo {...lc} />
				<hr className='divider divider-primary divider-vertical md:divider-horizontal' />
				<OthersInfo {...lc} />
				<hr className='divider divider-primary divider-vertical md:divider-horizontal' />
				<BankInfo {...lc} />
			</div>
		</div>
	);
}
