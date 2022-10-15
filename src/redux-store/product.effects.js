import {api} from './api';


export const productApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => `products`,
    }),
    getProduct: build.query({
      query: (id) => `products/${id}`
    })
  }),
});


export const {useGetAllProductsQuery, useGetProductQuery } = productApi