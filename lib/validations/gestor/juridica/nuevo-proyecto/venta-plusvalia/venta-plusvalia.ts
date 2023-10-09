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
});

export const HomeValidation = z.object({
  // Área del Terreno
  area_land: z.string().min(1, "El área del terreno es obligatoria"),

  // Área Construida
  area_built: z.string().min(1, "El área construida es obligatoria"),

  // Antigüedad
  age: z.string().min(1, "La antigüedad es obligatoria"),

  // Número de Pisos
  number_of_floors: z.string().min(1, "El número de pisos es obligatorio"),

  // Dormitorios
  bedrooms: z.string().min(1, "El número de dormitorios es obligatorio"),

  // Baños
  bathrooms: z.string().min(1, "El número de baños es obligatorio"),

  // Baño de Visita
  guest_bathroom: z.string().min(1, "El baño de visita es obligatorio"),

  // Sala comedor
  living_room: z.boolean().default(false).optional(), // Sala comedor

  // Living comedor
  living_dining_room: z.boolean().default(false).optional(), // Living comedor

  // Sala de estar
  sitting_room: z.boolean().default(false).optional(), // Sala de estar

  // Kitchenette
  kitchenette: z.boolean().default(false).optional(), // Kitchenette

  // Cocina tradicional
  traditional_kitchen: z.boolean().default(false).optional(), // Cocina tradicional

  // Estudio
  study: z.boolean().default(false).optional(), // Estudio

  // Dormitorio principal c/b
  main_bedroom: z.boolean().default(false).optional(), // Dormitorio principal c/b

  // Cuarto de servicio
  service_room: z.boolean().default(false).optional(), // Cuarto de servicio

  // Jardín interior
  inner_garden: z.boolean().default(false).optional(), // Jardín interior

  // Jardín exterior
  outer_garden: z.boolean().default(false).optional(), // Jardín exterior

  // Azotea
  roof_terrace: z.boolean().default(false).optional(), // Azotea

  // Piscina
  pool: z.boolean().default(false).optional(), // Piscina

  // Gimnasio
  gym: z.boolean().default(false).optional(), // Gimnasio

  // Video vigilancia
  video_surveillance: z.boolean().default(false).optional(), // Video vigilancia

  // Cerco eléctrico
  electric_fence: z.boolean().default(false).optional(), // Cerco eléctrico

  // Cisterna
  cistern: z.boolean().default(false).optional(), // Cisterna

  // Reposteros en cocina
  kitchen_cabinets: z.boolean().default(false).optional(), // Reposteros en cocina

  // Jacuzzi
  jacuzzi: z.boolean().default(false).optional(), // Jacuzzi

  // Walk in closet
  walk_in_closet: z.boolean().default(false).optional(), // Walk in closet

  // Inventario
  inventory: z.boolean().default(false).optional(), // Inventario

  // Agua
  water: z.boolean().default(false).optional(), // Agua

  // Electricidad
  electricity: z.boolean().default(false).optional(), // Electricidad

  // KW
  kw: z.boolean().default(false).optional(), // KW

  // Trifásico
  three_phase: z.boolean().default(false).optional(), // Trifásico

  // Monofásico
  single_phase: z.boolean().default(false).optional(), // Monofásico

  // Pisos
  floors: z.boolean().default(false).optional(), // Pisos

  // Ventanas
  windows: z.boolean().default(false).optional(), // Ventanas

  // Revestimientos
  cladding: z.boolean().default(false).optional(), // Revestimientos
  //Estado
  status: z.enum(["1", "2", "3", "4"], {
    required_error: "Debe seleccionar un estado",
  }),
});

export const TerrainInputsValidation = z.object({
  // Área
  area: z.string().min(1, "El área es obligatoria"),

  // Por el frente
  front_side: z.string().min(1, "El valor por el frente es obligatorio"),

  // Por el fondo
  back_side: z.string().min(1, "El valor por el fondo es obligatorio"),

  // Por la izquierda
  left_side: z.string().min(1, "El valor por la izquierda es obligatorio"),

  // Por la derecha
  right_side: z.string().min(1, "El valor por la derecha es obligatorio"),

  // Irregular
  irregular: z.boolean().default(false).optional(),

  // Cercado
  fence_enclosed: z.boolean().default(false).optional(),

  // Portón
  gate: z.boolean().default(false).optional(),

  // Construcción
  construction: z.boolean().default(false).optional(),

  // Agua
  water: z.boolean().default(false).optional(),

  // Electricidad
  electricity: z.boolean().default(false).optional(),

  // KW
  kw: z.string().min(1, "El valor kw es obligatorio"),

  // Trifásico
  three_phase: z.boolean().default(false).optional(),

  // Monofásico
  single_phase: z.boolean().default(false).optional(),

  // Resolución municipal
  municipal_resolution: z.boolean().default(false).optional(),

  // Plano aprobado
  approved_blueprint: z.boolean().default(false).optional(),
});

