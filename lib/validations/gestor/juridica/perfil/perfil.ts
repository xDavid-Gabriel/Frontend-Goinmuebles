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

export const RealEstatePropertiesValidation = z.object({
  /* Propiedades inmobiliarias*/
  //   real_estate_properties: z
  // .array(
  //   z.object({
  //     // Tipo de inmueble (Property Type)
  //     property_type: z.string().min(1, "El tipo de inmueble es obligatorio"),
  //     // Dirección (Dirección)
  //     address: z.string().min(1, "La dirección es obligatoria"),
  //     // Departamento (Departamento)
  //     department: z.string().min(1, "El departamento es obligatorio"),
  //     // Provincia (Provincia)
  //     province: z.string().min(1, "La provincia es obligatoria"),
  //     // Distrito (Distrito)
  //     district: z.string().min(1, "El distrito es obligatorio"),
  //     // Valorización (Valorización)
  //     valuation: z.string().min(1, "La valorización es obligatoria"),
  //     // P.Electrónica (Papeleta Electrónica)
  //     electronic_p: z.string().min(1, "La P.Electrónica es obligatoria"),
  //   })
  // )
  // .max(3),
  real_estate_properties: z.array(
    z.object({
      // Tipo de inmueble (Property Type)
      property_type: z.string().optional(),
      // Dirección (Dirección)
      address: z.string().optional(),
      // Departamento (Departamento)
      department: z.string().optional(),
      // Provincia (Provincia)
      province: z.string().optional(),
      // Distrito (Distrito)
      district: z.string().optional(),
      // Valorización (Valorización)
      valuation: z.string().optional(),
      // P.Electrónica (Papeleta Electrónica)
      electronic_p: z.string().optional(),
    })
  ),

  // vehicles: z
  //   .array(
  //     z.object({
  //       // Marca (Brand)
  //       brand: z.string().min(1, "Las marca es obligatoria"),
  //       // Modelo (Model)
  //       model: z.string().min(1, "El modelo es obligatorio"),
  //       // Año de rodaje (Year of Shooting/Filming)
  //       year_of_shooting: z
  //         .string()
  //         .refine(
  //           (value) =>
  //             !isNaN(parseFloat(value)) &&
  //             parseFloat(value) >= 1900 &&
  //             parseFloat(value) <= 2023,
  //           {
  //             message:
  //               "El  año de rodaje es obligatorio, debe ser un número entre 1900 y 2023",
  //           }
  //         ),

  //       // N° tarjeta de propiedad (Property Card Number)
  //       property_card_number: z
  //         .string()
  //         .min(1, "La  tarjeta de propiedad es obligatorio"),
  //     })
  //   )
  //   .max(3),
  vehicles: z.array(
    z.object({
      // Marca (Brand)
      brand: z.string().optional(),
      // Modelo (Model)
      model: z.string().optional(),
      // Año de rodaje (Year of Shooting/Filming)
      year_of_shooting: z
        .string()
        .refine(
          (value) =>
            value.length <= 0 ||
            (!isNaN(parseFloat(value)) &&
              parseFloat(value) >= 1900 &&
              parseFloat(value) <= 2023),
          {
            message: "El año de rodaje debe ser un número entre 1900 y 2023",
          }
        )
        .optional(),
      // N° tarjeta de propiedad (Property Card Number)
      property_card_number: z.string().optional(),
    })
  ),

  // other_assets: z
  //   .array(
  //     z.object({
  //       // Patrimonios
  //       patrimonies: z.string().min(1, "Los patrimonios son obligatorios"),
  //     })
  //   )
  //   .max(3),
  other_assets: z.array(
    z.object({
      // Patrimonios
      patrimonies: z.string().optional(),
    })
  ),

  commercial_references: z
    .array(
      z.object({
        names: z.string().min(1, "Los nombres son obligatorios"),
        last_names: z.string().min(1, "Los apellidos son obligatorios"),
        cellphone: z.string().nonempty("Número de teléfono móvil obligatorio"),
      })
    )
    .max(3),
});
export const VehiclesValidation = z.object({
  vehicles: z
    .array(
      z.object({
        // Marca (Brand)
        brand: z.string().optional(),
        // Modelo (Model)
        model: z.string().optional(),
        // Año de rodaje (Year of Shooting/Filming)
        year_of_shooting: z.string().optional(),
        // N° tarjeta de propiedad (Property Card Number)
        property_card_number: z.string().optional(),
      })
    )
    .max(3),
});

export const OtherAssetsValidation = z.object({
  other_assets: z
    .array(
      z.object({
        // Patrimonios
        patrimonies: z.string().optional(),
      })
    )
    .max(3),
});

export const CommercialReferencesValidation = z.object({
  commercial_references: z
    .array(
      z.object({
        names: z.string().min(1, "Los nombres son obligatorios"),
        last_names: z.string().min(1, "Los apellidos son obligatorios"),
        cellphone: z.string().nonempty("Número de teléfono móvil obligatorio"),
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

  // Partida Registral de la empresa
  company_registry_entry: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Partida Registral de la empresa es obligatorio."
    ),

  // Estados Financieros (2 últimos años)
  financial_statements_1: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Estados Financieros del primer año es obligatorio."
    ),
  financial_statements_2: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Estados Financieros del segundo año es obligatorio."
    ),

  // PDT (últimos 3 meses)
  pdt_1: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo PDT del primer mes es obligatorio."
    ),
  pdt_2: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo PDT del segundo mes es obligatorio."
    ),
  pdt_3: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo PDT del tercer mes es obligatorio."
    ),
});
