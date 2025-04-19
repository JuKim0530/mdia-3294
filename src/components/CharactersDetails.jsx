import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CharactersDetails() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        fetch(`https://hp-api.onrender.com/api/characters`)
            .then((response) => response.json())
            .then((data) => {
                const foundCharacter = data.find((char) => char.id === id);
                setCharacter(foundCharacter);
            })
            .catch((error) =>
                console.error('Error fetching character details:', error)
            );
    }, [id]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-details-container">
            <div className="wrap">
            <h1 className='character-name'>{character.name}</h1>
            <img
                src={character.image}
                alt={character.name}
                style={{ width: '200px', borderRadius: '8px', margin: '0 auto' }}
            />
            <p>
                <strong>House:</strong> {character.house}
            </p>
            <p>
                <strong>Actor:</strong> {character.actor}
            </p>
            <p>
                <strong>Species:</strong> {character.species}
            </p>
            <p>
                <strong>Gender:</strong> {character.gender}
            </p>
            <Link to="/" className="view-favourites-button">Back to Home</Link>
        </div>
        </div>
    );
}

export default CharactersDetails;
