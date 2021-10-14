import { Service } from 'typedi';
import axios from 'axios';
import { Status } from 'src/shared/interfaces/Status';

@Service('HealthService')
export class HealthService {
  constructor() {}

  public async getStatus(): Promise<Status> {
    const status: Status = {
      user: (await this.getUserStatus()) ? 'up' : 'down',
      admin: (await this.getAdminStatus()) ? 'up' : 'down',
      file: (await this.getFileStatus()) ? 'up' : 'down',
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

  public async getFileStatus(): Promise<boolean> {
    try {
      const res = await axios.get('https://file-api.dsm-rms.com/health');
      return res.status === 200;
    } catch (e) {
      return false;
    }
  }
}
