import React, { useState, useEffect } from "react";
import Navbar from "./Search";
import Sidebar from "./Sidebar/sidebar";
import Dashboard from "./Dashboard";
import Cart from "./Cart";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Smartphone' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyapi.online/api/products");
        const data = await response.json();
      
        const transformedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          basePrice: product.price || Math.floor(Math.random() * 100) + 10,
          featuredImage: product.image || 'https://via.placeholder.com/150',
          productCategory: product.category || categories[Math.floor(Math.random() * categories.length)].name
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryUpdate = (updatedCategories) => {
    setCategories(updatedCategories);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.productCategory === selectedCategory.name)
    : products;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <header className="bg-white shadow p-4">
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onCartClick={handleCartToggle}
        />
      </header>
      <div className="flex">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onCategoryUpdate={handleCategoryUpdate}
        />
        <main className="flex-1 relative">
          <Dashboard 
            searchQuery={searchQuery} 
            products={filteredProducts}
            selectedCategory={selectedCategory}
            categories={categories}
          />
          
          {isCartOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleCartToggle}
            >
              <Cart 
                onClose={handleCartToggle} 
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default Home;
