import express from 'express';
import logger from 'morgan';
const apiRouter = express.Router();

apiRouter.get('/', (req, res, next) => {
    res.send('API is online');
});

apiRouter.get('/roll', (req, res, next) => {
    const { roll } = req.body;

    const rolls = roll.split('+');
    
    let status = true;
    let result = 0;

    for (let n = 0; n < rolls.length; ++n) {
        // required: number before d
        const count = rolls[n].match(/^\d+/g);
        // required: number after d
        const dx = rolls[n].match(/d(\d+)/g);
        console.log(count);
        console.log(dx);

        if (count !== null && count.length > 0) {
            const diceCount = parseInt(count[0]);
            if (diceCount === NaN) {
                status = false;
                break;
            }
            if (dx !== null && dx.length > 0) {
                const die = parseInt(dx[0].slice(1));
                if (die === NaN) {
                    status = false;
                    break;
                } else {
                    for (let i = 0; i < diceCount; ++i) {
                        result += Math.floor(Math.random() * die) + 1;
                    }
                }
            } else {
                result += diceCount;
            }
        } else {
            status = false;
            break;
        }
    }
    if (status) {
        res.send({
            status,
            result
        });
    } else {
        res.send({
            status,
            error: 'malformed roll'
        });
    }
});

export { apiRouter };