import { ENV } from "@/utils";
import axios from "axios";

interface LoginFormData {
  correo_electronico: string;
  password: string;
}

export class LoginApi {
  async sendLogin(data: LoginFormData) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;

    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
