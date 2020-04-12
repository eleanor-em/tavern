import { dbQuery } from '../db';

interface StatBlock {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
}

const validateStats = (stats: StatBlock): string => {
    if (isNaN(stats.strength)) {
        return 'strength';
    }
    if (isNaN(stats.dexterity)) {
        return 'dexterity';
    }
    if (isNaN(stats.constitution)) {
        return 'constitution';
    }
    if (isNaN(stats.intelligence)) {
        return 'intelligence';
    }
    if (isNaN(stats.wisdom)) {
        return 'wisdom';
    }
    if (isNaN(stats.charisma)) {
        return 'charisma';
    }
    return '';
}

interface Character {
    name: string,
    stats: StatBlock
}

const genCharacter = (name: string, stats: string[]): Character => {
    return {
        name,
        stats: {
            strength: parseInt(stats[0], 10),
            dexterity: parseInt(stats[1], 10),
            constitution: parseInt(stats[2], 10),
            intelligence: parseInt(stats[3], 10),
            wisdom: parseInt(stats[4], 10),
            charisma: parseInt(stats[5], 10),
        }
    };
}

function createCharacter(userId: number, char: Character) {
    const query = `
INSERT INTO characters(id, owner_id, name, strength, dexterity, constitution, intelligence, wisdom, charisma)
VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8);
    `;
    return dbQuery(query, [userId, char.name, char.stats.strength, char.stats.dexterity,
        char.stats.constitution, char.stats.intelligence, char.stats.wisdom, char.stats.charisma]);
};

async function getCharacters(userId: number) {
    const query = `
SELECT id, name FROM characters WHERE owner_id=$1;
    `;

    return (await dbQuery(query, [userId])).rows;
}

async function getCharacterDetails(charId: number) {
    const query = `
SELECT * FROM characters WHERE id=$1;
    `;

    return (await dbQuery(query, [charId])).rows[0];
}

export { Character, StatBlock, genCharacter, createCharacter, validateStats, getCharacters, getCharacterDetails }