export interface userSignUpResponse {
  message: string;
}

export interface userSignInResponse {
  email: string;
  password: string;
}

export interface userTokenResponse {
  token: string;
  message: string;
  role: string;
  profile_photo: string;
}

export interface forgetPassResponse {
  email: string;
}

export interface verifyTokenResponse {
  token: string;
  message: string;
}

export interface verifyCodeResponse {
  verify_code: number;
}
