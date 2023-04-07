import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userSignOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const res = await baseQuery(args, api, extraOptions);
    if (res?.error?.status === 401) {
      api.dispatch(userSignOut());
      localStorage.removeItem("auth");
    }
    return res;
  },
  endpoints: () => ({}),
});
