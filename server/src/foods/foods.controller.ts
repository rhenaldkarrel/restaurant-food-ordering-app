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
	const { sessionUserId, orderItems, tableNumber } = req.body;

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
			orders[sessionUserId].orderItem.push({
				id,
				name,
				imgSource,
				price,
				quantity,
			});
		}

		orders[sessionUserId].totalOrder += quantity;
		orders[sessionUserId].totalAmount += price * quantity;
	});

	orders[sessionUserId].tableNumber = tableNumber;

	return res
		.status(200)
		.json({ success: true, message: 'Order updated successfully' });
};
