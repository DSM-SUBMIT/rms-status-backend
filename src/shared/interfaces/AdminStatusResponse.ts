export interface AdminStatusResponse {
  status: string;
  info: {
    database: {
      status: string;
    };
  };
  error: {};
  details: {
    database: {
      status: string;
    };
  };
}
