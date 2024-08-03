import { ButtonCart, CartDetailCard } from '@/components';
import { useFoodOrderStore } from '@/store';
import { formatCurrency } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export function Cart() {
	const { orders, totalAmount } = useFoodOrderStore();
	const navigate = useNavigate();

	return (
		<Fragment>
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
				<div className='flex justify-between items-center'>
					<label className='form-control w-full max-w-xs'>
						<div className='label'>
							<span className='label-text'>Table Number</span>
						</div>
						<input
							type='text'
							placeholder='Type here'
							className='input input-bordered w-full max-w-xs'
							disabled={orders.length < 1}
						/>
					</label>

					<button className='btn btn-primary' disabled={orders.length < 1}>
						Submit
					</button>
				</div>
			</div>

			<ButtonCart isBack />
		</Fragment>
	);
}
