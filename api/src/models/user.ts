import bcrypt from 'bcrypt';
import validator from 'email-validator';
import { dbQuery } from '../db';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

function pepper(pw: string): string {
    return pw + process.env.PEPPER;
}

interface User {
    name: string,
    email: string,
    pwHash: string,
    key: string
}

async function genUser(name: string, email: string, pw: string): Promise<User> {
    if (!validator.validate(email)) {
        throw new Error(`invalid email: ${email}`);
    }

    const salt = await bcrypt.genSalt(12);
    const pwHash = await bcrypt.hash(pepper(pw), salt);
    const key = (await crypto.randomBytes(32)).toString('hex');

    return {
        name,
        email,
        pwHash,
        key
    };
};

async function createUser(name: string, email: string, pw: string) {
    const user = await genUser(name, email, pw);
    const query = `
INSERT INTO users(id, name, email, pw_hash, key)
VALUES (DEFAULT, $1, $2, $3, $4);
    `;
    return dbQuery(query, [user.name, user.email, user.pwHash, user.key]);
}

async function authenticate(email: string, pw: string): Promise<string> {
    const query = {
        text: `
SELECT pw_hash, key FROM users WHERE email=$1
        `,
        rowMode: 'array'
    };

    const result = await dbQuery(query, [email]);
    if (result.rowCount === 0) {
        return null;
    }

    const pwHash = result.rows[0][0];
    const key = result.rows[0][1];

    if (await bcrypt.compare(pepper(pw), pwHash)) {
        return key;
    } else {
        return null;
    }
}

async function validateKey(id: number, key: string): Promise<boolean> {
    const query = {
        text: `
SELECT key FROM users WHERE id=$1
        `,
        rowMode: 'array',
    };

    const result = await dbQuery(query, [id]);
    if (result.rowCount === 0) {
        return null;
    }

    const realKey = result.rows[0][0];

    return key === realKey;
}

export { User, createUser, authenticate, validateKey }