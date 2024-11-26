import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/Cart/slice";


const Cart = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price || item.basePrice), 0).toFixed(2);
  };

  return (
    <div 
      className="cart bg-white border rounded shadow p-4 fixed right-0 top-16 w-[800px] max-h-[calc(100vh-4rem)] overflow-y-auto z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">${item.price}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-500 hover:border-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center font-bold mb-4">
              <span className="text-lg">Total:</span>
              <span className="text-lg">${calculateTotal()}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
