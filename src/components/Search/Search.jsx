import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import data from "../../../db.json"; 

function Search() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      const filteredMoviesArabic = data.moviesarabic
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((item) => ({
          ...item,
          type: "moviesarabic",
          id: `arabic_${item.id}`,
        }));

      const filteredMoviesForeign = data.moviesforeign
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((item) => ({
          ...item,
          type: "moviesforeign",
          id: `foreign_${item.id}`,
        }));

      const filteredArabicSeries = data.arabic_series
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((item) => ({
          ...item,
          type: "arabic_series",
          id: `arabic_${item.id}`,
        }));

      const filteredTurkishSeries = data.turkish_series
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((item) => ({
          ...item,
          type: "turkish_series",
          id: `turkish_${item.id}`,
        }));

      setSearchResults([
        ...filteredMoviesArabic,
        ...filteredMoviesForeign,
        ...filteredArabicSeries,
        ...filteredTurkishSeries,
      ]);
    }
    setLoading(false);
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="card-container">
          {searchResults.map((item) => (
            <div key={item.id} className="card">
              <Link
                to={
                  item.type === "arabic_series"
                    ? `/series/arabic/${item.id.replace(
                        /^arabic_/,
                        ""
                      )}/episodes`
                    : item.type === "turkish_series"
                    ? `/series/turkish/${item.id.replace(
                        /^turkish_/,
                        ""
                      )}/episodes`
                    : `/watch/movie/${item.id.replace(
                        /^(arabic_|foreign_)/,
                        ""
                      )}`
                }
                className="card-link"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="card-img"
                />
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
