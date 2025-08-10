import { baseApi } from '@/features/api/apiSlice';

export const unitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnits: builder.query<any, { page: number; limit: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: 'units',
        params: { page, limit },
      }),
      providesTags: ['Units'],
    }),
    createUnit: builder.mutation<any, any>({
      query: (body) => ({
        url: 'units',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Units'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUnitsQuery,
  useCreateUnitMutation,
} = unitsApi;