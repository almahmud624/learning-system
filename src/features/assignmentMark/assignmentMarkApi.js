import { apiSlice } from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMark: builder.query({
      query: () => "/assignmentMark",
    }),
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAssignmentMarkQuery, useSubmitAssignmentMutation } =
  assignmentMarkApi;
