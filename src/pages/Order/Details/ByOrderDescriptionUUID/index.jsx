import { lazy, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useFetchFunc } from '@/hooks';

import { Suspense } from '@/components/Feedback';

import InformationSkeleton from '../_components/Information/skeleton';

const SingleInformation = lazy(() => import('../_components/Information'));
const Table = lazy(() => import('../_components/Table'));
const Timeline = lazy(() => import('../_components/Timeline'));

export default function Index({ initial_order, idx }) {
	const { order_number, order_description_uuid } = useParams();

	const [order, setOrder] = useState(initial_order || []);
	const [sliderQty, setSliderQty] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const hasInitialOrder =
		Object.keys(initial_order || []).length > 0 ? true : false;

	useEffect(() => {
		document.title = order_number;
		if (order_description_uuid !== undefined) {
			useFetchFunc(
				`/zipper/order/details/single-order/by/${order_description_uuid}/UUID`,
				setOrder,
				setLoading,
				setError
			);
		} else {
			setLoading(false);
		}
	}, [order_description_uuid, initial_order]);

	if (!order) return <Navigate to='/not-found' />;
	if (loading)
		return <span className='loading loading-dots loading-lg z-50' />;

	const sliderQuantity = order?.order_entry.reduce((sum, item) => {
		return sum + parseFloat(item.quantity);
	}, 0);

	return (
		<div className='space-y-4'>
			<Suspense fallback={<InformationSkeleton />}>
				<SingleInformation
					order={order}
					idx={idx}
					hasInitialOrder={hasInitialOrder}
					sliderQuantity={sliderQuantity}
				/>
			</Suspense>

			<Suspense>
				<Timeline {...order} />
				<Table {...order} sliderQuantity={sliderQuantity} />
			</Suspense>
		</div>
	);
}
