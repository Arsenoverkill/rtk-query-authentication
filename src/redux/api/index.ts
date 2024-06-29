import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_URL_BACKEND}/api/v1`,

  prepareHeaders: (headers) => {
    let token = JSON.parse(String(localStorage.getItem("Token")));
    if (!token) {
      token = JSON.parse(String(sessionStorage.getItem("Token")));
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  // credentials: "include",
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: ["auth", "rating"],
  endpoints: () => ({}),
});
