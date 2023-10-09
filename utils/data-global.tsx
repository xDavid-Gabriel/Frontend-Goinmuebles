import {
  FaRegUser,
  FaSuitcase,
  FaFolderOpen,
  FaBox,
  FaWallet,
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

export const sidebarLinksGestorNatural = [
  {
    title: "Perfil",
    imgURL: <FaRegUser />,
    route: "/user-dashboard/gestor/natural/perfil",
  },
  {
    title: "Nuevo proyecto",
    imgURL: <FaFolderOpen />,
    route: "/user-dashboard/gestor/natural/nuevo-proyecto",
  },
  {
    title: "Mis proyectos",
    imgURL: <FaSuitcase />,
    route: "/user-dashboard/gestor/natural/mis-proyectos",
  },
  {
    title: "Notificaciones",
    imgURL: <IoNotifications />,
    route: "/user-dashboard/gestor/natural/notificaciones",
  },
  {
    title: "Mis archivos",
    route: "/user-dashboard/gestor/natural/mis-archivos",
    imgURL: <FaBox />,
  },
];

export const sidebarLinksGestorJuridica = [
  {
    title: "Perfil",
    imgURL: <FaRegUser />,
    route: "/user-dashboard/gestor/juridica/perfil",
  },
  {
    title: "Nuevo proyecto",
    imgURL: <FaFolderOpen />,
    route: "/user-dashboard/gestor/juridica/nuevo-proyecto",
  },
  {
    title: "Mis proyectos",
    imgURL: <FaSuitcase />,
    route: "/user-dashboard/gestor/juridica/mis-proyectos",
  },
  {
    title: "Notificaciones",
    imgURL: <IoNotifications />,
    route: "/user-dashboard/gestor/juridica/notificaciones",
  },
  {
    title: "Mis archivos",
    imgURL: <FaBox />,
    route: "/user-dashboard/gestor/juridica/mis-archivos",
  },
];

export const sidebarLinksInversorNatural = [
  {
    title: "Perfil",
    imgURL: <FaRegUser />,
    route: "/user-dashboard/inversor/natural/perfil",
  },
  {
    title: "Billetera digital",
    imgURL: <FaWallet />,
    route: "/user-dashboard/inversor/natural/nuevo-proyecto",
  },
  {
    title: "Proyectos inmobiliarios",
    imgURL: <FaSuitcase />,
    route: "/user-dashboard/inversor/natural/mis-proyectos",
  },
  {
    title: "Notificaciones",
    imgURL: <IoNotifications />,
    route: "/user-dashboard/inversor/natural/notificaciones",
  },
];

export const sidebarLinksInversorJuridica = [
  {
    title: "Perfil",
    imgURL: <FaRegUser />,
    route: "/user-dashboard/inversor/juridica/perfil",
  },
  {
    title: "Billetera digital",
    imgURL: <FaWallet />,
    route: "/user-dashboard/inversor/juridica/nuevo-proyecto",
  },
  {
    title: "Proyectos inmobiliarios",
    imgURL: <FaSuitcase />,
    route: "/user-dashboard/inversor/juridica/mis-proyectos",
  },
  {
    title: "Notificaciones",
    imgURL: <IoNotifications />,
    route: "/user-dashboard/inversor/juridica/notificaciones",
  },
];

export const selectOptions = [
  {
    id: 1,
    name: "Select 1",
    label: "Select 1",
    value: "select_1",
  },
  {
    id: 2,
    name: "Select 2",
    label: "Select 2",
    value: "select_2",
  },
  {
    id: 3,
    name: "Select 3",
    label: "Select 3",
    value: "select_3",
  },
  {
    id: 4,
    name: "Select 4",
    label: "Select 4",
    value: "select_4",
  },
];
type FileNameGestorNatural =
  | "dni_manager"
  | "dni_spouse"
  | "payment_receipts_1"
  | "payment_receipts_2"
  | "payment_receipts_3"
  | "utility_bill_copy"
  | "property_records"
  | "additional_documentation";
// type FileName = "dni_manager";
export const fileInputsGestorNatural: {
  name: FileNameGestorNatural;
  label: string;
  fileId: string;
}[] = [
  {
    name: "dni_manager",
    label: "DNI (Gestor)",
    fileId: "input-field-1",
  },
  {
    name: "dni_spouse",
    label: "DNI (Cónyuge)",
    fileId: "input-field-2",
  },
  {
    name: "payment_receipts_1",
    label: "Boletas de pago 1",
    fileId: "input-field-3",
  },
  {
    name: "payment_receipts_2",
    label: "Boletas de pago 2",
    fileId: "input-field-4",
  },
  {
    name: "payment_receipts_3",
    label: "Boletas de pago 3",
    fileId: "input-field-5",
  },
  {
    name: "utility_bill_copy",
    label: "Copia recibo agua/electricidad",
    fileId: "input-field-6",
  },
  {
    name: "property_records",
    label: "Partidas registrales de sus propiedades",
    fileId: "input-field-7",
  },
  {
    name: "additional_documentation",
    label: "Documentación ad",
    fileId: "input-field-8",
  },
  // ... puedes añadir más objetos para más campos.
];
type FileNameGnNewProjectVenta =
  | "dni_owners_copy"
  | "property_registry"
  | "cri_certificate"
  | "hr_tax_year"
  | "urban_parameters"
  | "pu_tax_year"
  | "guarantor_documentation";
export const fileInputsGnNewProjectVenta: {
  name: FileNameGnNewProjectVenta;
  label: string;
  fileId: string;
}[] = [
  {
    name: "dni_owners_copy",
    label: "Copia DNI propietarios",
    fileId: "input-field-1",
  },
  {
    name: "property_registry",
    label: "P. Registral de la propiedad",
    fileId: "input-field-2",
  },
  {
    name: "cri_certificate",
    label: "CRI - Certificado Registral inmobiliario",
    fileId: "input-field-3",
  },
  {
    name: "hr_tax_year",
    label: "Impuesto predial: HR del año",
    fileId: "input-field-4",
  },
  {
    name: "urban_parameters",
    label: "Parámetros urbanisticos (Si es terreno)",
    fileId: "input-field-5",
  },
  {
    name: "pu_tax_year",
    label: "Impuesto predial: PU del año",
    fileId: "input-field-6",
  },
  {
    name: "guarantor_documentation",
    label: "Documentación del Garante",
    fileId: "input-field-7",
  },
];

type FileNameGnNewProjectVentaGa =
  | "commercial_appraisal"
  | "legal_report"
  | "market_study";
export const fileInputsGnNewProjectVentaGa: {
  name: FileNameGnNewProjectVentaGa;
  label: string;
  fileId: string;
}[] = [
  {
    name: "commercial_appraisal",
    label: "Tasación comercial",
    fileId: "input-venta-ga-field-1",
  },
  {
    name: "legal_report",
    label: "Informe legal",
    fileId: "input-venta-ga-field-2",
  },
  {
    name: "market_study",
    label: "Estudio de mercado",
    fileId: "input-venta-ga-field-3",
  },
];

type FileNameGestorJuridica =
  | "legal_representative_dni"
  | "power_of_attorney_validity"
  | "ruc_record"
  | "company_registry_entry"
  | "financial_statements_1"
  | "financial_statements_2"
  | "pdt_1"
  | "pdt_2"
  | "pdt_3";
// type FileName = "dni_manager";
export const fileInputsGestorJuridica: {
  name: FileNameGestorJuridica;
  label: string;
  fileId: string;
}[] = [
  {
    name: "legal_representative_dni",
    label: "DNI (Representante legal)",
    fileId: "input-field-1",
  },
  {
    name: "power_of_attorney_validity",
    label: "Vigencia de poder",
    fileId: "input-field-2",
  },
  {
    name: "ruc_record",
    label: "Ficha R.U.C",
    fileId: "input-field-3",
  },
  {
    name: "company_registry_entry",
    label: "Partida Registral de la empresa",
    fileId: "input-field-4",
  },
  {
    name: "financial_statements_1",
    label: "Estados Financieros (2 últimos años) 1",
    fileId: "input-field-5",
  },
  {
    name: "financial_statements_2",
    label: "Estados Financieros (2 últimos años) 2",
    fileId: "input-field-6",
  },
  {
    name: "pdt_1",
    label: "PDT (últimos 3 meses) 1",
    fileId: "input-field-7",
  },
  {
    name: "pdt_2",
    label: "PDT (últimos 3 meses) 2",
    fileId: "input-field-8",
  },
  {
    name: "pdt_3",
    label: "PDT (últimos 3 meses) 3",
    fileId: "input-field-9",
  },
  // ... puedes añadir más objetos para más campos.
];

type FileNameInversorNatural = "dni_investor" | "dni_spouse";

export const fileInputsInversorNatural: {
  name: FileNameInversorNatural;
  label: string;
  fileId: string;
}[] = [
  {
    name: "dni_investor",
    label: "DNI (Inversor)",
    fileId: "input-field-1",
  },
  {
    name: "dni_spouse",
    label: "DNI (Cónyuge)",
    fileId: "input-field-2",
  },
];

type FileNameInversorJuridica =
  | "legal_representative_dni"
  | "power_of_attorney_validity"
  | "ruc_record"
  | "company_registry_entry";

export const fileInputsInversorJuridica: {
  name: FileNameInversorJuridica;
  label: string;
  fileId: string;
}[] = [
  {
    name: "legal_representative_dni",
    label: "DNI (Representante legal)",
    fileId: "input-field-1",
  },
  {
    name: "power_of_attorney_validity",
    label: "Vigencia de poder",
    fileId: "input-field-2",
  },
  {
    name: "ruc_record",
    label: "Ficha R.U.C",
    fileId: "input-field-3",
  },
  {
    name: "company_registry_entry",
    label: "P.Electrónica de la empresa",
    fileId: "input-field-4",
  },
];

/* Subir imagenes */
export const filesImagesGestorVenta = [
  {
    id: 1,
    label: "Fotografias del interior (minimo 3)",
    images: [
      {
        id: 1,
        photo_text: "interior_photo_text_1",
        fileId: "input-interior-field-1",
      },
      {
        id: 2,
        photo_text: "interior_photo_text_2",
        fileId: "input-interior-field-2",
      },
      {
        id: 3,
        photo_text: "interior_photo_text_3",
        fileId: "input-interior-field-3",
      },
    ],
  },
  {
    id: 2,
    label: "Fotografias del exterior (minimo 3)",
    images: [
      {
        id: 1,
        photo_text: "exterior_photo_text_1",
        fileId: "input-field-exterior-1",
      },
      {
        id: 2,
        photo_text: "exterior_photo_text_2",
        fileId: "input-field-exterior-2",
      },
      {
        id: 3,
        photo_text: "exterior_photo_text_3",
        fileId: "input-field-exterior-3",
      },
    ],
  },
  {
    id: 3,
    label: "Fotografias del patio (minimo 3)",
    images: [
      {
        id: 1,
        photo_text: "patio_photo_text_1",
        fileId: "input-field-patio-1",
      },
      {
        id: 2,
        photo_text: "patio_photo_text_2",
        fileId: "input-field-patio-2",
      },
      {
        id: 3,
        photo_text: "patio_photo_text_3",
        fileId: "input-field-patio-3",
      },
    ],
  },
];

export const filesImagesGestorRenta = [
  {
    id: 1,
    label: "Fotografias del interior (minimo 3)",
    images: [
      {
        id: 1,
        photo_text: "interior_photo_text_1",
        fileId: "input-interior-field-1",
      },
      {
        id: 2,
        photo_text: "interior_photo_text_2",
        fileId: "input-interior-field-2",
      },
      {
        id: 3,
        photo_text: "interior_photo_text_3",
        fileId: "input-interior-field-3",
      },
    ],
  },
  {
    id: 2,
    label: "Fotografias del exterior (minimo 3)",
    images: [
      {
        id: 1,
        photo_text: "exterior_photo_text_1",
        fileId: "input-field-exterior-1",
      },
      {
        id: 2,
        photo_text: "exterior_photo_text_2",
        fileId: "input-field-exterior-2",
      },
      {
        id: 3,
        photo_text: "exterior_photo_text_3",
        fileId: "input-field-exterior-3",
      },
    ],
  },
];
