import { lazy, useState } from 'react';
import { useAuth } from '@/context/auth';
import { format } from 'date-fns';
import { LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

import { Suspense } from '@/components/Feedback';
import SectionContainer from '@/ui/Others/SectionContainer';
import RenderTable from '@/ui/Others/Table/RenderTable';

const AddOrUpdate = lazy(() => import('./AddOrUpdate'));
const ResetPass = lazy(() => import('../Admin/User/ResetPass'));

export default function Information({ data }) {
	const navigate = useNavigate();

	const [updateUser, setUpdateUser] = useState({
		uuid: null,
		department_designation: null,
	});
	const { Logout } = useAuth();

	const handleLogout = async () => {
		await Logout();
		navigate('/login', { replace: true });
	};

	const handelUpdate = () => {
		setUpdateUser({
			uuid: data.uuid,
			department_designation: data.department_designation,
		});

		window['update_profile_modal']?.showModal();
	};

	// Reset Password
	const [resPass, setResPass] = useState({
		uuid: null,
		name: null,
	});
	const handelResetPass = async () => {
		setResPass((prev) => ({
			...prev,
			uuid: data.uuid,
			name: data.name,
		}));

		window['reset_pass_modal'].showModal();
	};
	const renderItems = () => {
		return [
			{
				label: 'Name',
				value: data?.name,
			},
			{
				label: 'Email',
				value: data?.email,
			},
			{
				label: 'Designation',
				value: data?.designation,
			},
			{
				label: 'Department',
				value: data?.department,
			},
			{
				label: 'Phone',
				value: data?.phone,
			},
			{
				label: 'Ext',
				value: data?.ext,
			},
			{
				label: 'Created',
				value: format(new Date(data?.created_at), 'dd/MM/yy'),
			},
			{
				label: 'Updated',
				value: format(new Date(data?.updated_at), 'dd/MM/yy'),
			},
			{ label: 'Remarks', value: data?.remarks },
			{
				label: 'Edit',
				value: (
					<button className='btn bg-black/10' onClick={handelUpdate}>
						Edit
					</button>
				),
			},
			{
				label: 'Reset Password',
				value: (
					<button
						className='btn bg-black/10'
						onClick={handelResetPass}
					>
						Reset Password
					</button>
				),
			},
			{
				label: 'Log Out',
				value: (
					<motion.button
						className='flex items-center gap-2 rounded-md bg-gradient-to-r from-error/50 to-error/70 px-4 py-2 text-left font-normal text-primary-content'
						whileTap={{ scale: 0.95 }}
						onClick={() => handleLogout()}
					>
						<LogOut className='size-6 text-primary-content' />
					</motion.button>
				),
			},
		];
	};

	return (
		<SectionContainer title={'Information'}>
			<div>
				<RenderTable
					items={renderItems()}
					className={'border-secondary/30 lg:border-r'}
				/>
			</div>
			<Suspense>
				<AddOrUpdate
					modalId={'update_profile_modal'}
					{...{
						updateUser,
						setUpdateUser,
					}}
				/>
			</Suspense>
			<Suspense>
				<ResetPass
					modalId='reset_pass_modal'
					{...{
						resPass,
						setResPass,
					}}
				/>
			</Suspense>
		</SectionContainer>
	);
}
