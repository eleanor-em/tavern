import React from 'react';
import '../css/App.css';
import User from './models/User';
import { CharacterList } from './CharacterList';

interface LandingProps {
    user: User
}

function Landing(props: LandingProps) {
    const { user } = props;

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    <span className="Title">Tavern</span>
                    <span className="Greeting">Stay a while and listen, {user.name}.</span>
                </p>
            </header>
            <div className="Content">
                <CharacterList user={user} />
            </div>
        </div>
    );
}

export default Landing;