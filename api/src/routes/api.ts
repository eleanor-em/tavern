import express from 'express';
import { rollRouter } from './roll';

const apiRouter = express.Router();
apiRouter.use('/roll', rollRouter);

apiRouter.get('/', (req, res, next) => {
    res.send('API is online');
});


export { apiRouter };