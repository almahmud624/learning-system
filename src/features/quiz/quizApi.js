import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/quizzes",
    }),
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetQuizzesQuery, useGetQuizQuery, useAddQuizMutation } =
  quizApi;
