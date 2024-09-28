import { createContext, useContext } from "react";

export const LoginContext = createContext(undefined);

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = LoginContext.Provider;
