"use client";
import { createContext } from "react";
import { PROJECT_INITIAL_STATE, ProjectState } from "./ProjectProvider";

interface ContextProps {
  formTotalVenta: number;
  formsSubmittedVenta: number;
  idProyecto: number;
  incrementFormCountVenta: (
    formName: keyof typeof PROJECT_INITIAL_STATE.formsVenta
  ) => void;
  formsVenta: {
    datos_del_proyecto_inmobiliario: boolean;
    descripcion_de_la_propiedad: boolean;
    imagenes_y_video_del_inmueble: boolean;
    datos_financieros_del_proyecto: boolean;
    archivos_adjuntos_requeridos: boolean;
    gastos_administrativos: boolean;
  };
  setIdProyecto: (id: number) => void;
}

export const ProjectContext = createContext({} as ContextProps);
