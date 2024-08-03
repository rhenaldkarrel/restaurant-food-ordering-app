import { FoodItem, OrderItem } from '@shared/api';
import { create } from 'zustand';

interface FoodOrderState {
	orders: OrderItem[];
	totalAmount: number;
	totalOrder: number;
	addItem: (food: FoodItem, quantity: number) => void;
	updateQuantity: (foodId: number, quantity: number) => void;
	removeItem: (foodId: number) => void;
	calculateTotals: () => void;
}

export const useFoodOrderStore = create<FoodOrderState>((set, get) => ({
	orders: [],
	totalAmount: 0,
	totalOrder: 0,

	addItem: (food, quantity) => {
		const existingOrderIndex = get().orders.findIndex(
			(order) => order.id === food.id
		);

		if (existingOrderIndex !== -1) {
			const updatedOrders = get().orders.map((order) => {
				if (order.id === food.id) {
					return { ...order, quantity: order.quantity + quantity };
				}
				return order;
			});
			set({ orders: updatedOrders });
		} else {
			set((state) => ({
				orders: [...state.orders, { ...food, quantity }],
			}));
		}

		get().calculateTotals();
	},

	updateQuantity: (foodId, quantity) => {
		const updatedOrders = get()
			.orders.map((order) => {
				if (order.id === foodId) {
					return { ...order, quantity };
				}
				return order;
			})
			.filter((order) => order.quantity > 0);

		set({ orders: updatedOrders });

		get().calculateTotals();
	},

	removeItem: (foodId) => {
		const updatedOrders = get().orders.filter((order) => order.id !== foodId);
		set({ orders: updatedOrders });

		get().calculateTotals();
	},

	calculateTotals: () => {
		const { orders } = get();
		const totalAmount = orders.reduce(
			(sum, order) => sum + order.price * order.quantity,
			0
		);
		const totalOrder = orders.reduce(
			(count, order) => count + order.quantity,
			0
		);

		set({ totalAmount, totalOrder });
	},
}));
