import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export let CartContext = createContext();

const API_BASE_URL =
  "https://de20c983-e204-41ff-8ac8-ff32b1e8b12f-00-3anh942776nda.picard.replit.dev";

function addToCart(product) {
  return axios
    .post(`${API_BASE_URL}/cart`, {
      ...product,
      count: 1,
    })
    .then((res) => res)
    .catch((err) => err);
}

function getCart() {
  return axios
    .get(`${API_BASE_URL}/cart`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching cart:", err);
      throw err;
    });
}

function deleteFromCart(id) {
  return axios
    .delete(`${API_BASE_URL}/cart/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error deleting from cart:", err);
      throw err;
    });
}

function updateFromCart(id, count) {
  return axios
    .patch(`${API_BASE_URL}/cart/${id}`, {
      count: count,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error updating cart:", err);
      throw err;
    });
}

function clearCart() {
  return axios
    .get(`${API_BASE_URL}/cart`)
    .then((res) => {
      const deleteRequests = res.data.map((item) =>
        axios.delete(`${API_BASE_URL}/cart/${item.id}`)
      );
      return Promise.all(deleteRequests);
    })
    .catch((err) => console.error("Failed to clear cart:", err));
}

export default function CartContextProvider(props) {
  const [cartCount, setCartCount] = useState(0);
  const [cartDetails, setCartDetails] = useState([]);

  async function updateCartDetails() {
    try {
      const res = await getCart();
      setCartDetails(res);
      setCartCount(res.length);
    } catch (error) {
      console.error("Error updating cart details:", error);
    }
  }

  async function handleAddToCart(product) {
    try {
      const productExists = cartDetails.some((item) => item.id === product.id);

      if (productExists) {
        toast.error("Product is already in the cart!");
      } else {
        const res = await addToCart(product);
        if (res.status === 201) {
          toast.success("Product added to cart successfully!");
          updateCartDetails(); 
        } else {
          toast.error("Failed to add product to cart.");
        }
      }
    } catch (error) {
      toast.error("Error adding to cart.");
      console.error("Error adding to cart:", error);
    }
  }

  useEffect(() => {
    updateCartDetails();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart: handleAddToCart,
        getCart,
        deleteFromCart,
        updateFromCart,
        clearCart,
        cartCount,
        cartDetails,
        updateCartDetails, 
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
