import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SeriesArabic.css";

export default function SeriesArabic() {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev/arabic_series")
      .then((response) => {
        setSeries(response.data);
      })
      .catch((error) => {
        setError("There was an error fetching the series.");
        console.error("There was an error fetching the series:", error);
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!series.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="series-container">
      <h1 className="page-title">المسلسلات العربية</h1>
      <div className="series-list">
        {series.map((serie) => (
          <div className="series-card" key={serie.id}>
            <Link to={`/series/arabic/${serie.id}/episodes`} className="series-link">
              <div
                className="series-image"
                style={{
                  backgroundImage: `url(https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev${serie.img})`,
                }}
              ></div>
            </Link>
            <div className="series-info">
              <h2 className="series-title">{serie.title}</h2>
              <p className="series-description">{serie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
