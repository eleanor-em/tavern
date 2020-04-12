import bcrypt from 'bcrypt';
import validator from 'email-validator';
import { dbQuery } from '../db';
import dotenv from 'dotenv';

dotenv.config();

function pepper(pw: string): string {
    return pw + process.env.PEPPER;
}

interface User {
    name: string,
    email: string,
    pwHash: string
}

async function genUser(name: string, email: string, pw: string): Promise<User> {
    if (!validator.validate(email)) {
        throw `invalid email: ${email}`;
    }

    const salt = await bcrypt.genSalt(12);
    const pwHash = await bcrypt.hash(pepper(pw), salt);

    return {
        name,
        email,
        pwHash
    };
};

async function createUser(name: string, email: string, pw: string) {
    const user = await genUser(name, email, pw);
    const query = `
INSERT INTO users(id, name, email, pw_hash)
VALUES (DEFAULT, $1, $2, $3);
    `;
    return dbQuery(query, [user.name, user.email, user.pwHash]);
}

async function authenticate(email: string, pw: string): Promise<boolean> {
    const query = {
        text: `
SELECT pw_hash FROM users WHERE email=$1
        `,
        rowMode: 'array',
    };

    const result = await dbQuery(query, [email]);
    const pwHash = result.rows[0][0];

    return await bcrypt.compare(pepper(pw), pwHash);
}

export { User, createUser, authenticate }