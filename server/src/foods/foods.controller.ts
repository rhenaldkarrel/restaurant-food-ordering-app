import { Request, Response } from 'express';
import { foods, orders } from '../constants';

export const getMenu = (req: Request, res: Response) => {
	return res.status(200).json({ success: true, data: foods });
};

export const getOrder = (req: Request, res: Response) => {
	const { sessionUserId } = req.body;
	return res.status(200).json({ success: true, data: orders[sessionUserId] });
};

export const submitOrder = (req: Request, res: Response) => {
	const { sessionUserId, orderItems, tableNumber, totalAmount, totalOrder } =
		req.body;

	if (!sessionUserId || !Array.isArray(orderItems)) {
		return res.status(400).json({ success: false, message: 'Invalid request' });
	}

	if (!orders[sessionUserId]) {
		orders[sessionUserId] = {
			orderItem: [],
			tableNumber: '',
			totalAmount: 0,
			totalOrder: 0,
		};
	}

	orderItems.forEach((foodItem) => {
		const { id, name, imgSource, price, quantity } = foodItem;

		const existingOrderIndex = orders[sessionUserId].orderItem.findIndex(
			(item) => item.id === id
		);

		if (existingOrderIndex !== -1) {
			orders[sessionUserId].orderItem[existingOrderIndex].quantity += quantity;
		} else {
			const prev = orders[sessionUserId];

			orders[sessionUserId] = {
				tableNumber,
				totalAmount: prev.totalAmount + totalAmount,
				totalOrder: prev.totalOrder + totalOrder,
				orderItem: [
					...prev.orderItem,
					{
						id,
						name,
						imgSource,
						price,
						quantity,
					},
				],
			};
		}
	});

	return res
		.status(200)
		.json({ success: true, message: 'Order updated successfully' });
};
