import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Watch from "./components/Watch/Watch"; 
import Search from "./components/Search/Search";
import Episodes from "./components/Episodes/Episodes";
import AboutMe from "./components/AboutMe/AboutMe";
import MoviesArabic from "./components/Movies/MoviesArabic";
import SeriesArabic from "./components/Series/SeriesArabic";
import MoviesForeign from "./components/Movies/MoviesForeign";
import SeriesTurkish from "./components/Series/SeriesTurkish";
import WatchEpisode from "./components/WatchEpisode/WatchEpisode"; 

function ErrorBoundary({ error }) {
  return <div>حدث خطأ: {error.message}</div>;
}

function App() {
  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
          { path: "", element: <Home /> },
          { path: "home", element: <Home /> },
          { path: "movies/arabic", element: <MoviesArabic /> },
          { path: "movies/foreign", element: <MoviesForeign /> },
          { path: "series/arabic", element: <SeriesArabic /> },
          { path: "series/turkish", element: <SeriesTurkish /> },
          { path: "series/:type/:id/episodes", element: <Episodes /> },
          { path: "aboutme", element: <AboutMe /> },
          { path: "signup", element: <SignUp /> },
          { path: "search", element: <Search /> },

          
          { path: "watch/:type/:id", element: <Watch /> },

          
          { path: "watch/:type/:id/episode/:season_number/:episode_number", element: <WatchEpisode /> },
        ],
      },
    ],
    { basename: "/movie" }
  );

  return <RouterProvider router={routes} />;
}

export default App;
