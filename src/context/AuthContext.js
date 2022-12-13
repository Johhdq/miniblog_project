import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// está fazendo o papel do hook de anteriormente
export function useAuthValue() {
  return useContext(AuthContext);
}