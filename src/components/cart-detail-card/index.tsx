import { useFoodOrderStore } from '@/store';
import { formatCurrency } from '@/utils';

interface Props {
	id: number;
	name: string;
	imgSource: string;
	price: number;
	quantity: number;
}

export function CartDetailCard({
	name,
	imgSource,
	price,
	id,
	quantity,
}: Props) {
	const { updateQuantity } = useFoodOrderStore();

	return (
		<div className='flex flex-col bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800'>
			<img
				className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 aspect-video md:rounded-none md:rounded-s-lg'
				src={imgSource}
				alt={name}
			/>

			<div className='flex flex-col p-4 leading-normal grow'>
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
			</div>
		</div>
	);
}
