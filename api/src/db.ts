import { Pool } from 'pg';
import { Character } from './character';

const databaseConfig = {
    host: 'localhost',
    port: 5432,
    database: 'tavern',
    user: 'tavernuser',
    password: 'develop'
};
const pool = new Pool(databaseConfig);
pool.on('connect', () => {
    console.log('Opened PostgreSQL connection.');
})

const createCharacterTable = () => {
    const query = `
CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    strength SMALLINT CHECK (strength > 0),
    dexterity SMALLINT CHECK (dexterity > 0),
    constitution SMALLINT CHECK (constitution > 0),
    intelligence SMALLINT CHECK (intelligence > 0),
    wisdom SMALLINT CHECK (wisdom > 0),
    charisma SMALLINT CHECK (charisma > 0)
);
    `;

    return pool.query(query);
};

const createCharacter = (char: Character) => {
    const query = `
INSERT INTO characters
VALUES (${char.name}, ${char.strength}, ${char.dexterity}, ${char.constitution}, ${char.intelligence}, ${char.wisdom}, ${char.charisma});
    `;
    return pool.query(query);
};

const closeDb = () => {
    pool.end();
}

export { closeDb, createCharacterTable };