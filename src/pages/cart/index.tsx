import { ButtonCart, CartDetailCard, Loading } from '@/components';
import { useSessionUserId, useSubmitOrder } from '@/hooks';
import { useFoodOrderStore } from '@/store';
import { formatCurrency, getSessionStorage } from '@/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function Cart() {
	const { orders, totalAmount, resetOrders, totalOrder } = useFoodOrderStore();
	const navigate = useNavigate();
	const sessionUserId = useSessionUserId();
	const userTableNumber = getSessionStorage('tableNumber') || '';
	const { mutate: submitOrder, isLoading } = useSubmitOrder();
	const [tableNumber, setTableNumber] = useState(userTableNumber);

	const handleSubmit = () => {
		if (!sessionUserId) return;

		if (!tableNumber) return toast.error("Table Number can't be empty!");

		const orderPayload = {
			sessionUserId,
			tableNumber,
			totalAmount,
			totalOrder,
			orderItems: orders.map((order) => ({
				id: order.id,
				name: order.name,
				imgSource: order.imgSource,
				price: order.price,
				quantity: order.quantity,
			})),
		};

		submitOrder(orderPayload, {
			onSuccess: () => {
				toast.success('Order placed! Please wait 👀');
				resetOrders();
				navigate('/');
			},
			onError: (error) => {
				console.error('Order submission failed', error);
			},
		});
	};

	if (isLoading) return <Loading />;

	return (
		<div className='space-y-4'>
			<h1 className='text-center'>My Cart</h1>
			{orders.length < 1 && (
				<div className='flex flex-col items-center gap-4'>
					Your cart is empty, please add your orders!
					<button className='btn btn-primary' onClick={() => navigate('/')}>
						Order
					</button>
				</div>
			)}

			<div className='grid grid-cols-2 gap-4'>
				{orders.map((order) => (
					<CartDetailCard
						key={order.id}
						id={order.id}
						name={order.name}
						imgSource={order.imgSource}
						price={order.price}
						quantity={order.quantity}
					/>
				))}
			</div>

			<div className='flex flex-col mt-6 space-y-4'>
				<div className='flex justify-between'>
					<h2>Total</h2>
					<p>{formatCurrency(totalAmount)}</p>
				</div>
				<form className='flex justify-between items-center'>
					<label className='form-control w-full max-w-xs'>
						<div className='label'>
							<span className='label-text'>Table Number</span>
						</div>
						<input
							type='text'
							placeholder='Type here'
							className='input input-bordered w-full max-w-xs'
							disabled={orders.length < 1 || !!userTableNumber}
							value={tableNumber}
							onChange={(e) => setTableNumber(e.target.value)}
						/>
					</label>

					<button
						type='button'
						className='btn btn-primary'
						disabled={orders.length < 1}
						onClick={handleSubmit}
					>
						Submit
					</button>
				</form>
			</div>

			<ButtonCart isBack />
		</div>
	);
}
