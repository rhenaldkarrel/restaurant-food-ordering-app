import { useQuery } from 'react-query';

import { Card, Loading } from '@/components';
import { ButtonCart } from '@/components';
import { API_URL } from '@/constants';
import { ApiResponse, FoodItem, MyOrderItem } from '@shared/api';
import { useSessionUserId } from '@/hooks';
import { formatCurrency, setSessionStorage } from '@/utils';

export function Home() {
	const sessionUserId = useSessionUserId();

	const { isLoading: isMenuLoading, data: menuData } = useQuery<
		ApiResponse<FoodItem[]>
	>('menuData', () => fetch(API_URL + '/foods/menu').then((res) => res.json()));

	const { isLoading: isOrdersLoading, data: userOrdersData } = useQuery<
		ApiResponse<MyOrderItem>
	>(
		['userOrders', sessionUserId],
		() =>
			sessionUserId
				? fetch(API_URL + '/foods/my-order', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ sessionUserId }),
				  }).then((res) => res.json())
				: Promise.resolve({ data: [] }),
		{
			enabled: !!sessionUserId,
			onSuccess: (data) => {
				setSessionStorage('tableNumber', data.data.tableNumber);
			},
		}
	);

	if (isMenuLoading || isOrdersLoading) return <Loading />;

	const orderedItems = userOrdersData?.data?.orderItem || [];
	const tableNumber = userOrdersData?.data?.tableNumber || '';
	const totalOrder = userOrdersData?.data?.totalOrder || 0;
	const totalAmount = userOrdersData?.data?.totalAmount || 0;
	const menuItems = menuData?.data || [];

	return (
		<div className='space-y-4'>
			<h1 className='text-center'>
				My Orders{' '}
				{tableNumber
					? `(Table ${tableNumber}) - ${totalOrder} items - ${formatCurrency(
							totalAmount
					  )}`
					: null}
			</h1>
			<div className='grid sm:grid-cols-3 gap-4'>
				{orderedItems.length > 0 ? (
					orderedItems.map((f) => (
						<Card
							isOrdering={false}
							key={f.id}
							id={f.id}
							name={f.name}
							imgSource={f.imgSource}
							price={f.price}
							quantity={f.quantity}
						/>
					))
				) : (
					<div className='flex flex-col text-center gap-4'>
						Your haven't ordered yet!
					</div>
				)}
			</div>

			<h1 className='text-center'>Menu</h1>
			<div className='grid sm:grid-cols-3 gap-4'>
				{menuItems.map((f) => (
					<Card
						isOrdering
						key={f.id}
						id={f.id}
						name={f.name}
						imgSource={f.imgSource}
						price={f.price}
					/>
				))}
				<ButtonCart isBack={false} />
			</div>
		</div>
	);
}
