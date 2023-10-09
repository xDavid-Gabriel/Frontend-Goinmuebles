import * as z from "zod";

const CivilStatusEnum = z.enum(["Casado", "Soltero", "Divorciado"]);
const IdentiyDocumentStatusEnum = z.enum(["DNI", "CE"]);
const FamilyBurdenEnum = z.enum(["1-hijo", "2-hijos", "3-hijos"]);
// const DepartmentEnum = z.enum([...department.map((item) => item.nombre)] as [
//   string,
//   ...string[]
// ]);

export const PersonalDataValidation = z.object({
  full_names: z
    .string()
    .min(1, "Los nombres son obligatorios")
    .max(50, "Los nombres son demasiado largos"),
  last_name_complete: z
    .string()
    .min(1, "Los apellidos son obligatorios")
    .max(50, "Los apellidos son demasiado largos"),
  age: z.string().min(1, "La edad es obligatoria"),
  identity_document: z.string().min(1, "El documento es obligatorio"),
  document_number: z
    .string()
    .min(1, "El numero de documento es obligatorio")
    .max(8, "Los numeros de documento son demasiado largos"),

  civil_status: z.string().min(1, "El estado civil es obligatorio."),
  family_burden: z.string().min(1, "La carga familiar es obligatoria"),
  // .refine((value) => FamilyBurdenEnum.safeParse(value).success, {
  //   message:
  //     "La carga familiar debe ser uno de los siguientes: 1 Hijo, 2 Hijos, 3 Hijos",
  // }),
  dob: z
    .string()
    .nonempty("La fecha de nacimiento es obligatoria.")
    .refine(
      (date) => {
        const regex =
          /^(19[0-9]{2}|200[0-9]|2010)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return regex.test(date);
      },
      {
        message: "La fecha de nacimiento debe estar entre 1900 y 2010.",
      }
    ),
  address: z.string().nonempty("El domicilio es requerido"),
  department: z.string().min(1, "El de partamento es obligatorio"),

  province: z.string().min(1, "La provincia es obligatoria"),

  district: z.string().min(1, "El distrito es obligatorio"),
  email: z
    .string()
    .nonempty("Correo electrónico obligatorio")
    .email("Formato de correo electrónico no válido"),
  cellphone: z.string().nonempty("Número de teléfono móvil obligatorio"),
  // .refine(
  //   (value) => /^(\+[0-9]{1,3})?([0-9]{10})$/.test(value),
  //   "Formato de número de móvil no válido"
  // ),
});

export const SpouseDataValidation = z.object({
  full_names: z
    .string()
    .min(1, "Los nombres son obligatorios")
    .max(50, "Los nombres son demasiado largos"),
  last_name_complete: z
    .string()
    .min(1, "Los apellidos son obligatorios")
    .max(50, "Los apellidos son demasiado largos"),
  identity_document: z.string().min(1, "El documento es obligatorio"),

  document_number: z
    .string()
    .min(1, "El numero de documento es obligatorio")
    .max(8, "Los numeros de documento son demasiado largos"),
  dob: z
    .string()
    .nonempty("La fecha de nacimiento es obligatoria.")
    .refine(
      (date) => {
        const regex =
          /^(19[0-9]{2}|200[0-9]|2010)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return regex.test(date);
      },
      {
        message: "La fecha de nacimiento debe estar entre 1900 y 2010.",
      }
    ),
  // nationality: z.string().min(1, "La nacionalidad es obligatoria"),
  // address: z.string().nonempty("El domicilio es requerido"),
  department: z.string().min(1, "El de partamento es obligatorio"),
  province: z.string().min(1, "La provincia es obligatoria"),
  district: z.string().min(1, "El distrito es obligatorio"),
  email: z
    .string()
    .min(1, "Correo electrónico obligatorio")
    .email("Formato de correo electrónico no válido"),
  cellphone: z.string().min(1, "Número de teléfono móvil obligatorio"),
  // .refine(
  //   (value) => /^(\+[0-9]{1,3})?([0-9]{10})$/.test(value),
  //   "Formato de número de móvil no válido"
  // ),
});

