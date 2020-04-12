import express from 'express';
import logger from 'morgan';
const apiRouter = express.Router();

apiRouter.get('/', (req, res, next) => {
    res.send('API is online');
})

apiRouter.get('/roll', (req, res, next) => {
    const { roll } = req.body;
    const die = roll.match(/d(\d+)/);
    console.log(roll);
    res.send({ });
})

export { apiRouter };