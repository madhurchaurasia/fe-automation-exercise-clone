import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { productsData, categories, brands } from '../data/productsData';
import './Products.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(selectedBrand === brand ? '' : brand);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="sale-banner">
          <img 
            src="https://via.placeholder.com/400x200/FF0000/ffffff?text=BIG+SALE+UP+TO+50%+OFF" 
            alt="Sale Banner" 
          />
        </div>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="products-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2>CATEGORY</h2>
            <ul className="category-list">
              {categories.map((category, index) => (
                <li 
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className={selectedCategory === category ? 'active' : ''}
                >
                  <i className="fa fa-plus"></i> {category.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-section">
            <h2>BRANDS</h2>
            <ul className="brand-list">
              {brands.map((brand, index) => (
                <li 
                  key={index}
                  onClick={() => handleBrandClick(brand.name)}
                  className={selectedBrand === brand.name ? 'active' : ''}
                >
                  ({brand.count}) {brand.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="products-main">
          <h2 className="section-title">ALL PRODUCTS</h2>
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
