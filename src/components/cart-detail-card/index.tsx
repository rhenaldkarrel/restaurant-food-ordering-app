import { useFoodOrderStore } from '@/store';
import { formatCurrency } from '@/utils';
import { OrderItem } from '@shared/api';
import { BsTrash } from 'react-icons/bs';

interface Props extends OrderItem {}

export function CartDetailCard({
	name,
	imgSource,
	price,
	id,
	quantity,
}: Props) {
	const { updateQuantity, removeItem } = useFoodOrderStore();

	return (
		<div className='flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800'>
			<img
				className='object-cover w-full rounded-t-lg sm:h-96 md:h-auto md:w-48 aspect-video md:rounded-none md:rounded-s-lg'
				src={imgSource}
				alt={name}
			/>

			<div className='flex flex-col p-4 grow'>
				<div className='flex flex-col items-end'>
					<p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
						{name}
					</p>
					<p className='mb-3 font-normal text-red-700'>
						{formatCurrency(price)}
					</p>
				</div>
				<div className='flex gap-2 items-center justify-end'>
					<button
						className='btn btn-ghost btn-sm'
						onClick={() => updateQuantity(id, quantity - 1)}
					>
						-
					</button>
					<span>{quantity}</span>
					<button
						className='btn btn-ghost btn-sm'
						onClick={() => updateQuantity(id, quantity + 1)}
					>
						+
					</button>
				</div>
				<div className='flex justify-end mt-2'>
					<button
						className='btn btn-error btn-sm'
						onClick={() => removeItem(id)}
					>
						<BsTrash />
					</button>
				</div>
			</div>
		</div>
	);
}
