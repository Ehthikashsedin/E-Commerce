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
  error: null,
  page: 1,
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
      const start =state.page * PAGE_SIZE;
      const nextItems =filteredProducts(state).slice(
        start,
        start +PAGE_SIZE
      );
      state.visibleItems.push(...nextItems);
      state.page+=1;
      if (nextItems.length < PAGE_SIZE) {
        state.hasMore = false;
      }
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
        state.visibleItems = filteredProducts({
          ...state,
          items: action.payload,
        }).slice(0, PAGE_SIZE);
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
  state.page=1;
  const filtered =filteredProducts(state);

  state.visibleItems= filtered.slice(0, PAGE_SIZE);
  state.hasMore =filtered.length> PAGE_SIZE;
}

export const {
  loadMore,
  setView,
  setSearch,
  setCategory,
}=productsSlice.actions;

export default productsSlice.reducer;