import { User, createUser, authenticate, validateKey } from '../models/user';
import express from 'express';
import { getCharacters } from '../models/character';

const userRouter = express.Router();
userRouter.post('/', async (req, res) => {
    const { name, email, pw } = req.body;

    try {
        await createUser(name, email, pw);
        res.send({
            status: true
        });
    } catch (error) {
        console.error(error);
        res.status(400);
        res.send({
            status: false,
            error
        });
    }
});

userRouter.get('/:userId/chars', async (req, res) => {
    const id = parseInt(req.params.userId, 10);
    const key = req.headers['x-api-key'] as string;

    if (await validateKey(id, key)) {
        const result = await getCharacters(id);
        res.send({
            status: true,
            result
        });
    } else {
        res.status(403);
        res.send({
            status: false,
            error: 'authentication error'
        });
    }
});

// For some unknown reason, the fetch API refuses to allow GET requests to have a body.
// This means we have to use POST here, even though it makes no sense..
userRouter.post('/auth', async (req, res) => {
    const { email, pw } = req.body;

    try {
        const [id, key, name] = await authenticate(email, pw);
        if (key != null) {
            res.send({
                status: true,
                result: {
                    id,
                    key,
                    name
                }
            });
        } else {
            res.status(403);
            res.send({
                status: false,
                error: 'authentication error'
            });
        }
    } catch (error) {
        res.status(400);
        res.send({
            status: false,
            error
        });
    }
});

export { userRouter }