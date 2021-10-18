import { Container } from 'typedi';
import { Router } from 'express';
import { HealthController } from 'src/controllers/health';

const router = Router();
const controller = Container.get(HealthController);

router.get('/', async (req, res, next) => {
  await controller.getUserStatus(req, res, next);
});

export { router as HealthRouter };
