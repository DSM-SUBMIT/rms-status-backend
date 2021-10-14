import { Router } from 'express';
import { HealthRouter } from './health';

const router = Router();

router.use('/health', HealthRouter);

export { router };
