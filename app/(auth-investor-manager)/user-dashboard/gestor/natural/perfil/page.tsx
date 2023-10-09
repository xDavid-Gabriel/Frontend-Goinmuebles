import {
  EmploymentData,
  PersonalData,
  PatrimonialData,
  AdditionalInformation,
  Attachments,
} from "@/components/forms/gestor/natural/perfil";
import { TypographyH1 } from "@/components/shared";
import { IUser } from "@/interfaces";
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
// async function getEmploymentDataIndependent(userCod: string) {
//   const res = await fetch(
//     `${ENV.API_URL}/ocupaciones/independiente/${userCod}`
//   );
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

// async function getEquityDataGp(userCod: string) {
//   const res = await fetch(`${ENV.API_URL}/gestor/propiedades/${userCod}`);
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

// //Error debe traer un array vacio cuando no haya data
// async function getEquityDataVehicles(userCod: string) {
//   const res = await fetch(`${ENV.API_URL}/gestor/vehiculos/${userCod}`);
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

// async function getEquityDataPatrimonies(userCod: string) {
//   const res = await fetch(
//     `${ENV.API_URL}/otros-patrimonios/usuarios/${userCod}`
//   );
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

// async function getEquityDataCr(userCod: string) {
//   const res = await fetch(`${ENV.API_URL}/referencias/usuarios/${userCod}`);
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

// async function getMedium(userCod: string) {
//   const res = await fetch(`${ENV.API_URL}/get-medio/${userCod}`);
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

const ProfileNaturalPage = async () => {
  const user: IUser = await fn.isPermitions({
    userName: "Gestor",
    userType: "natural",
  });

  const spouseUserData = await getSpouseUserData(
    user.user.codigo_usuario?.toString()!
  );
  const employmentData = await getEmploymentData(
    user.user.codigo_usuario?.toString()!
  );
  const propertyData = await getPropertyData(
    user.user.codigo_usuario?.toString()!
  );
  // const employmentDataIndependent = await getEmploymentDataIndependent(
  //   user.user.codigo_usuario?.toString()!
  // );

  // const equityDataGp = await getEquityDataGp(
  //   user.user.codigo_usuario?.toString()!
  // );

  // const equityDataVehicles = await getEquityDataVehicles(
  //   user.user.codigo_usuario?.toString()!
  // );
  // const equityDataPatrimonies = await getEquityDataPatrimonies(
  //   user.user.codigo_usuario?.toString()!
  // );

  // const equityDataCr = await getEquityDataCr(
  //   user.user.codigo_usuario?.toString()!
  // );

  // const medium = await getMedium(user.user.codigo_usuario?.toString()!);

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
      <PatrimonialData user={user} propertyData={propertyData} />
      <AdditionalInformation user={user} />
      <Attachments />
    </div>
  );
};

export default ProfileNaturalPage;
