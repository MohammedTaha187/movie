import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
let query = new QueryClient();

createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <QueryClientProvider client={query}>
    <StrictMode>
    <App />
  </StrictMode>

 </QueryClientProvider>
  </CartContextProvider>
 
);
