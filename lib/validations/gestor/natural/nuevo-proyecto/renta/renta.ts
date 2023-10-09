import * as z from "zod";

// Función auxiliar para contar palabras en un texto
const wordCount = (str: string) => {
  return str.split(/\s+/).filter(Boolean).length;
};

export const RealEstateProjectDataValidation = z.object({
  // Departamento (Department)
  department: z.string().nonempty("El departamento es obligatorio."),

  // Provincia (Province)
  province: z.string().nonempty("La provincia es obligatoria."),

  // Distrito (District)
  district: z.string().nonempty("El distrito es obligatorio."),

  // Correo electrónico (Email)
  email: z
    .string()
    .nonempty("Correo electrónico obligatorio")
    .email("Formato de correo electrónico no válido"),

  // Código postal (Postal Code)
  postal_code: z.string().nonempty("El código postal es obligatorio."),

  // Referencia (Reference)
  reference: z.string().nonempty("La referencia es obligatoria."),

  // Resumen del negocio inmobiliario (Summary of the real estate business)
  real_estate_business_summary: z
    .string()
    .nonempty("El resumen del negocio inmobiliario es obligatorio.")
    .refine(
      (value) => wordCount(value) <= 100,
      "Ten en cuenta que debes colocar 100 palabras como máximo."
    ),

  // Estudio del mercado inmobiliario (Study of the real estate market)
  real_estate_market_study: z
    .string()
    .nonempty("El estudio del mercado inmobiliario es obligatorio.")
    .refine(
      (value) => wordCount(value) <= 2000,
      "Ten en cuenta que debes colocar 2000 palabras como máximo."
    ),

  interior_photo_text_1: z
    .any()
    .refine((files) => files?.length !== 0, "El archivo es obligatorio."),
  interior_photo_text_2: z
    .any()
    .refine((files) => files?.length !== 0, "El archivo es obligatorio."),
  interior_photo_text_3: z
    .any()
    .refine((files) => files?.length !== 0, "El archivo es obligatorio."),

  exterior_photo_text_1: z
    .any()
    .refine((files) => files?.length !== 0, "El archivo es obligatorio."),
  exterior_photo_text_2: z
    .any()
    .refine((files) => files?.length !== 0, "El archivo es obligatorio."),
  exterior_photo_text_3: z
    .any()
    .refine((files) => files?.length !== 0, "El archivo es obligatorio."),

  //Va a remodelar el inmueble?
  rental_type_choice: z.enum(["1", "2"], {
    required_error: "Debe seleccionar un tipo",
  }),

  //Renta Larga mensual
  monthly_long_rent_next: z.string().optional(),
  //.nonempty("La Renta mensual es obligatorio."),
  //Garantia renta larga
  long_term_rental_guarantee: z.string().optional(),
  //.nonempty("La Garantia es obligatorio."),
  // contrato de arrendamiento
  long_term_lease_rent: z.string().optional(),
  //.nonempty("EL contrato de arrendamiento es obligatorio."),

  // Renta corta por día
  short_term_rental_per_day: z.string().optional(),
  //.nonempty("La renta corta por día es obligatoria."),

  // Renta corta por semana
  short_term_rental_per_week: z.string().optional(),
  ///.nonempty("La renta corta por semana es obligatoria."),

  // Renta corta por mes
  short_term_rental_per_month: z.string().optional(),
  //.nonempty("La renta corta por mes es obligatoria."),
});

