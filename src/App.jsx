import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CharactersDetails from './components/CharactersDetails';
import Favourites from './components/Favourites';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/character/:id" element={<CharactersDetails />} />
                <Route path="/favourites" element={<Favourites />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
