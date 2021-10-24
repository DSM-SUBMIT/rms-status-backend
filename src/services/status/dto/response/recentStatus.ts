import { outageInfo, OutageInfo } from './outageInfo';

interface IndividualStatus {
  status: string;
  recent: {
    date: Date;
    status: string;
  }[];
}

export interface RecentStatus {
  status: string;
  current_outage: OutageInfo[];
  apis: {
    user: IndividualStatus;
    admin: IndividualStatus;
    file: IndividualStatus;
  };
  sites: {
    user: IndividualStatus;
    admin: IndividualStatus;
  };
}

const individualStatus = {
  status: { type: 'string', enum: ['green', 'yellow', 'red'] },
  recent: {
    type: 'array',
    maxItems: 30,
    items: {
      type: 'object',
      properties: {
        date: { type: 'string', example: '2021-10-23T21:40:44.248Z' },
        status: { type: 'string', enum: ['green', 'yellow', 'red'] },
      },
    },
  },
};

export const recentStatus = {
  status: { type: 'string', enum: ['green', 'yellow', 'red'] },
  current_outage: { type: 'array', items: outageInfo },
  apis: {
    type: 'object',
    properties: {
      user: { type: 'object', properties: individualStatus },
      admin: { type: 'object', properties: individualStatus },
      file: { type: 'object', properties: individualStatus },
    },
  },
  sites: {
    type: 'object',
    properties: {
      user: { type: 'object', properties: individualStatus },
      admin: { type: 'object', properties: individualStatus },
    },
  },
};
