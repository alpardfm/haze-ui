import { apiRequest } from "./api";
import type { LoginRequest, LoginResponseData } from "../types/auth";

export function login(payload: LoginRequest) {
  return apiRequest<LoginResponseData>("/auth/login", {
    method: "POST",
    body: payload,
  });
}
