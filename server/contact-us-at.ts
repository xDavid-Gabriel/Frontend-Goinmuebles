import { ENV } from "@/utils";
import axios from "axios";

interface ContactFormData {
  name_and_surname: string;
  phone: string;
  email: string;
}

export class ContactUsAtApi {
  async sendContactUsAt(data: ContactFormData) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CONTACT}`;

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
