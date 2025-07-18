import { CircleChevronRight, Eye, Send, Undo2 } from 'lucide-react';

import BadgeCheckbox from './BadgeCheckbox';
import { EditDelete } from './EditDelete';
import StatusButton from './StatusButton';

const ResetPassword = ({ onClick }) => {
	return (
		<button
			type='button'
			className='btn btn-circle btn-accent btn-xs font-semibold'
			onClick={onClick}
		>
			<Undo2 className='w-4' />
		</button>
	);
};

const Transfer = ({ onClick, disabled = false }) => {
	return (
		<button
			disabled={disabled}
			type='button'
			className='btn btn-circle btn-accent btn-sm font-semibold text-white shadow-md'
			onClick={onClick}
		>
			<CircleChevronRight className='w-4' />
		</button>
	);
};
const WhatsApp = ({ onClick, disabled = false }) => {
	return (
		<button
			disabled={disabled}
			type='button'
			className='btn btn-circle btn-accent btn-sm font-semibold text-white shadow-md'
			onClick={onClick}
		>
			<Send className='w-4' />
		</button>
	);
};
const EyeBtn = ({ onClick, disabled = false }) => {
	return (
		<button
			disabled={disabled}
			type='button'
			className='btn btn-circle btn-accent btn-sm font-semibold text-white shadow-md'
			onClick={onClick}
		>
			<Eye className='w-4' />
		</button>
	);
};

export {
	BadgeCheckbox,
	EditDelete,
	EyeBtn,
	ResetPassword,
	StatusButton,
	Transfer,
	WhatsApp,
};
