import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    postLogin: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    postRegistration: build.mutation<
      AUTH.PostRegistrationResponse,
      AUTH.PostRegistrationRequest
    >({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    logOut: build.mutation<AUTH.PostLogoutResponse, AUTH.PostLogoutRequest>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    postForgotPassword: build.mutation<
      AUTH.PostForgotPasswordResponse,
      AUTH.PostForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    patchResetPassword: build.mutation<
      AUTH.PatchResetPasswordResponse,
      AUTH.PatchResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetMeQuery,
  usePostLoginMutation,
  usePostRegistrationMutation,
  useLogOutMutation,
  usePostForgotPasswordMutation,
  usePatchResetPasswordMutation,
} = api;
