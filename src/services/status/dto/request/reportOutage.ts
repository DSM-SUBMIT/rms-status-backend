export const reportOutage = {
  type: 'object',
  required: ['title', 'content'],
  additionalProperties: false,
  properties: {
    title: { type: 'string', maxLength: 40 },
    content: { type: 'string', maxLength: 200 },
  },
};

export interface ReportOutage {
  title: string;
  content: string;
}
