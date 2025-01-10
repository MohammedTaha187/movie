import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../../db.json";  // استيراد البيانات من db.json
import "./Home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [arabicSeries, setArabicSeries] = useState([]);
  const [turkishSeries, setTurkishSeries] = useState([]);
  const [moviesForeign, setMoviesForeign] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // تعيين البيانات مباشرة من db.json
    if (data) {
      setMovies(data.moviesarabic || []);
      setArabicSeries(data.arabic_series || []);
      setMoviesForeign(data.moviesforeign || []);
      setTurkishSeries(data.turkish_series || []);
    } else {
      setError("There was an error loading the data.");
    }
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (
    !movies.length &&
    !arabicSeries.length &&
    !moviesForeign.length &&
    !turkishSeries.length
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">استكشف الأفلام والمسلسلات</h1>
          <p className="header-subtitle">
            اكتشف فيلمك أو مسلسل التلفزيون المفضل المقبل معنا!
          </p>
          <p className="header-description">
            انغمس في مكتبتنا الواسعة من الأفلام والمسلسلات. سواء كنت في المزاج
            لفيلم أكشن مثير، أو دراما رومانسية، أو مسلسل مشوق، لدينا شيء لكل
            الأذواق.
          </p>
        </div>
      </header>

      <section>
        <div className="home-container">
          <h1 className="page-title">الصفحة الرئيسية</h1>

          <div className="section">
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
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-description">{movie.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="movies-list">
              {moviesForeign.map((movie) => (
                <div className="movie-card" key={movie.id}>
                  <Link to={`/watch/movie/${movie.id}`} className="movie-link">
                    <img
                      src={movie.img}
                      alt={movie.title}
                      className="movie-img"
                    />
                  </Link>
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-description">{movie.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="movies-list">
              {arabicSeries.map((serie) => (
                <div className="movie-card" key={serie.id}>
                  <Link
                    to={`/series/arabic/${serie.id}/episodes`}
                    className="series-link"
                  >
                    <img
                      src={serie.img}
                      alt={serie.title}
                      className="movie-img"
                    />
                  </Link>
                  <div className="movie-info">
                    <h3 className="movie-title">{serie.title}</h3>
                    <p className="movie-description">{serie.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="movies-list">
              {turkishSeries.map((serie) => (
                <div className="movie-card" key={serie.id}>
                  <Link
                    to={`/series/turkish/${serie.id}/episodes`}
                    className="series-link"
                  >
                    <img
                      src={serie.img}
                      alt={serie.title}
                      className="movie-img"
                    />
                  </Link>
                  <div className="movie-info">
                    <h3 className="movie-title">{serie.title}</h3>
                    <p className="movie-description">{serie.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
