interface PostItem {
  title: string;
  date: Date;
  content: string;
}

export interface OutageInfo {
  title: string;
  posts: PostItem[];
  affected_on: string;
  severity: string;
  date: Date;
}

export const outageInfo = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    posts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          date: { type: 'string', example: '2021-10-23T21:40:44.248Z' },
          content: { type: 'string' },
        },
      },
    },
    affected_on: { type: 'string' },
    severity: { type: 'string', enum: ['yellow', 'red'] },
    date: { type: 'string', example: '2021-10-23T21:40:44.248Z' },
  },
};
