import { ENV, authFetch } from "../utils";

export class User {
  //Me trae el usuario
  async getMe() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_ME}`;
      const response = await authFetch(url);

      if (!response) {
        throw new Error("Error al obtener usuario");
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  // async updateMe(userId: number, data: IUser) {
  //   //actualiza el usuario con axios
  //   try {
  //     const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${userId}`

  //     const response = await authFetch(url, { method: 'PUT', data })
  //     if (!response) {
  //       throw new Error('El servidor no ha devuelto datos')
  //     }

  //     return response
  //   } catch (error) {
  //     throw error
  //   }
  // }
}
