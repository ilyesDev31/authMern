import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const apiUrl = import.meta.env.VITE_API_URL;
const baseQuery = fetchBaseQuery({
  baseUrl: "https://authmern-588o.onrender.com",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: ["User"],
});
