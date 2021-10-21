declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      DEV_DB_HOST: string;
      DEV_DB_PORT: string;
      DEV_DB_USERNAME: string;
      DEV_DB_PASSWORD: string;
      DEV_DB_DATABASE: string;

      PROD_DB_HOST: string;
      PROD_DB_PORT: string;
      PROD_DB_USERNAME: string;
      PROD_DB_PASSWORD: string;
      PROD_DB_DATABASE: string;
    }
  }
}

export {};
