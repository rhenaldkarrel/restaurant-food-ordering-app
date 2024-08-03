import { useQuery } from 'react-query';

import { Card, Loading } from '@/components';
import { ButtonCart } from '@/components';
import { API_URL } from '@/constants';
import { ApiResponse, FoodItem } from '@shared/api';

export function Home() {
	const { isLoading, data } = useQuery<ApiResponse<FoodItem[]>>(
		'menuData',
		() => fetch(API_URL + '/foods/menu').then((res) => res.json())
	);

	if (isLoading) return <Loading />;

	return (
		<div className='grid sm:grid-cols-3 gap-4'>
			{data?.data.map((f) => (
				<Card id={f.id} name={f.name} imgSource={f.imgSource} price={f.price} />
			))}
			<ButtonCart isBack={false} />
		</div>
	);
}
