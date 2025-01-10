import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../../db.json"; // تأكد من المسار الصحيح للملف
import "./SeriesArabic.css";

export default function SeriesTurkish() {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      setSeries(data.turkish_series); // تأكد أن 'turkish_series' موجود في db.json
    } else {
      setError("There was an error loading the data.");
    }
  }, []); 

  if (error) {
    return <div className="error-message">{error}</div>;
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
              <img
                src={serie.img} // تأكد أن 'img' موجود في كل عنصر من عناصر 'turkish_series'
                alt={serie.title}
                className="movie-img"
              />
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
