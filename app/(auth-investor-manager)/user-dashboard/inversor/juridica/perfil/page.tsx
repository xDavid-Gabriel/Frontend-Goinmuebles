// import { PersonalData } from "@/components/forms/gestor/natural";

import {
  PersonalData,
  LegalRepresentativeInformation,
  ShareholderData,
  AdditionalInformation,
  Attachments,
  CommercialReferences,
} from "@/components/forms/inversor/juridica/perfil";
import { ENV } from "@/utils";
import { fn } from "@/utils/functions";

async function getRepresentativesLegal(userCod: string) {
  const res = await fetch(
    `${ENV.API_URL}/${ENV.ENDPOINTS.REPRESENTATIVES_LEGAL}/${userCod}`
  );

  const data = await res.json();

  if (data.representantes.length === 0) {
    return [];
  }

  return data.representantes;
}

async function getShareholderData(userCod: string | number) {
  const res = await fetch(
    `${ENV.API_URL}/${ENV.ENDPOINTS.SHAREHOLDER_DATA}/${userCod}`
  );

  const data = await res.json();
  if (data.error) {
    return {
      codigo_usuario: "",
      datos_accionistas: [],
      error: true,
    };
  }
  const respuesta = {
    id: data?.id,
    codigo_usuario: data?.datos_referencias_comerciales?.codigo_usuario,
    datos_accionistas:
      data?.datos_referencias_comerciales?.datos_accionistas?.map(
        ({
          nombres_completos,
          apellidos_completos,
          id_tipo_documento_identidad,
          numero_documento_identidad,
          id_nacionalidad,
          fecha_nacimiento,
          domicilio,
          id_departamento,
          id_provincia,
          id_distrito,
          correo_electronico,
          id_profesion,
          cargo_empresa,
          porcentaje_participacion,
        }: any) => {
          return {
            nombres_completos,
            apellidos_completos,
            id_tipo_documento_identidad,
            numero_documento_identidad,
            id_nacionalidad,
            fecha_nacimiento,
            domicilio,
            id_departamento,
            id_provincia,
            id_distrito,
            correo_electronico,
            id_profesion,
            cargo_empresa,
            porcentaje_participacion,
          };
        }
      ),

    error: false,
  };

  return respuesta;
}

async function getCommercialReferencesData(userCod: string | number) {
  const res = await fetch(
    `${ENV.API_URL}/${ENV.ENDPOINTS.COMMERCIAL_REFERENCE_DATA}/${userCod}`
  );

  const data = await res.json();
  if (data.error) {
    return {
      codigo_usuario: "",
      datos_referencias: [],
      error: true,
    };
  }
  const respuesta = {
    id: data?.id,
    codigo_usuario: data?.datos_referencias_comerciales?.codigo_usuario,
    datos_referencias:
      data?.datos_referencias_comerciales?.datos_referencias?.map(
        ({ empresa, nombres, apellidos, cargo, telefono }: any) => {
          return {
            empresa,
            nombres,
            apellidos,
            cargo,
            telefono,
          };
        }
      ),

    error: false,
  };

  return respuesta;
}

const ProfileJuridicaPage = async () => {
  const user = await fn.isPermitions({
    userName: "Inversionista",
    userType: "juridica",
  });
  const representativesLegalData = await getRepresentativesLegal(
    user.user.codigo_usuario?.toString()!
  );

  const shareholderData = await getShareholderData(
    user.user.codigo_usuario?.toString()!
  );
  const commercialReferencesData = await getCommercialReferencesData(
    user.user.codigo_usuario?.toString()!
  );
  return (
    <div className="flex flex-col gap-8">
      <PersonalData user={user} />
      <LegalRepresentativeInformation
        user={user}
        representativesLegalData={representativesLegalData}
      />
      <ShareholderData user={user} shareholderDataApi={shareholderData} />
      <CommercialReferences
        user={user}
        commercialReferencesData={commercialReferencesData}
      />
      <AdditionalInformation user={user} />
      <Attachments />
    </div>
  );
};

export default ProfileJuridicaPage;
