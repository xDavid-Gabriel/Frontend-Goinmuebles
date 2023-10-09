import { IUser } from "@/interfaces";
import { ENV } from "@/utils";
import axios from "axios";

interface ValuesApiTypeGestorNormal {
  dni_manager?: File;
  dni_spouse?: File;
  payment_receipts_1?: File;
  payment_receipts_2?: File;
  payment_receipts_3?: File;
  utility_bill_copy?: File;
  property_records?: File;
  additional_documentation?: File;
}
interface ValuesApiTypeGestorJuridica {
  legal_representative_dni?: File;
  power_of_attorney_validity?: File;
  ruc_record?: File;
  company_registry_entry?: File;
  financial_statements_1?: File;
  financial_statements_2?: File;
  pdt_1?: File;
  pdt_2?: File;
  pdt_3?: File;
}
interface ValuesApiTypeInversorNormal {
  dni_investor?: File;
  dni_spouse?: File;
}
interface ValuesApiTypeiInversorJuridica {
  legal_representative_dni?: File;
  power_of_attorney_validity?: File;
  ruc_record?: File;
  company_registry_entry?: File;
}
export class AttachmentsApi {
  async postArchivesGestorNatural(
    user: IUser,
    valuesApi: ValuesApiTypeGestorNormal
  ) {
    const formData = new FormData();

    // Añadiendo los archivos al formData:
    formData.append("codigo_usuario", user.user.codigo_usuario!.toString());
    formData.append("adjuntar_documento_representante", valuesApi.dni_manager!);
    formData.append("adjuntar_documento_conyuge", valuesApi.dni_spouse!);
    formData.append("boleta_1", valuesApi.payment_receipts_1!);
    formData.append("boleta_2", valuesApi.payment_receipts_2!);
    formData.append("boleta_3", valuesApi.payment_receipts_3!);
    formData.append("recibo_servicios", valuesApi.utility_bill_copy!);
    formData.append(
      "partida_registrales_propiedades",
      valuesApi.property_records!
    );
    formData.append(
      "presentacion_empresa",
      valuesApi.additional_documentation!
    );

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.UPDATE}/${user.user.codigo_usuario}`;
    try {
      // const response = await axios.post(url, {
      //   data: formData,
      //   // headers: { "Content-Type": "multipart/form-data" },
      // });
      const response = await axios.post(url, formData);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postArchivesGestorJuridica(
    user: IUser,
    valuesApi: ValuesApiTypeGestorJuridica
  ) {
    const formData = new FormData();

    // Añadiendo los archivos al formData:

    formData.append(
      "adjuntar_documento_representante",
      valuesApi.legal_representative_dni!
    );
    formData.append("vigencia_poder", valuesApi.power_of_attorney_validity!);
    formData.append("ficha_ruc", valuesApi.ruc_record!);
    formData.append("partida_registral", valuesApi.company_registry_entry!);
    formData.append("estado_financiero_1", valuesApi.financial_statements_1!);
    formData.append("estado_financiero_2", valuesApi.financial_statements_2!);
    formData.append("pdt_1", valuesApi.pdt_1!);
    formData.append("pdt_2", valuesApi.pdt_2!);
    formData.append("pdt_3", valuesApi.pdt_3!);

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.UPDATE}/${user.user.codigo_usuario}`;
    try {
      // const response = await axios.post(url, {
      //   data: formData,
      //   // headers: { "Content-Type": "multipart/form-data" },
      // });
      const response = await axios.post(url, formData);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async postArchivesInversorNatural(
    user: IUser,
    valuesApi: ValuesApiTypeInversorNormal
  ) {
    const formData = new FormData();

    // Añadiendo los archivos al formData:
    formData.append("codigo_usuario", user.user.codigo_usuario!.toString());

    formData.append(
      "adjuntar_documento_representante",
      valuesApi.dni_investor!
    );
    formData.append("adjuntar_documento_conyuge", valuesApi.dni_spouse!);

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.UPDATE}/${user.user.codigo_usuario}`;
    try {
      // const response = await axios.post(url, {
      //   data: formData,
      //   // headers: { "Content-Type": "multipart/form-data" },
      // });
      const response = await axios.post(url, formData);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postArchivesInversorJuridica(
    user: IUser,
    valuesApi: ValuesApiTypeiInversorJuridica
  ) {
    const formData = new FormData();

    // Añadiendo los archivos al formData:

    formData.append(
      "adjuntar_documento_representante",
      valuesApi.legal_representative_dni!
    );
    formData.append("vigencia_poder", valuesApi.power_of_attorney_validity!);
    formData.append("ficha_ruc", valuesApi.ruc_record!);
    formData.append("partida_registral", valuesApi.company_registry_entry!);

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.UPDATE}/${user.user.codigo_usuario}`;
    try {
      // const response = await axios.post(url, {
      //   data: formData,
      //   // headers: { "Content-Type": "multipart/form-data" },
      // });
      const response = await axios.post(url, formData);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
