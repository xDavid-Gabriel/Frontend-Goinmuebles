import {
  AdditionalInformation,
  EmploymentData,
  PersonalData,
  Attachments,
} from "@/components/forms/inversor/natural/perfil";
import { TypographyH1 } from "@/components/shared";
import { ENV } from "@/utils";

import { fn } from "@/utils/functions";

async function getSpouseUserData(userCod: string) {
  const res = await fetch(
    `${ENV.API_URL}/${ENV.ENDPOINTS.SPOUSE_USER}/${userCod}`
  );

  const data = await res.json();

  if (data.message === "Cónyuge no encontrado") {
    return [];
  }

  return [data];
}
async function getEmploymentData(userCod: string | number) {
  const res = await fetch(`${ENV.API_URL}/ocupaciones/${userCod}`);

  const data = await res.json();
  const respuesta = data.map((data: any) => {
    return {
      id: data.id,
      cargos_ocupa: data.cargos_ocupa,
      descripcion_independiente: data.descripcion_independiente,
      direccion: data.direccion,
      egreso_mensual: data.egreso_mensual,
      empresa: data.empresa,
      estado_laboral: data.estado_laboral.id,
      experiencia_rubro: data.experiencia_rubro,
      giro_negocio: data.giro_negocio,
      ingreso_bruto: data.ingreso_bruto,
      ruc: data.ruc,
      telefono: data.telefono,
      departamento_id: data.departamento_id,
      provincia_id: data.provincia_id,
      distrito_id: data.distrito_id,
    };
  });
  return respuesta;
}
const ProfileNaturalPage = async () => {
  const user = await fn.isPermitions({
    userName: "Inversionista",
    userType: "natural",
  });
  const spouseUserData = await getSpouseUserData(
    user.user.codigo_usuario?.toString()!
  );
  const employmentData = await getEmploymentData(
    user.user.codigo_usuario?.toString()!
  );
  return (
    <div className="flex flex-col gap-8">
      <TypographyH1
        variant="primary-100"
        className={`${
          user.rol === "Gestor" ? "text-tomato/80" : "text-teal"
        }  my-4`}
      >
        Bienvenido {user.user.nombres} 👋
      </TypographyH1>
      <PersonalData user={user} spouseUserData={spouseUserData} />
      <EmploymentData user={user} employmentData={employmentData} />
      <AdditionalInformation user={user} />
      <Attachments />
    </div>
  );
};

export default ProfileNaturalPage;
