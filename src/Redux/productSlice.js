import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await fetch("https://dummyapi.online/api/products");
      const data = await response.json();

      const transformedProducts = data.map(product => ({
        ...product,
        isDefault: true 
      }));

      return transformedProducts;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
        isDefault: false  
      };
      state.items.unshift(newProduct);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {

        const apiProducts = action.payload.filter(
          apiProd => !state.items.some(existingProd => existingProd.name === apiProd.name && existingProd.isDefault)
        );
        state.items = [...state.items, ...apiProducts];
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;