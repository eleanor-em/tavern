import { User, createUser, authenticate } from '../models/user';
import express from 'express';

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
})

userRouter.get('/auth', async (req, res) => {
    const { email, pw } = req.body;

    try {
        const result = await authenticate(email, pw);
        res.send({
            status: true,
            result
        });
    } catch (error) {
        res.status(400);
        res.send({
            status: false,
            error
        });
    }
})

export { userRouter }