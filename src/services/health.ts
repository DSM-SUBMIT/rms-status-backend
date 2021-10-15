import { Service } from 'typedi';
import axios from 'axios';
import { Status } from 'src/shared/interfaces/Status';
import { AdminStatusResponse } from 'src/shared/interfaces/AdminStatusResponse';

@Service('HealthService')
export class HealthService {
  constructor() {}

  public async getStatus(): Promise<Status> {
    const status: Status = {
      user: (await this.getUserStatus()) ? 'up' : 'down',
      admin: (await this.getAdminStatus()) ? 'up' : 'down',
      file: (await this.getFileStatus()) ? 'up' : 'down',
      db: (await this.getDBStatus()) ? 'up' : 'down',
    };
    return status;
  }

  public async getUserStatus(): Promise<boolean> {
    try {
      const res = await axios.get('https://user-api.dsm-rms.com/test');
      return res.status === 200;
    } catch (e) {
      return false;
    }
  }

  public async getAdminStatus(): Promise<boolean> {
    try {
      const res = await axios.get('https://admin-api.dsm-rms.com/health');
      return res.status === 200;
    } catch (e) {
      return false;
    }
  }

  public async getDBStatus(): Promise<boolean> {
    try {
      const res = await axios.get<AdminStatusResponse>(
        'https://admin-api.dsm-rms.com/health',
      );
      return res.data?.status === 'ok';
    } catch (e) {
      return false;
    }
  }

  public async getFileStatus(): Promise<boolean> {
    try {
      const res = await axios.get('https://files-api.dsm-rms.com/health');
      return res.status === 200;
    } catch (e) {
      return false;
    }
  }
}
