import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./NavBar.css";

function NavBar() {
  const { cartDetails } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("استعلام البحث:", searchQuery);
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery(""); // مسح الكلمة بعد إجراء البحث
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark text-white">
        <div className="container">
          <Link className="nav-link" to={"/home"}>
            <i className="fa-solid fa-film" />{" "}
            الأفلام
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/home"}>
                  الرئيسية
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="moviesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  أفلام
                </Link>
                <ul className="dropdown-menu" aria-labelledby="moviesDropdown">
                  <li>
                    <Link className="dropdown-item" to={"/movies/arabic"}>
                      عربي
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/movies/foreign"}>
                      أجنبي
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="seriesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  مسلسلات
                </Link>
                <ul className="dropdown-menu" aria-labelledby="seriesDropdown">
                  <li>
                    <Link className="dropdown-item" to={"/series/arabic"}>
                      عربي
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/series/turkish"}>
                      تركي
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/aboutme"}>
                  من أنا
                </Link>
              </li>
            </ul>

            <form className="d-flex" onSubmit={handleSearch} role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="بحث"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchInput}
              />
              <button className="btn btn-outline-success" type="submit">
                بحث
              </button>
            </form>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>
                  <i className="fa-solid fa-right-to-bracket" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
