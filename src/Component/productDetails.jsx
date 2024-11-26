import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Cart/slice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyapi.online/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (loading) return <p>Loading product details...</p>;

  if (!product) return <p>Product not found!</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={product.featuredImage}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-gray-800 text-lg font-semibold mb-4">
        Price: ${product.basePrice}
      </p>
      <button
        onClick={handleAddToCart}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;

