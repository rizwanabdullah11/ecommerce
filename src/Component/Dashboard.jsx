import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Cart/slice";
import { fetchProducts, addProduct } from "../Redux/productSlice";
import AddProduct from "./Modal/addProduct";

const Dashboard = ({ 
  selectedCategory, 
  searchQuery, 
  categories: passedCategories,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const products = useSelector((state) => state.products.items);
  const productLoading = useSelector((state) => state.products.loading);

  useEffect(() => {

    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setLoading(productLoading);
  }, [productLoading]);

  const handleProductAdd = (newProduct) => {

    const formattedProduct = {
      name: newProduct.name,
      description: newProduct.description,
      basePrice: parseFloat(newProduct.price),
      featuredImage: newProduct.image,
      productCategory: newProduct.category,
      isDefault: false 
    };

    dispatch(addProduct(formattedProduct));
    setIsModalOpen(false);
  };

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id || Date.now(),
      name: product.name,
      description: product.description,
      price: product.basePrice,
      image: product.featuredImage,
      category: product.productCategory,
    };
  
    dispatch(addToCart(cartProduct));
  };

  const filteredProducts = products
    .filter(product => 
      (!selectedCategory || product.productCategory === selectedCategory.name) &&
      (searchQuery === "" || 
       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.productCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
       product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6">
        {selectedCategory ? `${selectedCategory.name} Products` : "All Products"}
      </h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4"
      >
        Add Product
      </button>

      {isModalOpen && (
        <AddProduct 
          categories={passedCategories} 
          onClose={() => setIsModalOpen(false)}
          onProductAdd={handleProductAdd}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className={`border rounded-lg p-4 shadow transition ${
                product.isDefault ? 'border-gray-300' : 'border-green-300 bg-green-50'
              } hover:shadow-lg`}
            >
              <img
                src={product.featuredImage || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-4 font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-blue-600">${product.basePrice.toFixed(2)}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  product.isDefault ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'
                }`}>
                  {product.productCategory}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p className="text-xl">No products found.</p>
          <p className="mt-2">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