export const ProjectFinancialDataValidation = z.object({
  /* === Rentabilidad por alquiler === */
  rental_profitability_property_price: z
    .string()
    .min(1, "El precio del inmueble es obligatorio"), // Precio del inmueble
  rental_profitability_sale_value: z
    .string()
    .min(1, "El valor de venta es obligatorio"), // Valor de venta
  rental_profitability_requested_financing_amount: z
    .string()
    .min(1, "El monto del financiamiento solicitado es obligatorio"), // Monto del financiamiento solicitado
  rental_profitability_initial_fee: z
    .string()
    .min(1, "La cuota inicial es obligatoria"), // Cuota inicial
  rental_profitability_proposal: z
    .string()
    .min(1, "La propuesta de rentabilidad por alquiler es obligatoria"), // Propuesta de rentabilidad por alquiler
  rental_profitability_return_period: z
    .string()
    .min(1, "El plazo de retorno es obligatorio"), // Plazo de retorno
  rental_profitability_will_remodel: z.enum(["1", "2"], {
    required_error: "Debe seleccionar si o no",
  }),
  rental_profitability_gross_monthly_rent: z
    .string()
    .min(1, "El alquiler mensual bruto es obligatorio"), // Alquiler mensual bruto
  rental_profitability_net_monthly_rent: z
    .string()
    .min(1, "El alquiler mensual neto es obligatorio"), // Alquiler mensual neto
  rental_profitability_total_return_amount: z
    .string()
    .min(1, "El monto total de retorno es obligatorio"), // Monto total de retorno

  /* === Rentabilidad por ganancia o plusvalia === */
  gain_profitability_property_price: z
    .string()
    .min(1, "El precio del inmueble es obligatorio"), // Precio del inmueble
  gain_profitability_sale_value: z
    .string()
    .min(1, "El valor de venta es obligatorio"), // Valor de venta
  gain_profitability_requested_financing_amount: z
    .string()
    .min(1, "El monto del financiamiento solicitado es obligatorio"), // Monto del financiamiento solicitado
  gain_profitability_initial_fee: z
    .string()
    .min(1, "La cuota inicial es obligatoria"), // Cuota inicial
  gain_profitability_proposal: z
    .string()
    .min(1, "La propuesta de rentabilidad por alquiler es obligatoria"), // Propuesta de rentabilidad por alquiler
  gain_profitability_return_period: z
    .string()
    .min(1, "El plazo de retorno es obligatorio"), // Plazo de retorno
  gain_profitability_gross_monthly_rent: z
    .string()
    .min(1, "El alquiler mensual bruto es obligatorio"), // Alquiler mensual bruto
  gain_profitability_sum_of_both_rents: z
    .string()
    .min(1, "La suma de renta de ambos es obligatoria"), // Suma de renta de ambos

  /* === Tiempo de gracias para remodelación === */
  remodeling_grace_period_time: z
    .string()
    .min(1, "El tiempo para remodelación es obligatorio"), // Tiempo para remodelación
  remodeling_grace_period_months: z
    .string()
    .min(1, "Los meses son obligatorios"), // Meses
  remodeling_grace_period_days: z.string().min(1, "Los días son obligatorios"), // Días
  remodeling_grace_period_property_purchase_value: z
    .string()
    .min(1, "El valor de compra de la propiedad es obligatorio"), // Valor de compra de la propiedad
  remodeling_grace_period_property_sale_value: z
    .string()
    .min(1, "El valor de venta de la propiedad es obligatorio"), // Valor de venta de la propiedad
  remodeling_grace_period_will_remodel: z.enum(["1", "2"], {
    required_error: "Debe seleccionar si o no",
  }),
  remodeling_budget_to_remodel: z
    .string()
    .min(1, "El presupuesto para remodelar es obligatorio"), // Presupuesto para remodelar
  remodeling_execution_time: z
    .string()
    .min(1, "El tiempo de ejecución de la remodelación es obligatorio"), // Tiempo de ejecución de la remodelación
});

export const AttachmentsValidation = z.object({
  // Copia DNI propietarios

  dni_owners_copy: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Copia DNI propietarios es obligatorio."
    ),

  // P. Registral de la propiedad
  property_registry: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo P. Registral de la propiedad es obligatorio."
    ),

  // CRI - Certificado Registral inmobiliario
  cri_certificate: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo CRI - Certificado Registral inmobiliario es obligatorio."
    ),
  //Impuesto predial: HR del año
  hr_tax_year: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Impuesto predial: HR del año es obligatorio."
    ),
  //Parámetros urbanisticos (Si es terreno)
  urban_parameters: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Parámetros urbanisticos (Si es terreno) es obligatorio."
    ),

  // Impuesto predial: PU del año
  pu_tax_year: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Impuesto predial: PU del año es obligatorio."
    ),

  // Documentación del Garante
  guarantor_documentation: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Documentación del Garante es obligatorio."
    ),
});

export const AdministrativeExpensesValidation = z.object({
  // Tasación comercial
  commercial_appraisal: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Tasación comercial es obligatorio."
    ),

  // Informe legal
  legal_report: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Informe legal es obligatorio."
    ),

  // Estudio de mercado
  market_study: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Estudio de mercado es obligatorio."
    ),
});
