import { useEffect } from "react";
import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx"; 

function App(){
  const [movies, setMovies] = useState([]);
  const [favourites, setFavorites] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState('search'); //search or favourite

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (view === 'favorites') {
      setMovies([]);
      return;
  }
  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      let url;
      if (searchTerm) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
      }
      const res =  await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages || 0, 500)); //TMDB API max page limit
    }
    catch (err) {
      setError("Failed to fetch movies");
    }
    finally {
      setLoading(false);
    }
  }
  fetchMovies();
}, [view, searchTerm, page, API_KEY]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  }

  // Menu
  return <div className = "container mx-auto p-4 flex flex-col items-center text-center">
    <h1 className="text-4x1 font-extrabold mb-6 drop-shadow-2x1">Movie App</h1>
    <div className="tabs tabs-border mb-6">
      <a className={`tab text-lg ${view === "search" ? 
        "tab-active" : ""}`} 
        onClick={()=> {
        setView("search");
        setPage(1)}}>
          Search / Popular
        </a>
      <a className={`tab text-lg ${view === "favorites" ? 
        "tab-active" : ""}`}
        onClick={()=> setView("favorites")}>
            Favorites
      </a>
    </div>
    
    {view === "search" && (
      <div className="w-full max-w-md mb-6">
        <SearchBar onSearch = {handleSearch}/>
      </div>
    )}
  </div>;
}

export default App;