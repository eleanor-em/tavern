import User from './models/User';
import { CharSummary } from './models/Character';

interface CharList {
    characters: CharSummary[]
}

const url = 'http://localhost:9000';

async function getCharacters(user: User): Promise<CharList> {
    const response = await fetch(url + '/api/user/' + user.id + '/chars', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': user.key
        }
    });
    const { status, result, error } = await response.json();

    if (status) {
        return Promise.resolve({
            characters: result
        });
    } else {
        throw error;
    }
    
}

async function authenticate(email: string, pw: string): Promise<User> {
    const response = await fetch(url + '/api/user/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pw })
    });
    const { status, result, error } = await response.json();

    if (status) {
        return Promise.resolve({
            id: result.id,
            name: result.name,
            key: result.key
        });
    } else {
        throw error;
    }
}

const api = {
    authenticate,
    getCharacters
};

export default api;