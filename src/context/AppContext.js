import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getFeaturedProducts, 
  getCategories, 
  getProductsByCategory,
  getTestimonials,
  createOrder,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  getCurrentUser
} from '../supabaseClient';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  
  // Inicializar la aplicación
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      
      try {
        // Verificar sesión de usuario
        const { data: { user } } = await getCurrentUser();
        setUser(user);
        
        // Cargar datos
        const [featuredProducts, categoriesData, testimonialsData] = await Promise.all([
          getFeaturedProducts(),
          getCategories(),
          getTestimonials()
        ]);
        
        setProducts(featuredProducts);
        setCategories(categoriesData);
        setTestimonials(testimonialsData);
        
        // Recuperar carrito del localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeApp();
  }, []);
  
  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Manejar categorías
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    const products = await getProductsByCategory(categoryId);
    setProducts(products);
  };
  
  // Carrito de compras
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity } 
        : item
    ));
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Manejar pedidos
  const placeOrder = async () => {
    if (!user) {
      throw new Error('Debes iniciar sesión para realizar un pedido');
    }
    
    if (cart.length === 0) {
      throw new Error('El carrito está vacío');
    }
    
    const orderId = await createOrder(user.id, cart);
    clearCart();
    return orderId;
  };
  
  // Autenticación
  const login = async (email, password) => {
    const { user, error } = await signInWithEmail(email, password);
    
    if (error) {
      throw error;
    }
    
    setUser(user);
    return user;
  };
  
  const register = async (email, password, name) => {
    const { user, error } = await signUpWithEmail(email, password, name);
    
    if (error) {
      throw error;
    }
    
    setUser(user);
    return user;
  };
  
  const logout = async () => {
    const { error } = await signOut();
    
    if (error) {
      throw error;
    }
    
    setUser(null);
  };
  
  return (
    <AppContext.Provider value={{
      products,
      categories,
      testimonials,
      loading,
      user,
      cart,
      cartTotal,
      selectedCategory,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
      handleCategoryChange,
      login,
      register,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};