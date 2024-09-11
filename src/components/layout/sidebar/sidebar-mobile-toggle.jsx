import { motion } from 'framer-motion';
import { useLayout } from '../layout-provider';
import { Menu } from 'lucide-react';

const SidebarMobileToggle = () => {
	const { setSidebarOpen } = useLayout();
	return (
		<motion.button
			whileTap={{ scale: 0.9 }}
			className='size-fit text-secondary md:hidden'
			onClick={() => {
				setSidebarOpen((prev) => !prev);
			}}>
			<Menu />
		</motion.button>
	);
};

export default SidebarMobileToggle;
