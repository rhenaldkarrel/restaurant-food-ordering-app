import { API_URL } from '@/constants';
import { SubmitOrderPayload } from '@shared/api';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const submitOrder = async (payload: SubmitOrderPayload) => {
	try {
		const response = await fetch(API_URL + '/foods/submit-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		return response.json();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		toast.error(err.message);
	}
};

export const useSubmitOrder = () => {
	return useMutation(submitOrder);
};
