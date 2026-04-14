export type LoginRequest = {
  email: string;
  password: string;
};

export type Admin = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
};

export type LoginResponseData = {
  token_type: "Bearer";
  token: string;
  expires_at: string;
  admin: Admin;
};