export const LocalInputsValidation = z.object({
  // Área de terreno
  land_area: z.string().min(1, "El área de terreno es obligatoria"),

  // Área libre
  free_area: z.string().min(1, "El área libre es obligatoria"),

  // Antigüedad
  age: z.string().min(1, "La antigüedad es obligatoria"),

  // Número de pisos
  number_of_floors: z.string().min(1, "El número de pisos es obligatorio"),

  // Ambientes
  environments: z.string().min(1, "Los ambientes son obligatorios"),

  // Estacionamientos
  parking_lots: z.string().min(1, "Los estacionamientos son obligatorios"),

  // Patio de descargas
  unloading_yard: z.string().min(1, "El patio de descargas es obligatorio"),

  // Baños
  bathrooms: z.string().min(1, "Los baños son obligatorios"),

  // Maquinarias
  machinery: z.boolean().default(false).optional(),

  // Almacen
  warehouse: z.boolean().default(false).optional(),

  // Agua
  water: z.boolean().default(false).optional(),

  // Electricidad
  electricity: z.boolean().default(false).optional(),

  // KW
  kw: z.string().min(1, "El valor kw es obligatorio"),

  // Trifásico
  three_phase: z.boolean().default(false).optional(),

  // Monofásico
  single_phase: z.boolean().default(false).optional(),
});

export const DepartmentInputsValidation = z.object({
  // Antigüedad
  age: z.string().min(1, "La antigüedad es obligatoria"),

  // Nro. pisos
  number_of_floors: z.string().min(1, "El número de pisos es obligatorio"),

  // Nro. dptos por pisos
  apartments_per_floor: z
    .string()
    .min(1, "El número de departamentos por piso es obligatorio"),

  // % Areas comunes
  common_area_percentage: z
    .string()
    .min(1, "El porcentaje de áreas comunes es obligatorio"),

  // Costo de mantenimiento
  maintenance_cost: z
    .string()
    .min(1, "El costo de mantenimiento es obligatorio"),

  // Lobby de ingreso
  entrance_lobby: z.boolean().default(false).optional(),

  // Ascensor
  elevator: z.boolean().default(false).optional(),

  // Jardín
  garden: z.boolean().default(false).optional(),

  // Piscina
  pool: z.boolean().default(false).optional(),

  // Gimnasio
  gym: z.boolean().default(false).optional(),

  // Video vigilancia
  video_surveillance: z.boolean().default(false).optional(),

  // Cerco eléctrico
  electric_fence: z.boolean().default(false).optional(),

  // Cisterna
  cistern: z.boolean().default(false).optional(),

  // Permiten mascotas
  pets_allowed: z.boolean().default(false).optional(),

  // Reglamento interno
  internal_rules: z.boolean().default(false).optional(),

  // Reposteros en cocina
  kitchen_cabinets: z.boolean().default(false).optional(),

  // Jacuzzi
  jacuzzi: z.boolean().default(false).optional(),

  // Walk in closet
  walk_in_closet: z.boolean().default(false).optional(),

  // Parrilla
  grill: z.boolean().default(false).optional(),

  /* Servicios publicos */
  //Agua
  water: z.boolean().default(false).optional(),
  //Electricidad
  electricity: z.boolean().default(false).optional(),
  //Instalación de gas
  gas_installation: z.boolean().default(false).optional(),

  /* Descripción del departamento */
  // Área ocupada
  occupied_area: z.string().min(1, "El área ocupada es obligatoria"),

  // Área construida
  built_area: z.string().min(1, "El área construida es obligatoria"),

  // Ubicación del departamento
  department_location: z
    .string()
    .min(1, "La ubicación del departamento es obligatoria"),

  // Dormitorios
  bedrooms: z.string().min(1, "Los dormitorios son obligatorios"),

  // Baños
  bathrooms: z.string().min(1, "Los baños son obligatorios"),

  // Baños de visita
  guest_bathrooms: z.string().min(1, "Los baños de visita son obligatorios"),

  // Estacionamiento
  parking: z.string().min(1, "El estacionamiento es obligatorio"),

  // Ambientes
  environments: z.string().min(1, "Los ambientes son obligatorios"),

  // Sala comedor
  dining_room: z.boolean().default(false).optional(),

  // Living comedor
  living_dining_room: z.boolean().default(false).optional(),

  // Sala de estar
  living_room: z.boolean().default(false).optional(),

  // Kitchenette
  kitchenette: z.boolean().default(false).optional(),

  // Cocina tradicional
  traditional_kitchen: z.boolean().default(false).optional(),

  // Estudio
  study: z.boolean().default(false).optional(),

  // Terraza
  terrace: z.boolean().default(false).optional(),

  // Dormitorio principal c/b
  main_bedroom_with_bathroom: z.boolean().default(false).optional(),

  // Cuarto de servicio
  service_room: z.boolean().default(false).optional(),

  // Depósito
  storage: z.boolean().default(false).optional(),

  // Amoblado
  furnished: z.boolean().default(false).optional(),

  // Cortinas
  curtains: z.boolean().default(false).optional(),

  // Teléfono
  phone: z.boolean().default(false).optional(),

  // Cable
  cable: z.boolean().default(false).optional(),

  // Internet
  internet: z.boolean().default(false).optional(),

  // Inventario
  inventory: z.boolean().default(false).optional(),
});

