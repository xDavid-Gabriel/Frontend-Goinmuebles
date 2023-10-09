"use client";
import { useReducer, useContext, useEffect, useState } from "react";

// Importar tu reducer y context específico para Project
import { projectReducer } from "@/context/project/projectReducer";
import { ProjectContext } from "@/context/project/ProjectContext";

// Definición de estado inicial del proyecto
// Aquí debes adaptar y agregar los estados específicos que necesitas
export interface ProjectState {
  formTotalVenta: number;
  idProyecto: number;
  formsSubmittedVenta: number;
  formsVenta: {
    datos_del_proyecto_inmobiliario: boolean;
    descripcion_de_la_propiedad: boolean;
    imagenes_y_video_del_inmueble: boolean;
    datos_financieros_del_proyecto: boolean;
    archivos_adjuntos_requeridos: boolean;
    gastos_administrativos: boolean;
  };
}

export const PROJECT_INITIAL_STATE: ProjectState = {
  formTotalVenta: 6,
  idProyecto: 0,
  formsSubmittedVenta: 0,
  formsVenta: {
    datos_del_proyecto_inmobiliario: false,
    descripcion_de_la_propiedad: false,
    imagenes_y_video_del_inmueble: false,
    datos_financieros_del_proyecto: false,
    archivos_adjuntos_requeridos: false,
    gastos_administrativos: false,
  },
};

// Hook personalizado para usar el contexto
export const useStateProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "useStateProjectContext must be used within a ProjectProvider"
    );
  }
  return context;
};

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const STATE_KEY = "projectState";
  // Estado temporal para almacenar lo que se obtiene del localStorage

  const [state, dispatch] = useReducer(projectReducer, PROJECT_INITIAL_STATE);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializar el estado desde localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(STATE_KEY);
    if (savedState) {
      dispatch({
        type: "[Project] - Update Form",
        payload: JSON.parse(savedState),
      });
    }
    setIsInitialized(true);
  }, []);
  const incrementFormCountVenta = (
    formName: keyof typeof PROJECT_INITIAL_STATE.formsVenta
  ): void => {
    dispatch({ type: "[Project] - Submit Form", payload: formName });
  };
  const setIdProyecto = (id: number): void => {
    dispatch({ type: "[Project] - Set Project ID", payload: id });
  };
  // Cada vez que el estado cambie, actualizamos localStorage
  useEffect(() => {
    if (isInitialized) {
      // Asegurarse de que no se guarde el PROJECT_INITIAL_STATE por accidente
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    }
  }, [state, isInitialized]);
  return (
    <ProjectContext.Provider
      value={{
        ...state,
        incrementFormCountVenta,
        setIdProyecto,
        // ... Otras funciones exportadas para la gestión de proyectos
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
