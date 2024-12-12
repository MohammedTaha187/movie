import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MoviesArabic.css";

export default function MoviesArabic() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev/moviesarabic")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        setError("There was an error fetching the movies.");
        console.error("There was an error fetching the movies:", error);
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movies.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movies-container">
      <h1 className="page-title">الأفلام العربية</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
          <Link to={`/watch/movie/${movie.id}`} className="movie-link">
            <img
              src={`https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev${movie.img}`}
              alt={movie.title}
              className="movie-img"
            />
          </Link>
          <div className="movie-info">
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-description">{movie.description}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