export const EmploymentDataValidation = z.object({
  employment_status: z.string().min(1, "El estado laboral es obligatoria"),
  work_center: z.string().min(1, "El centro laboral es obligatorio"),
  ruc: z.string().min(1, "El RUC es obligatorio"),
  years_of_seniority: z
    .string()
    .min(1, "Los años de antigüedad son obligatorios"),
  address: z.string().min(1, "La dirección es obligatoria"),
  department: z.string().min(1, "El de partamento es obligatorio"),
  province: z.string().min(1, "La provincia es obligatoria"),
  district: z.string().min(1, "El distrito es obligatorio"),
  position_held: z.string().min(1, "El cargo que ocupa es obligatorio"),
  company_phone: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: "El teléfono es obligatorio y debe ser un número mayor que cero",
    }),

  business_nature: z.string().min(1, "El giro de negocio es obligatorio"),
  monthly_income: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message:
        "El Ingreso mensual es obligatorio y debe ser un número mayor que cero",
    }),
  monthly_expense: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message:
        "El Egreso mensual es obligatorio y debe ser un número mayor que cero",
    }),
});

export const IndependentDataValidation = z.object({
  employment_status: z.string().min(1, "El estado laboral es obligatoria"),
  independent_work_description: z
    .string()
    .min(1, "La descripción del trabajo como independiente es obligatoria"),
  ruc: z.string().min(1, "El RUC es obligatorio"),
  industry_experience: z
    .string()
    .min(1, "La experiencia en el rubro es obligatoria"),
  business_turn: z.string().min(1, "El giro del negocio es obligatorio"),
  gross_monthly_income: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message:
        "El Ingreso mensual es obligatorio y debe ser un número mayor que cero",
    }),
  gross_monthly_expense: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message:
        "El Egreso mensual es obligatorio y debe ser un número mayor que cero",
    }),
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
        brand: z.string().min(1, "Las marca es obligatoria"),
        // Modelo (Model)
        model: z.string().min(1, "El modelo es obligatorio"),
        // Año de rodaje (Year of Shooting/Filming)
        year_of_shooting: z
          .string()
          .refine(
            (value) =>
              !isNaN(parseFloat(value)) &&
              parseFloat(value) >= 1900 &&
              parseFloat(value) <= 2023,
            {
              message:
                "El  año de rodaje es obligatorio, debe ser un número entre 1900 y 2023",
            }
          ),

        // N° tarjeta de propiedad (Property Card Number)
        property_card_number: z
          .string()
          .min(1, "La  tarjeta de propiedad es obligatorio"),
      })
    )
    .max(3),
});

export const OtherAssetsValidation = z.object({
  other_assets: z
    .array(
      z.object({
        // Patrimonios
        patrimonies: z.string().min(1, "Los patrimonios son obligatorios"),
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
  // DNI Gestor
  // dni_manager: z.string().nonempty("El archivo es obligatorio"),
  dni_manager: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo DNI Gestor es obligatorio."
    ),

  // DNI Conyuge
  dni_spouse: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo DNI Conyuge es obligatorio."
    ),

  // Boletas de pago
  payment_receipts_1: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Boletas de pago 1 es obligatorio."
    ),
  payment_receipts_2: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Boletas de pago 2 es obligatorio."
    ),
  payment_receipts_3: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Boletas de pago 3 es obligatorio."
    ),

  // Copia recibo agua/electricidad
  utility_bill_copy: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Copia recibo agua/electricidad es obligatorio."
    ),

  // Partidas registrales de sus propiedades
  property_records: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Partidas registrales de sus propiedades es obligatorio."
    ),

  // Documentación adicional
  additional_documentation: z
    .any()
    .refine(
      (files) => files?.length !== 0,
      "El archivo Documentación adicional es obligatorio."
    ),
});
