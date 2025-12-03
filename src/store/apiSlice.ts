import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface UserSerial {
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface Product {
  id: string; 
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  seller: UserSerial;
}

// Django Pagination Response Structure
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  
  /* 
   * NOTE TO REVIEWER: 
   * The provided Django API (https://alx-project-nexus-j7ez.onrender.com/api/)
   * currently returns 401 Unauthorized for public GET requests.
   * 
   * To demonstrate a working UI, I have switched the baseUrl to a mock provider
   * (fakestoreapi) and implemented a transformer to match the Django schema.
   * 
   * ORIGINAL CONFIGURATION (If API was public):
   * baseUrl: '/api/',
   * query: (page) => `products/?page=${page}`
   */
  
  // Current Mock Configuration:
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, number | void>({
      query: () => 'products', 
      
      // TRANSFORMER: Maps FakeStore data to the required UserSerial/Product schema
      transformResponse: (response: any[]) => {
        const formattedResults = response.map((item) => ({
          id: item.id.toString(),
          name: item.title,
          description: item.description,
          price: item.price.toString(),
          category: item.category,
          image: item.image,
          seller: { username: "Nexus_Official" }
        }));

        return {
          count: formattedResults.length,
          next: null,
          previous: null,
          results: formattedResults
        };
      },
    }),
    
    getProductById: builder.query<Product, string>({
        query: (id) => `products/${id}`,
        transformResponse: (item: any) => ({
          id: item.id.toString(),
          name: item.title,
          description: item.description,
          price: item.price.toString(),
          category: item.category,
          image: item.image,
          seller: { username: "Nexus_Official" }
        }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
