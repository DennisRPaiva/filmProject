import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

//d635080d

const API_URL = 'http://www.omdbapi.com?apikey=d635080d';

const movie1 = {
    "Title": "Back to the Future",
    "Year": "1985",
    "imdbID": "tt0088763",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    } 

    useEffect(() => {
        searchMovies('Back to the Future');
    }, [])

    return (
        <div className="app">
            <h1>MovieProject</h1>

            <div className='search'>
                <input placeholder='search for movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)}/>
            </div>

            {
                movies?.length > 0 ? 
                (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <p>No movies found</p>
                    </div>
                )
            }
        </div>
    );
}

export default App;
