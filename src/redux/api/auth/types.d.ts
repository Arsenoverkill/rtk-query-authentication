namespace AUTH {
  type GetMeResponse = {
    profil: User;
  };
  type GetMeRequest = void;
  type PostLoginResponse = {
    accessToken: string;
    accessTokenExpiration: number;
  };
  type PostLoginRequest = {
    email: string;
    password: string;
  };
  type PostRegistrationResponse = {
    message: string;
    accessToken: string;
    accessTokenExpiration: number;
  };
  type PostRegistrationRequest = {
    email: string;
    password: string;
    photo: string;
    userName: string;
  };

  type PostLogoutResponse = {
    message: string;
  };
  type PostLogoutRequest = void;

  type PostForgotPasswordResponse = {
    message: string;
  };
  type PostForgotPasswordRequest = {
    email: string;
    frontEndUrl: string;
  };
  type PatchResetPasswordResponse = {
    message: string;
  };
  type PatchResetPasswordRequest = {
    token: string;
    newPassword: string;
  };
}
