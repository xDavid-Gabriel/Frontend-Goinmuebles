"use client";

import { Countdown, OptimizeImage } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useData } from "@/hooks";
import { ENV } from "@/utils";
import Link from "next/link";
const apiDate: string = "2023-08-23T12:00:00Z"; // Fecha de una publicación futura.
export interface IRealEstate {
  id: number;
  codigoUsuario: string;
  titulo: string;
  descripcion: null;
  resumenNegocio: string;
  estudioMercado: string;
  fechaInicioRecaudacion: null;
  urlYoutube: null;
  idTipo: string;
  idOperacion: null;
  idDepartamentoPropiedad: string;
  idProvinciaPropiedad: string;
  idDistritoPropiedad: string;
  direccion: string;
  referencia: string;
  tipoMapa: null;
  lat: null;
  lng: null;
  southwest: null;
  tipoInversionID: string;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
}

export const RealEstateProjects = () => {
  const { data: realEstateData, isLoading: isLoadingRealEstateData } = useData<
    IRealEstate[]
  >(`${ENV.API_URL}/${ENV.ENDPOINTS.REAL_ESTATE_LIST}`);
  return (
    <>
      {realEstateData?.map((realEstate) => (
        <div className="w-[445px] shadow-2xl" key={realEstate.id}>
          <span className="bg-forest-green py-2 px-8 text-white block text-center font-body">
            Modalidad: Ganancia de Capital
          </span>
          <OptimizeImage
            src="/img/img-card.jpg"
            alt="Card"
            className="h-[280px] w-full object-cover"
          />
          {/* Contador de dias */}
          <Countdown publishDate={apiDate} />
          <div className="p-[20px_15px_60px_15px] relative flex flex-col gap-[30px]">
            <span className="bg-gray62 text-white absolute top-0 left-0 p-[6px_30px] rounded-br-[15px]">
              En Estudio
            </span>
            <div className="flex flex-col items-center gap-2">
              <OptimizeImage
                src="/img/ubicacion.png"
                alt="Ubicación"
                className="w-[85px]"
              />
              <span className="font-medium text-[20px]">
                San Borja - Lima, Perú{" "}
              </span>
            </div>
            {/* Descripcion */}
            <div className="flex flex-col gap-[40px]">
              <div className="flex items-end">
                <span className="font-semibold text-[24px]">Monto: </span>
                <div className="h-[2px] bg-teal w-full "></div>
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-end gap-[2px]">
                  <span className="font-semibold flex-none">
                    Plazo Estimado
                  </span>
                  <div className="w-full border-t-[1px] border-gray62 h-[1px] border-dashed mb-[7px]"></div>
                  <span className="text-[17px] font-semibold flex-none">
                    US$ 900,000{" "}
                  </span>
                </div>

                <div className="flex items-end gap-[2px]">
                  <span className="font-semibold flex-none">
                    Rentabilidad Estimada
                  </span>
                  <div className="w-full border-t-[1px] border-gray62 h-[1px] border-dashed mb-[7px]"></div>
                  <span className="text-[17px] font-semibold flex-none">
                    10.3%
                  </span>
                </div>
                <div className="flex items-end gap-[2px]">
                  <span className="font-semibold flex-none">
                    Frecuencia de pagos
                  </span>
                  <div className="w-full border-t-[1px] border-gray62 h-[1px] border-dashed mb-[7px]"></div>
                  <span className="text-[17px] font-semibold flex-none">
                    10.3%
                  </span>
                </div>
                <div className="flex items-end gap-[2px]">
                  <span className="font-semibold flex-none">
                    Hipoteca 1° Rango
                  </span>
                  <div className="w-full border-t-[1px] border-gray62 h-[1px] border-dashed mb-[7px]"></div>
                  <span className="text-[17px] font-semibold flex-none">
                    10.3%
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/user-dashboard/inversor/natural/proyectos-inmobiliarios/detalle"
              className="mx-auto"
            >
              <Button className="w-fit " variant="details">
                VER DETALLE
              </Button>
            </Link>
          </div>
        </div>
      ))}
      <div className="w-[445px] shadow-2xl">
        <span className="bg-blue-magenta py-2 px-8 text-white block text-center font-body">
          Modalidad: Renta
        </span>
        <OptimizeImage
          src="/img/img-card.jpg"
          alt="Card"
          className="h-[280px] sm:h-[395px] w-full object-cover"
        />

        <div className="p-[20px_15px_60px_15px] relative flex flex-col gap-[30px]">
          <span className="bg-gray62 text-white absolute top-0 left-0 p-[6px_30px] rounded-br-[15px]">
            En Recaudación
          </span>
          <div className="flex flex-col items-center gap-2">
            <OptimizeImage
              src="/img/ubicacion.png"
              alt="Ubicación"
              className="w-[85px]"
            />
            <span className="font-medium text-[20px]">
              San Borja - Lima, Perú{" "}
            </span>
          </div>
          Descripcion
          <div className="flex flex-col gap-[40px]">
            <div className="flex items-end">
              <span className="font-semibold text-[24px]">Monto: </span>
              <div className="h-[2px] bg-teal w-full "></div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-end gap-[2px]">
                <span className="font-semibold flex-none">Plazo Estimado</span>
                <div className="w-full border-t-[1px] border-gray62 h-[1px] border-dashed mb-[7px]"></div>
                <span className="text-[17px] font-semibold flex-none">
                  US$ 900,000{" "}
                </span>
              </div>
              <div className="flex items-end gap-[2px]">
                <span className="font-semibold flex-none">
                  Rentabilidad Bruta
                </span>
                <div className="w-full border-t-[1px] border-gray62 h-[1px] border-dashed mb-[7px]"></div>
                <span className="text-[17px] font-semibold flex-none">
                  10.3%
                </span>
              </div>
              <div className="flex items-end gap-[2px]">
                <span className="font-semibold flex-none">
                  Rentabilidad Neta
                </span>
                <div className="w-full border-t-[1px] border-gray62 h-[1px] border-dashed mb-[7px]"></div>
                <span className="text-[17px] font-semibold flex-none">
                  10.3%
                </span>
              </div>
              Frecuencia de pagos
              <div className="flex items-center gap-[2px] justify-between flex-wrap">
                <span className="font-semibold flex-none break-all">
                  Frecuencia de Pagos:
                </span>

                <div className="flex gap-2">
                  <span className="text-xs px-1 border-gray62 border-[1px] flex-none">
                    3 meses
                  </span>
                  <span className="text-xs px-1 border-gray62 border-[1px] flex-none">
                    6 meses
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/user-dashboard/inversor/natural/proyectos-inmobiliarios/detalle"
            className="mx-auto"
          >
            <Button className="w-fit " variant="details">
              VER DETALLE
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
