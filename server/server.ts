import express from 'express';
import cors from 'cors';

import { foodRoutes } from './src';
import { PORT } from './src/constants';

const app = express();

app.use(cors());
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
