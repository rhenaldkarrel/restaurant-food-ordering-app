import express from 'express';
import { getMenu, getOrder, submitOrder } from './foods.controller';

const router = express.Router();

router.get('/menu', getMenu);
router.post('/submit-order', submitOrder);
router.post('/my-order', getOrder);

export default router;
