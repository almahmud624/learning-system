import { apiSlice } from "../api/apiSlice";
import { userSignIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userSignIn({ token: data.accessToken, user: data.user }));
          localStorage.setItem(
            "auth",
            JSON.stringify({ token: data.accessToken, user: data.user })
          );
        } catch (err) {}
      },
    }),
    logIn: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userSignIn({ token: data.accessToken, user: data.user }));
          localStorage.setItem(
            "auth",
            JSON.stringify({ token: data.accessToken, user: data.user })
          );
        } catch (err) {}
      },
    }),
  }),
});

export const { useCreateUserMutation, useLogInMutation } = authApi;
