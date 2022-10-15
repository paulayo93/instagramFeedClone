import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "./product.effects";

const initialState = {
  products: null,
  loading: false,
  error: "",
};

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    removeProduct: (state, action) => {
      state.products = null;
    },

  },
  extraReducers: (builder) => {
      builder.addMatcher(
        productApi.endpoints.getAllProducts.matchFulfilled,
        (state, { payload }) => {
          console.log(payload);
          // state.loading = false;
          state.products = payload;
        }
      );
  },
});

export const { removeProduct } = productReducer.actions;
export default productReducer.reducer;
