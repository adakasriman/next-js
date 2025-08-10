import { baseApi } from '@/features/api/apiSlice';

export const propertyManagerAssignmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPropertyManagerAssignments: builder.query<any, { page: number; limit: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: 'property-manager-assignments',
        params: { page, limit },
      }),
      providesTags: ['PropertyManagerAssignments'],
    }),
    createPropertyManagerAssignments: builder.mutation<any, any>({
      query: (body) => ({
        url: 'property-manager-assignments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PropertyManagerAssignments'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPropertyManagerAssignmentsQuery,
  useCreatePropertyManagerAssignmentsMutation,
} = propertyManagerAssignmentsApi;