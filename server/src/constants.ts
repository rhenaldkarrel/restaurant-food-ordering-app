import { FoodItem } from '@shared/api';

export const PORT = process.env.PORT || '3001';

export const foods: FoodItem[] = [
	{
		id: 1,
		name: 'Biryani Special',
		imgSource: 'https://foodish-api.com/images/biryani/biryani1.jpg',
		price: 150000,
	},
	{
		id: 2,
		name: 'Pizza Supreme',
		imgSource: 'https://foodish-api.com/images/pizza/pizza1.jpg',
		price: 180000,
	},
	{
		id: 3,
		name: 'Classic Burger',
		imgSource: 'https://foodish-api.com/images/burger/burger1.jpg',
		price: 75000,
	},
	{
		id: 4,
		name: 'Beef Burger Deluxe',
		imgSource: 'https://foodish-api.com/images/burger/burger3.jpg',
		price: 90000,
	},
	{
		id: 5,
		name: 'Double Cheese Burger',
		imgSource: 'https://foodish-api.com/images/burger/burger9.jpg',
		price: 100000,
	},
	{
		id: 6,
		name: 'Pasta Alfredo',
		imgSource: 'https://foodish-api.com/images/pasta/pasta1.jpg',
		price: 120000,
	},
	{
		id: 7,
		name: 'Pasta Thick',
		imgSource: 'https://foodish-api.com/images/pasta/pasta5.jpg',
		price: 130000,
	},
	{
		id: 8,
		name: 'Fried Rice',
		imgSource: 'https://foodish-api.com/images/rice/rice1.jpg',
		price: 50000,
	},
	{
		id: 9,
		name: 'Chicken Fried Rice',
		imgSource: 'https://foodish-api.com/images/rice/rice2.jpg',
		price: 65000,
	},
];
