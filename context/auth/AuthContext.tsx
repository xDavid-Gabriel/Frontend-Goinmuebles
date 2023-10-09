"use client";
import { createContext } from "react";
import { IUser } from "@/interfaces";

interface ContextProps {
  accessToken: string;
  user: IUser;
  login: (token: string) => Promise<IUser>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext({} as ContextProps);
