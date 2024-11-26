import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const response = await fetch("https://dummyapi.online/api/products");
      const data = await response.json();
      
      const distinctCategories = [
        ...new Set(data.map((product) => product.productCategory))
      ].map((category, index) => ({
        id: index,
        name: category || "Uncategorized",
        isDefault: true 
      }));

      return distinctCategories;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: Date.now(),
        name: action.payload,
        isDefault: false  
      };
      state.items.push(newCategory);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        const apiCategories = action.payload.filter(
          apiCat => !state.items.some(existingCat => existingCat.name === apiCat.name)
        );
        state.items = [...state.items, ...apiCategories];
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;