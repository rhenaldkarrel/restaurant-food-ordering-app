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
