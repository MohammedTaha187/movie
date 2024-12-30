import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Watch.css";

export default function Watch() {
  const { type, id } = useParams(); 
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let endpoint = "";

    if (type === "movie") {
      if (id.startsWith("foreign-")) {
        endpoint = `http://localhost:5001/moviesforeign/${id}`;
      } else {
        endpoint = `http://localhost:5001/moviesarabic/${id}`;
      }
    } else if (type === "series") {
      if (id.includes("turkish")) {
        endpoint = `http://localhost:5001/turkish_series/${id}`;
      } else {
        endpoint = `http://localhost:5001/arabic_series/${id}`;
      }
    }

    axios
      .get(endpoint)
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        setError("حدث خطأ أثناء جلب البيانات.");
        console.error(error);
      });
  }, [type, id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!item) {
    return <div>تحميل...</div>;
  }

  return (
    <div className="watch-container">
      <div
        className="movie-header"
        style={{
          backgroundImage: `url(http://localhost:5001${item.img})`,
        }}
      >
        <div className="overlay"></div>
        <div className="movie-title">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      </div>

      <div className="movie-content">
        {type === "movie" && item.video_url && (
          <div className="video-container">
            <video controls>
              <source src={`http://localhost:5001${item.video_url}`} type="video/mp4" />
              متصفحك لا يدعم وسم الفيديو.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}
