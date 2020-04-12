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

const createCharacter = (char: Character) => {
    const query = `
INSERT INTO characters(id, name, strength, dexterity, constitution, intelligence, wisdom, charisma)
VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7);
    `;
    return dbQuery(query, [char.name, char.stats.strength, char.stats.dexterity,
        char.stats.constitution, char.stats.intelligence, char.stats.wisdom, char.stats.charisma]);
};

export { Character, StatBlock, genCharacter, createCharacter, validateStats }