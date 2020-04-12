import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import { apiRouter } from './routes/api';
import { closeDb, createCharacterTable } from './db';

createCharacterTable()
  .then(res => {
      // console.log(res);
      console.log('Created table.');
  })
  .catch(err => {
      console.error(err);
  });

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ status: false, error: err.message });
});

const onClose = () => {
  closeDb();
  console.log('\nClosed PostgreSQL connection.');
}

export { app, onClose };