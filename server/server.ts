import express from 'express';

import { PORT } from './constants';
import { foodRoutes } from './src';

const app = express();

app.use('/api/foods', foodRoutes);

app.use('/', (req, res) => res.send('Welcome to our restaurant server!'));

const startServer = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server running on ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
