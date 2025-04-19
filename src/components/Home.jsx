import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const searchCharacters = () => {
        fetch(`https://hp-api.onrender.com/api/characters`)
            .then((response) => response.json())
            .then((data) => {
                const filteredCharacters = data.filter((character) =>
                    character.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                );
                setCharacters(filteredCharacters);
                setCurrentPage(1); // Reset to the first page after search
            })
            .catch((error) =>
                console.error('Error searching characters:', error)
            );
    };

    const toggleFavourite = (character) => {
        const updatedFavourites = favourites.includes(character.id)
            ? favourites.filter((favId) => favId !== character.id)
            : [...favourites, character.id];
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    useEffect(() => {
        fetch('https://hp-api.onrender.com/api/characters')
            .then((response) => response.json())
            .then((data) => setCharacters(data))
            .catch((error) =>
                console.error('Error fetching characters:', error)
            );
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCharacters = characters.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(characters.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container">
            <h1 className="Heading">Harry Potter Characters</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a character"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={searchCharacters} className="search-button">
                    Search
                </button>
            </div>
            <ul className="character-list">
                {currentCharacters.map((character) => (
                    <li key={character.id} className="character-item">
                        <button
                            onClick={() => toggleFavourite(character)}
                            className="favourite-button"
                        >
                            <i
                                className={
                                    favourites.includes(character.id)
                                        ? 'ri-heart-fill'
                                        : 'ri-heart-line'
                                }
                                style={{
                                    color: favourites.includes(character.id)
                                        ? 'red'
                                        : 'gray',
                                    fontSize: '1.5rem',
                                }}
                            ></i>
                        </button>
                        <Link to={`/character/${character.id}`}>
                            <img
                                src={character.image}
                                alt={character.name}
                                className="character-thumbnail"
                            />
                            <p>{character.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <Link to="/favourites" className="view-favourites-button">
                View Favourites
            </Link>
        </div>
    );
}

export default Home;
