export interface FoodItem {
	id: number;
	name: string;
	imgSource: string;
	price: number;
}

export type ApiResponse<T> = {
	success: boolean;
	data: T;
};

export interface OrderItem extends FoodItem {
	quantity: number;
}

export interface MyOrderItem {
	tableNumber: string;
	orderItem: OrderItem[];
	totalAmount: number;
	totalOrder: number;
}

export interface SubmitOrderPayload {
	sessionUserId: string;
	orderItems: OrderItem[];
	tableNumber: string;
	totalAmount: number;
	totalOrder: number;
}
