// src/App.js
import React, { useState } from 'react';
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes, FaStar, FaMedal, FaTruck, FaUndo } from 'react-icons/fa';
import './App.css';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'deportivos', name: 'Deportivos' },
    { id: 'urbanos', name: 'Urbanos' },
    { id: 'formales', name: 'Formales' },
    { id: 'botas', name: 'Botas' },
  ];

  const products = [
    {
      id: 1,
      name: "Zapatos Deportivos Elite",
      price: 89.99,
      category: "deportivos",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
      id: 2,
      name: "Zapatos Formales Elegance",
      price: 119.99,
      category: "formales",
      image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80"
    },
    {
      id: 3,
      name: "Botas Urbanas Premium",
      price: 99.99,
      category: "botas",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=651&q=80"
    },
    {
      id: 4,
      name: "Zapatillas Running Pro",
      price: 79.99,
      category: "deportivos",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Mocasines Clásicos",
      price: 94.99,
      category: "formales",
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Sneakers Urbanos",
      price: 69.99,
      category: "urbanos",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const testimonials = [
    {
      id: 1,
      name: "María González",
      text: "Los zapatos son increíblemente cómodos y el estilo es exactamente lo que buscaba. ¡Los recomiendo totalmente!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Carlos Martínez",
      text: "La calidad superó mis expectativas. Llevo usando mis zapatos por meses y todavía se ven como nuevos.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: 3,
      name: "Laura Sánchez",
      text: "Excelente servicio al cliente y envío rápido. Encontré el par perfecto para mi boda. ¡Gracias!",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">Supermarket MENDOZA</div>
            
            <div className="mobile-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
            
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
              <a href="#inicio">Inicio</a>
              <a href="#productos">Productos</a>
              <a href="#beneficios">Beneficios</a>
              <a href="#testimonios">Testimonios</a>
              <a href="#contacto">Contacto</a>
            </nav>
            
            <div className="header-actions">
              <div className="search-box">
                <input type="text" placeholder="Buscar calzado..." />
                <FaSearch className="search-icon" />
              </div>
              <div className="user-action">
                <FaUser />
              </div>
              <div className="cart-action" onClick={addToCart}>
                <FaShoppingCart />
                {cartItems > 0 && <span className="cart-badge">{cartItems}</span>}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="inicio">
        <div className="container">
          <div className="hero-content">
            <h1>Calzado que combina <span>estilo y comodidad</span></h1>
            <p>Descubre nuestra colección exclusiva de zapatos diseñados para destacar en cualquier ocasión.</p>
            <div className="hero-buttons">
              <a href="#productos" className="btn primary">Ver Colección</a>
              <a href="#beneficios" className="btn secondary">Más Información</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured" id="productos">
        <div className="container">
          <div className="section-header">
            <h2>Nuestros Productos Destacados</h2>
            <p>Descubre nuestra selección de calzado premium</p>
          </div>
          
          <div className="category-filter">
            {categories.map(category => (
              <button 
                key={category.id}
                className={selectedCategory === category.id ? 'active' : ''}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button className="quick-view">Vista Rápida</button>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <span className="price">${product.price.toFixed(2)}</span>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < 4 ? 'filled' : ''} />
                      ))}
                      <span>(24)</span>
                    </div>
                  </div>
                  <button className="add-to-cart" onClick={addToCart}>
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits" id="beneficios">
        <div className="container">
          <div className="section-header">
            <h2>Por Qué Elegirnos</h2>
            <p>Nuestras ventajas que nos hacen diferentes</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaMedal />
              </div>
              <h3>Calidad Premium</h3>
              <p>Materiales de primera calidad seleccionados cuidadosamente para garantizar durabilidad y comodidad.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaTruck />
              </div>
              <h3>Envío Rápido</h3>
              <p>Recibe tus zapatos en 24-48 horas con nuestro servicio de envío express disponible en todo el país.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <FaUndo />
              </div>
              <h3>Devoluciones Fáciles</h3>
              <p>30 días para cambiar de opinión. Devoluciones gratuitas si no estás completamente satisfecho.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonios">
        <div className="container">
          <div className="section-header">
            <h2>Lo Que Dicen Nuestros Clientes</h2>
            <p>Experiencias reales de personas como tú</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-header">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h3>{testimonial.name}</h3>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < testimonial.rating ? 'filled' : ''} />
                      ))}
                    </div>
                  </div>
                </div>
                <p>{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para dar el siguiente paso?</h2>
            <p>Únete a miles de clientes satisfechos que ya disfrutan de la mejor calidad en calzado.</p>
            <div className="cta-buttons">
              <a href="#productos" className="btn primary">Comprar Ahora</a>
              <a href="#contacto" className="btn secondary">Contactar</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>ZapatoPlus</h3>
              <p>Calzado premium para hombres y mujeres que valoran el estilo y la comodidad.</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">FB</a>
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="Twitter">TW</a>
                <a href="#" aria-label="Pinterest">PT</a>
              </div>
            </div>
            
            <div className="footer-column">
              <h3>Enlaces Rápidos</h3>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#productos">Productos</a></li>
                <li><a href="#beneficios">Beneficios</a></li>
                <li><a href="#testimonios">Testimonios</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Ayuda</h3>
              <ul>
                <li><a href="#">Preguntas Frecuentes</a></li>
                <li><a href="#">Envíos y Devoluciones</a></li>
                <li><a href="#">Guía de Tallas</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Contacto</h3>
              <ul className="contact-info">
                <li>Calle Falsa 123, Madrid</li>
                <li>+34 912 345 678</li>
                <li>info@zapatoplus.com</li>
              </ul>
            </div>
          </div>
          
          <div className="copyright">
            <p>&copy; 2023 ZapatoPlus. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;