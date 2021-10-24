export const periodRequest = {
  type: 'object',
  required: ['year', 'month'],
  additionalProperties: false,
  properties: {
    year: { type: 'number', minimun: 2021 },
    month: { type: 'number', minimum: 1, maximum: 12 },
  },
};

export interface PeriodRequest {
  year: number;
  month: number;
}
