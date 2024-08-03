import { useFoodOrderStore } from '@/store';
import { formatCurrency } from '@/utils';
import { FoodItem } from '@shared/api';
import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';

interface Props extends FoodItem {}

export function Card({ id, name, imgSource, price }: Props) {
	const { addItem } = useFoodOrderStore();

	const [localQuantity, setLocalQuantity] = useState(0);

	return (
		<div className='card bg-base-100 shadow-xl border border-neutral-700'>
			<figure className='px-10 pt-10'>
				<img
					src={imgSource}
					alt={name}
					className='rounded-xl w-full h-full aspect-video object-cover'
				/>
			</figure>
			<div className='card-body items-center text-center'>
				<h2 className='card-title'>{name}</h2>
				<p className='text-red-700 font-semibold'>{formatCurrency(price)}</p>
				<div className='flex gap-2 items-center'>
					<button
						className='btn btn-ghost btn-sm'
						onClick={() => {
							if (localQuantity > 0) {
								setLocalQuantity(localQuantity - 1);
							}
						}}
					>
						-
					</button>
					<span>{localQuantity}</span>
					<button
						className='btn btn-ghost btn-sm'
						onClick={() => setLocalQuantity(localQuantity + 1)}
					>
						+
					</button>
				</div>
				<div className='card-actions w-full'>
					<button
						className='btn btn-primary w-full'
						onClick={() => {
							addItem({ id, name, imgSource, price }, localQuantity);
							setLocalQuantity(0);
						}}
						disabled={localQuantity < 1}
					>
						<BsPlus className='text-2xl' /> Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}
