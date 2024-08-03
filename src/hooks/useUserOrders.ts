import { useQuery } from 'react-query';
import { API_URL } from '@/constants';
import { ApiResponse, MyOrderItem } from '@shared/api';
import { setSessionStorage } from '@/utils';
import { useSessionUserId } from '@/hooks';

export const useUserOrders = () => {
	const sessionUserId = useSessionUserId();

	const queryResult = useQuery<ApiResponse<MyOrderItem>>(
		['userOrders', sessionUserId],
		() =>
			fetch(API_URL + '/foods/my-order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ sessionUserId }),
			}).then((res) => res.json()),
		{
			enabled: !!sessionUserId,
			onSuccess: (data) => {
				setSessionStorage('tableNumber', data.data.tableNumber);
			},
		}
	);

	return queryResult;
};
