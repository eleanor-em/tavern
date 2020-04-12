import { Character, genCharacter, createCharacter, validateStats } from '../models/character';
import express from 'express';
import { isNumber } from 'util';

const charRouter = express.Router();
charRouter.post('/', async (req, res) => {
    const { name, strength, dexterity, constitution, intelligence, wisdom, charisma } = req.body;
    if (name === null) {
        res.status(400);
        res.send({
            status: false,
            error: 'missing field `name`'
        });
    } else if (strength === null) {
        res.status(400);
        res.send({
            status: false,
            error: 'missing field `strength`'
        });
    } else if (dexterity === null) {
        res.send({
            status: false,
            error: 'missing field `dexterity`'
        });
    } else if (constitution === null) {
        res.status(400);
        res.send({
            status: false,
            error: 'missing field `constitution`'
        });
    } else if (intelligence === null) {
        res.status(400);
        res.send({
            status: false,
            error: 'missing field `intelligence`'
        });
    } else if (wisdom === null) {
        res.status(400);
        res.send({
            status: false,
            error: 'missing field `wisdom`'
        });
    } else if (charisma === null) {
        res.status(400);
        res.send({
            status: false,
            error: 'missing field `charisma`'
        });
    } else {
        const char = genCharacter(name, [strength, dexterity, constitution, intelligence, wisdom, charisma]);
        const validation = validateStats(char.stats);
        if (validation.length > 0) {
            res.status(400);
            res.send({
                status: false,
                error: 'malformed field `' + validation + '`'
            });
        } else {
            try {
                const dbResponse = await createCharacter(char);
                res.send({
                    status: true
                });
            } catch (err) {
                res.status(400);
                console.error(err);
                res.send({
                    status: false,
                    error: err
                });
            }
        }
    }
});

export { charRouter };