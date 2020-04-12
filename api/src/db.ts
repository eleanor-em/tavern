import { Pool } from 'pg';
import { Character } from './models/character';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD
};

const pool = new Pool(databaseConfig);
pool.on('connect', () => {
    console.log('Opened PostgreSQL connection.');
})

const createCharacterTable = () => {
    const query = `
CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
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

const createUserTable = () => {
    const query = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    pw_hash CHAR(60),
    key CHAR(64) UNIQUE
);
    `;

    return pool.query(query);
}

function createTables() {
    return createUserTable().then(createCharacterTable);
}

const dbQuery = (query: any, params: any[] = []) => pool.query(query, params);

const dbClose = () => {
    pool.end();
}

export { dbQuery, dbClose, createTables };