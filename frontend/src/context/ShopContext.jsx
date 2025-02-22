import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;
  const backendUrl= import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products,setProducts]= useState([]);
  const [token,setToken]=useState('')
  const navigate = useNavigate();

  // Add item to the cart or increment its quantity
  const addToCart = async (itemId, quantity = 1) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += quantity; // Increment the existing quantity
    } else {
      cartData[itemId] = quantity; // Set initial quantity for a new item
    }

    setCartItems(cartData); // Update the state
  };

  // Get the total count of items in the cart
  const getCartCount = () => {
    // Directly sum up all item quantities in the cart
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  // Update the quantity of a specific item
  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity > 0) {
      cartData[itemId] = quantity; // Update the quantity for the item
    } else {
      delete cartData[itemId]; // Remove the item if quantity is 0
    }

    setCartItems(cartData); // Update the state
  };

  // Get the total amount of the cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  const getProductsData = async ()=>{
    try{
      const response = await axios.get(backendUrl+'/api/products/list')
      if (response.data.success) {
        setProducts(response.data.products.reverse())
    } else {
        toast.error(response.data.message)
    }

} catch (error) {
    console.log(error)
    toast.error(error.message)
}
  }
  useEffect(()=>{
    getProductsData()
  },[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,token,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;