import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data.map((product) => ({...product, stock: Math.floor(Math.random() * 16),}));
  }
);

const initialState = {
  items: [],
  visibleItems: [],
  loading: false,
  loadingMore: false,
  error: null,
  page: 0,
  hasMore: true,
  view: "grid",
  search: "",
  category: "all",
};

const PAGE_SIZE = 6;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadMore: (state) => {
      if (!state.hasMore || state.loadingMore) {
        return;
      }
      
      state.loadingMore = true;
      const filtered = filteredProducts(state);
      const start = (state.page + 1) * PAGE_SIZE;
      const nextItems = filtered.slice(start, start + PAGE_SIZE);
      
      if (nextItems.length === 0) {
        state.hasMore = false;
        state.loadingMore = false;
        return;
      }
      
      state.visibleItems.push(...nextItems);
      state.page += 1;
      state.hasMore = ((state.page + 1) * PAGE_SIZE) < filtered.length;
      state.loadingMore = false;
    },
   
    setView: (state, action) => {
      state.view = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      resetPagination(state);
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      resetPagination(state);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        const filtered = filteredProducts({
          ...state,
          items: action.payload,
        });
        state.visibleItems = filtered.slice(0, PAGE_SIZE);
        state.hasMore = filtered.length > PAGE_SIZE;
        state.page = 0;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      });
  },
});

function filteredProducts(state) {
  return state.items.filter((product) => {
    const searchMatch = product.title
      .toLowerCase()
      .includes(state.search.toLowerCase());
    const categoryMatch =
      state.category === "all" ||
      product.category === state.category;
    return searchMatch && categoryMatch;
  });
}

function resetPagination(state) {
  state.page = 0;
  const filtered = filteredProducts(state);
  state.visibleItems = filtered.slice(0, PAGE_SIZE);
  state.hasMore = filtered.length > PAGE_SIZE;
}

export const {
  loadMore,
  setView,
  setSearch,
  setCategory,
}=productsSlice.actions;

export default productsSlice.reducer;