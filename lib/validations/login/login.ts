import * as z from "zod";

export const LoginValidation = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .regex(/^.{6,}$/, "La contraseña es muy corta"),
});
