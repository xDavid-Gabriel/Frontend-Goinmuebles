import { ENV } from "@/utils";
import axios from "axios";

interface PersonNormalFormData {
  nombres: string;
  apellidos: string;
  celular: string;
  numero_documento: string;
  correo_electronico: string;
  password: string;
}

interface PersonJuridicaFormData {
  razon_social: string;
  celular: string;
  correo_electronico: string;
  password: string;
  numero_ruc: string;
}

export class RegisterGestorApi {
  async sendPersonNormal(data: PersonNormalFormData) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER_GESTOR}`;

    try {
      const response = await axios.post(url, { ...data, id_persona_rol: 1 });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async sendPersonJuridica(data: PersonJuridicaFormData) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER_GESTOR}`;

    try {
      const response = await axios.post(url, { ...data, id_persona_rol: 2 });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
