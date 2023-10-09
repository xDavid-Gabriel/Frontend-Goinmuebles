import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ENV } from "@/utils";
import axios from "axios";

const getUser = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("token");
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_ME}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });

    const user = response.data;
    if (!user) {
      throw "Error";
    }
    return user;
  } catch (error) {
    throw new Error("Error getting user data");
  }
};

export const isPermitions = async ({
  userName,
  userType,
}: {
  userName: string;
  userType: "natural" | "juridica";
}) => {
  try {
    const user = await getUser();

    if (user.rol !== userName) {
      redirect("/");
    }

    if (userName === "Gestor" || userName === "Inversionista") {
      if (userType === "natural" && user.user.id_persona_rol !== "1") {
        redirect("/");
      }

      if (userType === "juridica" && user.user.id_persona_rol !== "2") {
        redirect("/");
      }
    }
    return user;
  } catch (error) {
    redirect("/");
  }
};
