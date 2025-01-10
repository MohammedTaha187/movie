import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../../db.json"; 
import "./MoviesArabic.css";

export default function MoviesArabic() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    if (data) {
      setMovies(data.moviesarabic); 
    } else {
      setError("There was an error loading the data.");
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
      <h1 className="page-title">الأفلام العربية</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <Link to={`/watch/movie/${movie.id}`} className="movie-link">
              <img src={movie.img} alt={movie.title} className="movie-img" />
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
