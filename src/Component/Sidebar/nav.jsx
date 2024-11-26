import React, { useState } from 'react';
import Sidebar from './sidebar';
import AddProduct from '../Modal/addProduct';

const Nav = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); 

  return (
    <div>
      <Sidebar categories={categories} setCategories={setCategories} />
      <AddProduct
        onClose={() => {}}
        products={products}
        setProducts={setProducts}
        categories={categories}
      />
    </div>
  );
};

export default Nav;