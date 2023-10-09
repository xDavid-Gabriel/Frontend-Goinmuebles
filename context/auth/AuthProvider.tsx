"use client";
import { useReducer, useContext, useEffect } from "react";
import { authReducer } from "@/context/auth/authReducer";
import { AuthContext } from "@/context/auth/AuthContext";
import { IUser } from "@/interfaces";
import { Token, User } from "@/server";

export interface AuthState {
  accessToken: string;
  user: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  accessToken: "",
  user: {
    user: {},
    rol: "",
  },
};

export const useStateAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useStateAuthContext must be used within an AuthProvider");
  }
  return context;
};
const tokenCtrl = new Token();
const userCtrl = new User();
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    const checkToken = async () => {
      const token = tokenCtrl.getToken();
      if (!token) {
        logout();
        return;
      }
      if (tokenCtrl.hasExpired(token)) {
        logout();
        return;
      } else {
        await login(token);
      }
    };
    checkToken();
  }, []);
  const login = async (token: string) => {
    try {
      tokenCtrl.setToken(token);
      // Obtener los datos del usuario
      const response = await userCtrl.getMe();

      // Guardar los datos del usuario en el estado
      dispatch({ type: "[Auth] - Fetch User", payload: response });
      //Guardar la token
      dispatch({ type: "[Auth] - Fetch Token", payload: token });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    tokenCtrl.removeToken();
    dispatch({ type: "[Auth] - Fetch Token", payload: "" });
    dispatch({ type: "[Auth] - Fetch User", payload: { user: {}, rol: "" } });
  };

  const refreshUser = async () => {
    try {
      // Obtener los datos actualizados del usuario
      const updatedUser = await userCtrl.getMe();

      // Actualizar el estado del context con la información actualizada
      dispatch({ type: "[Auth] - Fetch User", payload: updatedUser });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
