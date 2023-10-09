import { IUser } from "@/interfaces";
import { AuthState } from "@/context/auth/AuthProvider";

type AuthActionType =
  | {
      type: "[Auth] - Fetch User";
      payload: IUser;
    }
  | {
      type: "[Auth] - Fetch Token";
      payload: string;
    };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case "[Auth] - Fetch User":
      return {
        ...state,
        user: action.payload,
      };
    case "[Auth] - Fetch Token":
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};
