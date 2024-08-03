import { Card, Loading, ButtonCart } from '@/components';
import { formatCurrency } from '@/utils';
import { useGetMenu, useUserOrders } from '@/hooks';

export function Home() {
	const { isLoading: isMenuLoading, data: menuData } = useGetMenu();

	const { isLoading: isOrdersLoading, data: userOrdersData } = useUserOrders();

	if (isMenuLoading || isOrdersLoading) return <Loading />;

	const orderedItems = userOrdersData?.data?.orderItem || [];
	const tableNumber = userOrdersData?.data?.tableNumber ?? '';
	const totalOrder = userOrdersData?.data?.totalOrder ?? 0;
	const totalAmount = userOrdersData?.data?.totalAmount ?? 0;
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
