import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const initialProducts = [];
const initialCategories = [];
const initialUsers = [];
const initialPurchases = [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(initialCategories);
  const [users, setUsers] = useState(initialUsers);
  const [purchases, setPurchases] = useState(initialPurchases);
  const [returns, setReturns] = useState([]);

  const addToCart = (product) => {
    const cartItem = { ...product, cartItemId: Date.now() };
    setCart((prevCart) => [...prevCart, cartItem]);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const addProduct = (product) => { 
    product.addedDate = new Date();
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const editProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const addCategory = (category) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  const editCategory = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  const deleteCategory = (categoryId) => {
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
  };

  const setAllCategories = (categories) => {
    setCategories(categories);
  };

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const setAllUsers = (users) =>{
    setUsers(users);
  }

  const setproduct = (products) =>{
    setProducts(products);
  }

  const editUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const completePurchase = () => {
    const newPurchases = cart.map(product => ({...product, date: new Date()}));
    setPurchases((prevPurchases) => [...prevPurchases, ...newPurchases]);
    setCart([]);
  };

  const returnProduct = (productId) => {
    const product = purchases.find(item => item.id === productId);
    if (product) {
      setReturns((prevReturns) => [...prevReturns, {...product, date: new Date()}]);
      setPurchases((prevPurchases) => prevPurchases.filter(item => item.id !== productId));
    }
  };

  const cartCount = cart.length;
  const total = cart.reduce((acc, product) => acc + parseFloat(product.price), 0).toFixed(2);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, cartCount, total, setproduct, setAllUsers,
      products, addProduct, editProduct, deleteProduct, 
      categories, addCategory, editCategory, deleteCategory, setAllCategories,
      users, addUser, editUser, deleteUser, completePurchase, returnProduct , returns, purchases
    }}>
      {children}
    </CartContext.Provider>
  );
};
