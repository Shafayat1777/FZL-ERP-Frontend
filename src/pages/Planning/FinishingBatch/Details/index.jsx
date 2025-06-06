import { useDyeingFinishingBatchByUUID } from '@/state/Dyeing';
import { useParams } from 'react-router';

import Information from './Information';
import Table from './Table';

export default function Details() {
	const { batch_uuid } = useParams();
	const { data, isLoading, updateData } =
		useDyeingFinishingBatchByUUID(batch_uuid);

	if (isLoading)
		return <span className='loading loading-dots loading-lg z-50' />;

	return (
		<div className='flex flex-col gap-6'>
			<Information data={data} updateData={updateData} />
			{data?.finishing_batch_entry.length > 0 && (
				<Table entries={data?.finishing_batch_entry} />
			)}
		</div>
	);
}
