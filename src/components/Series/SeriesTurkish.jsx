import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SeriesArabic.css";

export default function SeriesTurkish() {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev/turkish_series")
      .then((response) => {
        setSeries(response.data);
      })
      .catch((error) => {
        setError("There was an error fetching the series.");
        console.error("There was an error fetching the series:", error);
      });
  }, []);

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>إعادة المحاولة</button>
      </div>
    );
  }

  if (!series.length) {
    return (
      <div className="loading-message">جاري تحميل المسلسلات التركية...</div>
    );
  }

  return (
    <div className="series-container">
      <h1 className="page-title">المسلسلات التركية</h1>
      <div className="series-list">
        {series.map((serie) => (
          <div className="series-card" key={serie.id}>
            <Link
              to={`/series/turkish/${serie.id}/episodes`}
              className="series-link"
            >
              <div
                className="series-image"
                style={{
                  backgroundImage: `url(https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev${
                    serie.img || "/images/default-image.jpg"
                  })`,
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
