import { OutageInfo } from './outageInfo';

interface IndividualStatus {
  status: string;
  recent: {
    date: Date;
    status: string;
  }[];
}

export interface RecentStatus {
  status: string;
  apis: {
    user: IndividualStatus;
    admin: IndividualStatus;
    file: IndividualStatus;
  };
  sites: {
    user: IndividualStatus;
    admin: IndividualStatus;
  };
  current_outage: OutageInfo[];
}
