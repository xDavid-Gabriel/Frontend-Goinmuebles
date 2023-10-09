import * as z from "zod";

export const RegisterPersonJuridicaValidation = z.object({
  company_name: z
    .string()
    .min(1, "La denominación social es obligatoria")
    .max(50, "La denominacion social es demasiada larga"),
  ruc: z.string().min(1, "El RUC es obligatorio"),
  phone: z
    .string()
    .regex(/^\d{7,15}$/, "El teléfono debe tener entre 7 y 15 dígitos"),
  company_mail: z.string().min(1, "El correo de la empresa es obligatoria"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .regex(/^.{6,}$/, "La contraseña es muy corta"),
  acceptTerms: z.boolean().refine((accept) => accept === true, {
    message: "Debes aceptar los términos y condiciones para registrarte.",
  }),
});
