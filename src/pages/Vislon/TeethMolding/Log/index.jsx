import { useEffect } from 'react';
import RMOrderAgainstLog from './RMOrderAgainstLog';
import RMTransferLog from './RMTransferLog';
import SFGProductionLog from './SFGProductionLog/SFGProductionLog';
import SFGTransferLog from './SFGTransferLog/SFGTransferLog';
import TapeLog from './Transfer';
export default function Index() {
	useEffect(() => {
		document.title = 'Teeth Molding Log';
	}, []);
	return (
		<div>
			<SFGProductionLog />
			<hr className='my-6 border-2 border-dashed border-secondary-content' />
			<SFGTransferLog />
			<hr className='my-6 border-2 border-dashed border-secondary-content' />
			<RMTransferLog />
			<hr className='my-6 border-2 border-dashed border-secondary-content' />
			<RMOrderAgainstLog />
			<hr className='my-6 border-2 border-dashed border-secondary-content' />
			<TapeLog />
		</div>
	);
}
