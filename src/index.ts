import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(morgan('common'));

app.listen(process.env.PORT, () =>
  console.log('listening on port ' + process.env.PORT),
);
