import React, { useState, useEffect } from 'react';
import User from './models/User';
import api from './api';
import { CharSummary } from './models/Character';

interface CharListProps {
    user: User
}

function CharacterList(props: CharListProps) {
    const [chars, setChars] = useState([] as JSX.Element[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.getCharacters(props.user);
                setChars(result.characters.map((char: CharSummary) => {
                    return (
                        <tr key={char.id}><td>{char.name}</td></tr>
                    );
                }));
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [props.user]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Characters</th>
                    </tr>
                </thead>
                <tbody>
                    {chars}
                </tbody>
            </table>
        </div>
    );
}

export { CharacterList };