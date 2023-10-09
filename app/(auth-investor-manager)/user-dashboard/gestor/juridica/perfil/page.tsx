import {
  PersonalData,
  LegalRepresentativeInformation,
  ShareholderData,
  PatrimonialData,
  AdditionalInformation,
  Attachments,
} from "@/components/forms/gestor/juridica/perfil";
import { TypographyH1 } from "@/components/shared";
import { IUser } from "@/interfaces";
import { ENV } from "@/utils";
import { fn } from "@/utils/functions";

async function getPropertyData(userCod: string | number) {
  const res = await fetch(
    `${ENV.API_URL}/${ENV.ENDPOINTS.PROPERTY_DATA}/${userCod}`
  );

  const data = await res.json();
  if (data.error) {
    return [];
  }
  const respuesta = [data].map((data) => {
    return {
      id: data.codigo_usuario,
      propiedades_inmuebles: data.propiedades_inmuebles.map((item: any) => {
        return {
          tipo_inmueble: item.tipo_inmueble,
          direccion: item.direccion,
          departamento_id: item.departamento_id,
          provincia_id: item.provincia_id,
          distrito_id: item.distrito_id,
          valor_propiedad: item.valor_propiedad,
          numero_partida: item.numero_partida,
        };
      }),
      vehiculos: data.vehiculos.map((item: any) => {
        return {
          marca: item.marca,
          modelo: item.modelo,
          n_tarjeta_propiedad: item.n_tarjeta_propiedad,
          anio: item.anio,
        };
      }),

      otros_patrimonios: data.otros_patrimonios.map((item: any) => {
        return {
          descripcion: item.descripcion,
        };
      }),
      referencias_comerciales: data.referencias_comerciales.map((item: any) => {
        return {
          nombres: item.nombres,
          apellidos: item.apellidos,
          celular: item.celular,
        };
      }),
    };
  });
  return respuesta;
}

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
const ProfileJuridicaPage = async () => {
  const user: IUser = await fn.isPermitions({
    userName: "Gestor",
    userType: "juridica",
  });

  const propertyData = await getPropertyData(
    user.user.codigo_usuario?.toString()!
  );

  const representativesLegalData = await getRepresentativesLegal(
    user.user.codigo_usuario?.toString()!
  );
  const shareholderData = await getShareholderData(
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
      <PersonalData user={user} />
      <LegalRepresentativeInformation
        user={user}
        representativesLegalData={representativesLegalData}
      />
      <ShareholderData user={user} shareholderDataApi={shareholderData} />
      <PatrimonialData user={user} propertyData={propertyData} />
      <AdditionalInformation user={user} />
      <Attachments />
    </div>
  );
};

export default ProfileJuridicaPage;
