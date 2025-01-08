import { ReactSelect } from '@/ui';

import { cn } from '@/lib/utils';

export const ExtraSelect = ({ className, status, setStatus, options = [] }) => {
	return (
		<ReactSelect
			className={cn('h-4 min-w-36 text-sm', className)}
			placeholder='Select Status'
			options={options}
			value={options?.filter((item) => item.value == status)}
			onChange={(e) => {
				setStatus(e.value);
			}}
		/>
	);
};
