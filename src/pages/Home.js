import React from 'react';
import ProductCard from '../components/ProductCard';
import { productsData, categories, brands } from '../data/productsData';
import './Home.css';

const Home = () => {
  const featuredProducts = productsData.slice(0, 16);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="hero-automation">Automation</span>
              <span className="hero-exercise">Exercise</span>
            </h1>
            <h2>Full-Fledged practice website for Automation Engineers</h2>
            <p>
              All QA engineers can use this website for automation practice and API testing 
              either they are at beginner or advance level. This is for everybody to help 
              them brush up their automation skills.
            </p>
            <div className="hero-buttons">
              <button className="btn-hero">Test Cases</button>
              <button className="btn-hero">APIs list for practice</button>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://via.placeholder.com/600x500/FFB6C1/ffffff?text=Shopping+Girl" 
              alt="Shopping" 
            />
          </div>
        </div>
      </div>

      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2>CATEGORY</h2>
            <ul className="category-list">
              {categories.map((category, index) => (
                <li key={index}>
                  <i className="fa fa-plus"></i> {category.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-section">
            <h2>BRANDS</h2>
            <ul className="brand-list">
              {brands.map((brand, index) => (
                <li key={index}>
                  ({brand.count}) {brand.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="products-section">
          <h2 className="section-title">FEATURES ITEMS</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>

      <div className="recommended-section">
        <h2 className="section-title">RECOMMENDED ITEMS</h2>
        <div className="recommended-carousel">
          <div className="products-grid">
            {productsData.slice(3, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
