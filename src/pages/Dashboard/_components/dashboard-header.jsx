import { useAuth } from '@/context/auth';
import { format } from 'date-fns';
import { RefreshCw } from 'lucide-react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const DashboardHeader = ({ handleRefresh, dataPreview, setDataPreview }) => {
	const { user } = useAuth();
	return (
		<div className='sticky top-0 z-50 border-b bg-base/50 px-4 py-4 shadow-sm backdrop-blur-xl lg:px-8'>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col'>
					<h2 className='text-2xl font-medium capitalize text-primary'>
						Welcome Back, {user?.name}!
					</h2>
					<p className='text-sm text-secondary'>
						{format(new Date(), 'EEEE, dd MMM yyyy')}
					</p>
				</div>

				<div className='flex items-center gap-2'>
					<Select value={dataPreview} onValueChange={setDataPreview}>
						<SelectTrigger className='h-9 w-[180px]'>
							<SelectValue placeholder='Data Preview' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='demo'>Demo</SelectItem>
							<SelectItem value='real'>Real</SelectItem>
						</SelectContent>
					</Select>

					<button
						onClick={handleRefresh}
						className='btn btn-accent btn-sm'>
						Refresh
						<RefreshCw className='size-4' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default DashboardHeader;
