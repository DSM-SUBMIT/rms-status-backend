import * as express from 'express';
import * as morgan from 'morgan';
import 'dotenv/config';

const app = express();

app.use(morgan('common'));

app.listen(process.env.PORT, () =>
  console.log('listening on port ' + process.env.PORT),
);
