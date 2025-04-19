import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favourites() {
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch('https://hp-api.onrender.com/api/characters')
            .then((response) => response.json())
            .then((data) => setCharacters(data))
            .catch((error) =>
                console.error('Error fetching characters:', error)
            );
    }, []);

    const favouriteCharacters = characters.filter((character) =>
        favourites.includes(character.id)
    );

    const removeFavourite = (characterId) => {
        const updatedFavourites = favourites.filter(
            (favId) => favId !== characterId
        );
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    if (favouriteCharacters.length === 0) {
        return (
            <div className="movie-details-container">
                <h1>No Favourite Characters Yet</h1>
                <Link to="/" className="view-favourites-button">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="movie-details-container">
            <h1>Favourite Characters</h1>
            <ul className="character-list">
                {favouriteCharacters.map((character) => (
                    <li key={character.id} className="character-item">
                        <Link to={`/character/${character.id}`}>
                            <img
                                src={character.image}
                                alt={character.name}
                                className="character-thumbnail"
                            />
                            <p>{character.name}</p>
                        </Link>
                        <button onClick={() => removeFavourite(character.id)}>
                            Remove Favourite
                        </button>
                    </li>
                ))}
            </ul>
            <Link to="/" className="view-favourites-button">
                Back to Home
            </Link>
        </div>
    );
}

export default Favourites;
