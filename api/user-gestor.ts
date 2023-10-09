import axios from "axios";
import { ENV } from "../utils";
interface UserInformation {
  [key: string]: unknown;
}
export class UserGestorApi {
  async putPersonalData(codUser: string, data: UserInformation) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${codUser}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.put(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }
  //

  //Datos del cónyuge :POST
  async postSpouseData(data: any) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SPOUSE_USER}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.post(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }
  //Datos del cónyuge :PUT
  async putSpouseData(data: any, id: string | number) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SPOUSE_USER}s/${id}`;

      //const response = await axios.post(url, data);
      const response = await axios.put(url, data);
      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }

  //Datos laborales
  async postEmploymentData(data: any) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHARGES_LABOR}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.post(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }

  //Datos laborales
  async putEmploymentData(data: any, id: string | number) {
    try {
      const url = `${ENV.API_URL}/cargos/user/${id}`;

      //const response = await axios.post(url, data);
      const response = await axios.put(url, data);
      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }

  //Datos patrimoniales
  async postPropertyData(data: any) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PROPERTY_DATA}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.post(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }

  //Datos patrimoniales
  async putPropertyData(data: any, codUser: string) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PROPERTY_DATA}/${codUser}`;

      //const response = await axios.post(url, data);
      const response = await axios.put(url, data);
      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }

  async postEquityDataGp(data: any) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PROPERTY_MANAGER}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.post(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }

  async putMedium(codUser: string, data: any) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.UPDATE_MEDIUM}/${codUser}`;
      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud PUT.
      const response = await axios.put(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }

  //Gestor Juridico
  async putPersonalDataGj(codUser: string, data: UserInformation) {
    try {
      const url = `${ENV.API_URL}/update/user/${codUser}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.put(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }
  //Datos del representante legal : POST
  async postRepresentativesLegal(data: any) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REPRESENTATIVES_LEGAL}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.post(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }

  //Datos del representante legal : PUT
  async putRepresentativesLegal(data: any, codUser: string | number) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REPRESENTATIVES_LEGAL}/${codUser}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.put(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }

  //Datos de los accionistas legal : POST
  async postShareholderData(data: any) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SHAREHOLDER_DATA}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.post(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }
  //Datos de los accionistas legal : PUT
  async putShareholderData(data: any, codUser: string | number) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.SHAREHOLDER_DATA}/${codUser}`;

      // Asegúrate de pasar las configuraciones necesarias para tu solicitud,
      // como encabezados si los necesitas. Aquí simplemente pasamos `data`
      // como el cuerpo de la solicitud POST.
      const response = await axios.put(url, data);

      // Verifica si el código de estado no está en el rango 200-299
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error(
          `Error en la solicitud POST. Código de estado: ${response.status}. Respuesta: ${response.data}`
        );
      }

      return response.data; // axios coloca la respuesta en la propiedad .data
    } catch (error) {
      throw error;
    }
  }
}
