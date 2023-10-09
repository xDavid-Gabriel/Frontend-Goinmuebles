import * as z from "zod";

export const ContactUsAtValidation = z.object({
  name_and_surname: z
    .string()
    .min(1, "El nombre y apellido son obligatorios")
    .max(50, "El nombre y apellido son demasiado largos"),
  phone: z
    .string()
    .regex(/^\d{7,15}$/, "El teléfono debe tener entre 7 y 15 dígitos"),
  email: z.string().email("El correo electrónico no es válido"),
});
