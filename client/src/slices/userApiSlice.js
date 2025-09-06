import { apiSlice } from "./apiSlice";
const baseUrl = `/api/v1/auth`;

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${baseUrl}/register`,
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `${baseUrl}/login`,
        body: data,
      }),
    }),
    getMe: builder.query({ query: () => `${baseUrl}/profile` }),
    logout: builder.mutation({
      query: () => ({
        method: "POST",
        url: `${baseUrl}/logout`,
      }),
    }),
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
} = userApiSlice;
