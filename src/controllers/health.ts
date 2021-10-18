import { Inject, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { HealthService } from 'src/services/health';

@Service()
export class HealthController {
  constructor(
    @Inject('HealthService') private readonly healthService: HealthService,
  ) {}

  public async getUserStatus(req: Request, res: Response, next: NextFunction) {
    res.status(200).json(await this.healthService.getStatus());
  }
}
