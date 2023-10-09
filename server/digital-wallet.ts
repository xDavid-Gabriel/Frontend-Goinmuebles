import { IUser } from "@/interfaces";
import { ENV } from "@/utils";
import axios from "axios";

interface ValuesApiTypeiIjDwDeposit {
  amount: number;
  ballot_image?: File;
}
export class DigitalWalletApi {
  async postRetreat(data: {
    codigo_usuario: string;
    monto: number;
    codigo: string;
  }) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.RETREAT}`;
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async postDeposit(user: IUser, valuesApi: ValuesApiTypeiIjDwDeposit) {
    const formData = new FormData();
    // Añadiendo los archivos al formData:
    formData.append("codigo_usuario", user.user.codigo_usuario!.toString());
    formData.append("tipo", "deposito");
    formData.append("monto", valuesApi.amount.toString());
    formData.append("boleta_imagen", valuesApi.ballot_image!);
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.TRANSACTION}`;
    try {
      const response = await axios.post(url, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