export const OfficeInputsValidation = z.object({
  // Antigüedad
  age: z.string().min(1, "La antigüedad es obligatoria"),

  // Nro. pisos
  number_of_floors: z.string().min(1, "El número de pisos es obligatorio"),

  // Nro. dptos por pisos
  apartments_per_floor: z
    .string()
    .min(1, "El número de departamentos por piso es obligatorio"),

  // % Areas comunes
  common_area_percentage: z
    .string()
    .min(1, "El porcentaje de áreas comunes es obligatorio"),

  // Costo de mantenimiento
  maintenance_cost: z
    .string()
    .min(1, "El costo de mantenimiento es obligatorio"),

  // Lobby de ingreso
  entrance_lobby: z.boolean().default(false).optional(),

  // Ascensor
  elevator: z.boolean().default(false).optional(),

  // Jardín
  garden: z.boolean().default(false).optional(),

  // Piscina
  pool: z.boolean().default(false).optional(),

  // Gimnasio
  gym: z.boolean().default(false).optional(),

  // Video vigilancia
  video_surveillance: z.boolean().default(false).optional(),

  // Cerco eléctrico
  electric_fence: z.boolean().default(false).optional(),

  // Cisterna
  cistern: z.boolean().default(false).optional(),

  // Permiten mascotas
  pets_allowed: z.boolean().default(false).optional(),

  // Reglamento interno
  internal_rules: z.boolean().default(false).optional(),

  // Reposteros en cocina
  kitchen_cabinets: z.boolean().default(false).optional(),

  // Jacuzzi
  jacuzzi: z.boolean().default(false).optional(),

  // Walk in closet
  walk_in_closet: z.boolean().default(false).optional(),

  // Parrilla
  grill: z.boolean().default(false).optional(),

  /* Servicios publicos */
  //Agua
  water: z.boolean().default(false).optional(),
  //Electricidad
  electricity: z.boolean().default(false).optional(),
  //Instalación de gas
  gas_installation: z.boolean().default(false).optional(),

  /* Descripción del departamento */
  // Área ocupada
  occupied_area: z.string().min(1, "El área ocupada es obligatoria"),

  // Área construida
  built_area: z.string().min(1, "El área construida es obligatoria"),

  // Ubicación del departamento
  department_location: z
    .string()
    .min(1, "La ubicación del departamento es obligatoria"),

  // Ambientes
  environments: z.string().min(1, "Los ambientes son obligatorios"),

  // Estacionamiento
  parking: z.string().min(1, "El estacionamiento es obligatorio"),

  // Amoblado
  furnished: z.boolean().default(false).optional(),

  // Cortinas
  curtains: z.boolean().default(false).optional(),

  // Teléfono
  phone: z.boolean().default(false).optional(),

  // Cable
  cable: z.boolean().default(false).optional(),

  // Internet
  internet: z.boolean().default(false).optional(),

  // Inventario
  inventory: z.boolean().default(false).optional(),
});

export const PropImagesVideoValidation = z.object({
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

  patio_photo_text_1: z
    .any()
    .refine((files) => files?.length !== 0, "El archivo es obligatorio."),
  patio_photo_text_2: z
    .any()
    .refine((files) => files?.length !== 0, "El archivo es obligatorio."),
  patio_photo_text_3: z
    .any()
    .refine((files) => files?.length !== 0, "El archivo es obligatorio."),
  youtube_link: z.string().min(1, "El enlace de youtube es obligatoria"),
});

export const ProjectFinancialDataValidation = z.object({
  // Precio del inmueble (compra)
  property_price: z.string().min(1, "El precio del inmueble es obligatorio"),

  // Valor de venta (aprox)
  sale_value: z.string().min(1, "El valor de venta es obligatorio"),

  // Monto a financiar
  financing_amount: z.string().min(1, "El monto a financiar es obligatorio"),

  // Cuota inicial
  initial_fee: z.string().min(1, "La cuota inicial es obligatoria"),

  // Propuesta de rentabilidad
  profitability_proposal: z
    .string()
    .min(1, "La propuesta de rentabilidad es obligatoria"),

  // Plazo de retorno
  return_period: z.string().min(1, "El plazo de retorno es obligatorio"),

  // Presupuesto para remodelar
  remodeling_budget: z
    .string()
    .min(1, "El presupuesto para remodelar es obligatorio"),

  // Tiempo de ejecución de remodelación
  remodeling_execution_time: z
    .string()
    .min(1, "El tiempo de ejecución de remodelación es obligatorio"),

  //Va a remodelar el inmueble?
  will_remodel: z.enum(["1", "2"], {
    required_error: "Debe seleccionar si o no",
  }),

  /* Datos del garante */
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
});
