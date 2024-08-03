import express from 'express';
import { foods } from '../constants';

const router = express.Router();

router.get('/menu', (req, res) => {
	return res.status(200).json({ success: true, data: foods });
});

export default router;
