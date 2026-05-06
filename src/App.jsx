import { useEffect } from "react";
import { useState } from "react";

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
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    }
    catch (err) {
      setError("Failed to fetch movies");
    }
  }
});
  return <div>Movie App</div>;
}

export default App;