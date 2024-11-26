import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, addCategory } from "../../Redux/categorySlice";
import AddCategory from "./addCategory";

const Sidebar = ({ 
  selectedCategory, 
  onCategorySelect, 
  onCategoryUpdate 
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useSelector((state) => state.categories.items);
  const categoriesLoading = useSelector((state) => state.categories.loading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      onCategoryUpdate(categories);
    }
  }, [categories, onCategoryUpdate]);

  const handleAddCategory = (newCategoryName) => {
    dispatch(addCategory(newCategoryName));
    setIsModalOpen(false);
  };
  if (categoriesLoading) {
    return (
      <div className="w-64 bg-white shadow-lg min-h-screen p-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Categories</h2>

      <div className="mb-4">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full p-2 rounded transition-colors text-center ${
            !selectedCategory 
              ? "bg-blue-500 text-white" 
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All Categories
        </button>
      </div>
      <ul className="mb-4 max-h-[60vh] overflow-y-auto">
        {categories.map((category) => (
          <li 
            key={category.id} 
            className={`py-1 ${category.isDefault ? '' : 'bg-green-50'}`}
          >
            <button
              onClick={() => onCategorySelect(category)}
              className={`text-center w-full p-2 rounded transition-colors ${
                selectedCategory?.id === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              } flex justify-between items-center`}
            >
              <span>{category.name}</span>
              {!category.isDefault && (
                <span className="text-xs bg-green-200 text-green-800 px-2 rounded">
                 
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        Add Category
      </button>

      {isModalOpen && (
        <AddCategory
          onClose={() => setIsModalOpen(false)}
          handleAddCategory={handleAddCategory}
        />
      )}
    </div>
  );
};

export default Sidebar;
