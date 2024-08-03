import { useFoodOrderStore } from '@/store';
import { BsArrowLeft, BsCartPlusFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

interface Props {
	isBack: boolean;
}

export function ButtonCart({ isBack }: Props) {
	const navigate = useNavigate();

	const { totalOrder } = useFoodOrderStore();

	return (
		<button
			className='btn btn-circle fixed bottom-3 right-14 shadow-xl border-neutral-700'
			onClick={() => (isBack ? navigate('/') : navigate('/cart'))}
		>
			{isBack ? (
				<BsArrowLeft />
			) : (
				<Fragment>
					<span className='bg-red-700 absolute right-0 top-[-25%] p-1 rounded-full w-6 h-6'>
						{totalOrder}
					</span>
					<BsCartPlusFill className='text-lg' />
				</Fragment>
			)}
		</button>
	);
}
