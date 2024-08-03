import { Card } from '@/components';
import { ButtonCart } from '@/components';
import { foods } from '@/data';

export function Home() {
	return (
		<div className='grid sm:grid-cols-3 gap-4'>
			{foods.map((f) => (
				<Card id={f.id} name={f.name} imgSource={f.imgSource} price={f.price} />
			))}
			<ButtonCart isBack={false} />
		</div>
	);
}
