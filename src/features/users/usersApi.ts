import { baseApi } from '@/features/api/apiSlice';

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<any, { page: number; limit: number }>({
            query: ({ page = 1, limit = 10 }) => ({
                url: 'users',
                params: { page, limit },
            }),
            providesTags: ['Users'],
        }),
        createUser: builder.mutation<any, any>({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Users'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetUsersQuery,
    useCreateUserMutation,
} = usersApi;
