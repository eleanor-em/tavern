import express from 'express';
import { charRouter } from './char';
import { rollRouter } from './roll';
import { userRouter } from './user';

const apiRouter = express.Router();
apiRouter.use('/roll', rollRouter);
apiRouter.use('/char', charRouter);
apiRouter.use('/user', userRouter);

apiRouter.get('/', (req, res, next) => {
    res.send('API is online');
});


export { apiRouter };