import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

function Search() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesArabicResponse = await axios.get(
          `https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev/moviesarabic`
        );
        const moviesForeignResponse = await axios.get(
          `https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev/moviesforeign`
        );
        const arabicSeriesResponse = await axios.get(
          `https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev/arabic_series`
        );
        const turkishSeriesResponse = await axios.get(
          `https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev/turkish_series`
        );

        if (query) {
          const filteredMoviesArabic = moviesArabicResponse.data
            .filter((item) =>
              item.title.toLowerCase().includes(query.toLowerCase())
            )
            .map((item) => ({
              ...item,
              type: "moviesarabic",
              id: `arabic_${item.id}`,
            }));

          const filteredMoviesForeign = moviesForeignResponse.data
            .filter((item) =>
              item.title.toLowerCase().includes(query.toLowerCase())
            )
            .map((item) => ({
              ...item,
              type: "moviesforeign",
              id: `foreign_${item.id}`,
            }));

          const filteredArabicSeries = arabicSeriesResponse.data
            .filter((item) =>
              item.title.toLowerCase().includes(query.toLowerCase())
            )
            .map((item) => ({
              ...item,
              type: "arabic_series",
              id: `arabic_${item.id}`,
            }));

          const filteredTurkishSeries = turkishSeriesResponse.data
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
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
                  src={`https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev${item.img}`}
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
