import express from 'express';
const rollRouter = express.Router();

rollRouter.get('/', (req, res, next) => {
    const { roll } = req.body;

    const rolls = roll.split('+');

    let status = true;
    let result = 0;

    for (const currentRoll of rolls) {
        // required: number before d
        const count = currentRoll.match(/^\d+/g);
        // required: number after d
        const dx = currentRoll.match(/d(\d+)/g);

        if (count !== null && count.length > 0) {
            const diceCount = parseInt(count[0], 10);
            if (isNaN(diceCount)) {
                status = false;
                break;
            }
            if (dx !== null && dx.length > 0) {
                const die = parseInt(dx[0].slice(1), 10);
                if (isNaN(die)) {
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

export { rollRouter };