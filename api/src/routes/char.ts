import { Character, genCharacter, createCharacter, validateStats, getCharacterDetails } from '../models/character';
import express from 'express';
import { isNumber } from 'util';
import { validateKey } from '../models/user';

const charRouter = express.Router();

charRouter.post('/', async (req, res) => {
    const { user, name, strength, dexterity, constitution, intelligence, wisdom, charisma } = req.body;
    if (!('id' in user)) {
        res.status(400);
        res.send({
            status: false,
            error: 'missing field `user.id`'
        });
    } else if (!('key' in user)) {
        res.status(400);
        res.send({
            status: false,
            error: 'missing field `user.key`'
        });
    } else if (name === null) {
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
                if (validateKey(user.id, user.key)) {
                    const dbResponse = await createCharacter(user.id, char);
                    res.send({
                        status: true
                    });
                } else {
                    res.status(403);
                    res.send({
                        status: false,
                        error: 'authentication error'
                    });
                }
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

charRouter.get('/:charId', async (req, res) => {
    const id = parseInt(req.params.charId, 10);
    const { key } = req.body;

    try {
        const result = await getCharacterDetails(id);
        // TODO: below line sucks
        if (await validateKey((result as unknown as { 'owner_id': number }).owner_id, key)) {
            res.send({
                status: true,
                result
            });
        } else {
            res.status(403);
            res.send({
                status: false,
                error: 'authentication error'
            })
        }
    } catch (error) {
        res.status(500);
        res.send({
            status: false,
            err: error
        });
    }
});

export { charRouter };