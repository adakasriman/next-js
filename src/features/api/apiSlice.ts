import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Users', 'Properties', 'Units'],
  endpoints: () => ({}),
});