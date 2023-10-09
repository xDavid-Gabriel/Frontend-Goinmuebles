import * as z from "zod";

export const RegisterPersonNormalValidation = z.object({
  names: z
    .string()
    .min(1, "Los nombres son obligatorios")
    .max(50, "Los nombres son demasiado largos"),
  dni: z.string().min(1, "El DNI es obligatorio"),
  last_name: z.string().min(1, "El apellido es obligatorio"),
  phone: z
    .string()
    .regex(/^\d{7,15}$/, "El teléfono debe tener entre 7 y 15 dígitos"),
  email: z.string().email("El correo electrónico no es válido"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .regex(/^.{6,}$/, "La contraseña es muy corta"),
  acceptTerms: z.boolean().refine((accept) => accept === true, {
    message: "Debes aceptar los términos y condiciones para registrarte.",
  }),
});
