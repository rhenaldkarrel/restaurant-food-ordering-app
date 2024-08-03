import { API_URL } from '@/constants';
import { ApiResponse, FoodItem } from '@shared/api';
import { useQuery } from 'react-query';

export const useGetMenu = () => {
	const queryResult = useQuery<ApiResponse<FoodItem[]>>('menuData', () =>
		fetch(API_URL + '/foods/menu').then((res) => res.json())
	);

	return queryResult;
};
