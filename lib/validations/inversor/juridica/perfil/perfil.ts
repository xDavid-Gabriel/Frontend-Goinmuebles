import * as z from "zod";

export const PersonalDataValidation = z.object({
  // Denominación Social
  social_denomination: z.string().min(1, "Denominación Social es obligatoria"),

  // R.U.C
  ruc: z.string().min(1, "R.U.C es obligatorio"),

  // N° Partida registral
  registry_entry_number: z
    .string()
    .min(1, "N° Partida registral es obligatorio"),

  // Fecha de constitución
  constitution_date: z.string().min(1, "Fecha de constitución es obligatoria"),

  // Domicilio Fiscal
  fiscal_address: z.string().min(1, "Domicilio Fiscal es obligatorio"),

  // Departamento
  department: z.string().min(1, "Departamento es obligatorio"),

  // Provincia
  province: z.string().min(1, "Provincia es obligatoria"),

  // Distrito
  district: z.string().min(1, "Distrito es obligatorio"),

  // Capital social
  social_capital: z.string().min(1, "Capital social es obligatorio"),

  // Monto del patrimonio
  equity_amount: z.string().min(1, "Monto del patrimonio es obligatorio"),

  // Giro de negocio
  business_turn: z.string().min(1, "Giro de negocio es obligatorio"),

  // Correo de la empresa
  company_email: z
    .string()
    .min(1, "Correo de la empresa es obligatorio")
    .email("Correo de la empresa no es válido"),

  // Teléfono
  phone: z.string().min(1, "Teléfono es obligatorio"),

  // Página web (URL)
  website_url: z
    .string()
    .min(1, "Página web (URL) es obligatoria")
    .url("Página web (URL) no es válida"),
});

export const LegalRepresentativeInformationValidation = z.object({
  // Nombres Completos
  full_name: z.string().min(1, "Nombres Completos son obligatorios"),

  // Apellidos Completos
  full_surnames: z.string().min(1, "Apellidos Completos son obligatorios"),

  // Departamento
  department: z.string().min(1, "Departamento es obligatorio"),

  // Provincia
  province: z.string().min(1, "Provincia es obligatoria"),

  // Distrito
  district: z.string().min(1, "Distrito es obligatorio"),

  // Dirección
  address: z.string().min(1, "Dirección es obligatoria"),

  // Referencia
  reference: z.string().min(1, "Referencia es obligatoria"),

  // Documento de identidad
  identity_document: z.string().min(1, "Documento de identidad es obligatorio"),

  //n° documento
  document_number: z.string().min(1, "n° documento es obligatorio"),

  // Celular
  cellphone: z.string().min(1, "Celular es obligatorio"),

  // Correo electronico
  email: z
    .string()
    .min(1, "Correo electronico es obligatorio")
    .email("Correo electronico no es válido"),
});

export const ShareholderDataValidation = z.object({
  shareholder_data: z
    .array(
      z.object({
        // Nombres completos del accionista
        full_names: z.string().min(1, "Los nombres completos son obligatorios"),

        // Apellidos completos del accionista
        full_last_names: z
          .string()
          .min(1, "Los apellidos completos son obligatorios"),

        // Documento de identidad del accionista
        identity_document: z
          .string()
          .nonempty("Documento de identidad obligatorio"),

        // Número del documento de identidad del accionista
        document_number: z.string().nonempty("Número de documento obligatorio"),

        // Nacionalidad del accionista
        nationality: z.string().nonempty("Nacionalidad obligatoria"),

        // Fecha de nacimiento del accionista
        birth_date: z.string().nonempty("Fecha de nacimiento obligatoria"),

        // Domicilio del accionista
        address: z.string().nonempty("Domicilio obligatorio"),

        // Departamento del domicilio del accionista
        department: z.string().nonempty("Departamento obligatorio"),

        // Provincia del domicilio del accionista
        province: z.string().nonempty("Provincia obligatoria"),

        // Distrito del domicilio del accionista
        district: z.string().nonempty("Distrito obligatorio"),

        // Correo electrónico del accionista
        email: z.string().nonempty("Correo electrónico obligatorio"),

        // Profesión del accionista
        profession: z.string().nonempty("Profesión obligatoria"),

        // Cargo que ocupa el accionista en la empresa
        company_position: z
          .string()
          .nonempty("Cargo en la empresa obligatorio"),

        // Porcentaje de participación del accionista en la empresa
        participation_percentage: z
          .string()
          .nonempty("Porcentaje de participación obligatorio"),
      })
    )
    .max(3),
});

export const CommercialReferencesValidation = z.object({
  commercial_references: z
    .array(
      z.object({
        // Empresa (Company)
        company: z.string().optional(),

        // Nombres (Names)
        names: z.string().optional(),

        // Apellidos (Last Names)
        last_names: z.string().optional(),

        // Cargo (Position)
        position: z.string().optional(),

        // Teléfono de contacto (Contact Phone)
        contact_phone: z.string().optional(),
      })
    )
    .max(3),
});

export const AdditionalInformationValidation = z.object({
  how_did_you_hear_about: z.string().min(1, "El enterarse es obligatorio"),
});

export const AttachmentsValidation = z.object({
  // DNI (Representante legal)
  legal_representative_dni: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo DNI (Representante legal) es obligatorio."
    ),

  // Vigencia de poder
  power_of_attorney_validity: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Vigencia de poder es obligatorio."
    ),

  // Ficha R.U.C
  ruc_record: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Ficha R.U.C es obligatorio."
    ),

  // P.Electrónica de la empresa
  company_registry_entry: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo P.Electrónica de la empresa de la empresa es obligatorio."
    ),
});
