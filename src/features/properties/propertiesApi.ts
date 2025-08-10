import { baseApi } from '@/features/api/apiSlice';

export const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query<any[], void>({
      query: () => 'properties',
      providesTags: ['Properties'],
    }),
    createProperty: builder.mutation<any, any>({
      query: (body) => ({
        url: 'properties',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Properties'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPropertiesQuery,
  useCreatePropertyMutation,
} = propertiesApi;