import { Router } from 'express';
import plansData from '../data/plans.json';

const router = Router();

router.get('/api/plans', (_req, res) => {
  try {
    res.status(200).json(plansData);
  } catch (error) {
    console.error('Error serving plans data', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to retrieve plans data'
    });
  }
});

export default router;
