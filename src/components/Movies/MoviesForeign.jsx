import React, { useEffect, useState } from "react";
`import data from "../../../db.json"; `
import { Link } from "react-router-dom";
import "./MoviesArabic.css";

export default function MoviesForeign() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      setMovies(data.moviesforeign);  
    } else {
      setError("There was an error loading the movies data.");
    }
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movies.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movies-container">
      <h1 className="page-title">الأفلام الاجنبي</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <Link to={`/watch/movie/${movie.id}`} className="movie-link">
              <img
                src={movie.img} 
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
