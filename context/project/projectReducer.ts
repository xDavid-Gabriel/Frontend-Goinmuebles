import {
  PROJECT_INITIAL_STATE,
  ProjectState,
} from "@/context/project/ProjectProvider";

type ProjectActionType =
  | {
      type: "[Project] - Submit Form";
      payload: keyof typeof PROJECT_INITIAL_STATE.formsVenta;
    }
  | {
      type: "[Project] - Update Form";
      payload: {
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
      };
    }
  | {
      type: "[Project] - Set Project ID";
      payload: number; // Aquí, el payload será el ID del proyecto.
    };

export const projectReducer = (
  state: ProjectState,
  action: ProjectActionType
): ProjectState => {
  switch (action.type) {
    case "[Project] - Submit Form":
      return {
        ...state,
        formsSubmittedVenta: state.formsSubmittedVenta + 1,
        formsVenta: {
          ...state.formsVenta,
          [action.payload]: true,
        },
      };
    case "[Project] - Update Form":
      return {
        ...state,
        ...action.payload,
      };
    case "[Project] - Set Project ID":
      return {
        ...state,
        idProyecto: action.payload,
      };
    default:
      return state;
  }
};
