import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AUTH_STORAGE_KEY } from "../constants/auth";
import { login as loginRequest } from "../services/auth";
import type { LoginRequest, LoginResponseData } from "../types/auth";

type AuthContextValue = {
  session: LoginResponseData | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession() {
  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    const session = JSON.parse(stored) as LoginResponseData;

    if (session.expires_at && new Date(session.expires_at).getTime() <= Date.now()) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<LoginResponseData | null>(() => readStoredSession());

  const login = useCallback(async (payload: LoginRequest) => {
    const response = await loginRequest(payload);

    if (!response.data) {
      throw new Error("Response login tidak membawa session");
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response.data));
    setSession(response.data);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      login,
      logout,
    }),
    [login, logout, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }

  return value;
}
