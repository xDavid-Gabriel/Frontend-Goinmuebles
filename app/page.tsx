import {
  Countdown,
  OptimizeImage,
  TypographyH2,
  TypographyH3,
  Accordion,
} from "@/components/shared";

import { FundedProjectCard } from "@/components/shared/FundedProjectCard";
import { Button } from "@/components/ui/button";

import { SHero } from "@/views/home";
import Link from "next/link";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
// Simulando que obtuviste esta fecha de una API o que ya tienes establecida una fecha de publicación.
const apiDate: string = "2023-08-23T12:00:00Z"; // Fecha de una publicación futura.

const PageHome = async () => {
  return (
    <main>
      <SHero />
      <section className="container mt-10 lg:mt-[70px]">
        <div className="flex flex-col gap-[35px] lg:gap-[50px]">
          <header className="border-[2px] border-tomato rounded-[25px] p-[20px] sm:p-[20px_40px] w-fit mx-auto">
            <TypographyH2 className="text-blue-green">
              PROYECTOS
              <span className="flex items-end ml-[36px] sm:ml-[63px] lg:ml-[90px] gap-2">
                {" "}
                <div className="w-[15px] h-[15px] bg-diagonal mb-[5px] md:mb-[8px]"></div>{" "}
                ABIERTOS
              </span>
            </TypographyH2>
          </header>
          <p className="max-w-[580px] mx-auto text-center">
            Cada uno de los Proyectos Inmobiliarios que aparecen en nuestra
            Plataforma han superado rigurosas revisiones y análisis, que
            incluyen evaluación de proyectos, análisis de riesgos y viabilidad,
            estudio de títulos, estudios de mercado, consulta de centrales de
            riesgos y valuaciones inmobiliarias. (tamaño 30, regular)
          </p>
        </div>
        {/* Cards */}
        <div className="flex flex-wrap gap-[20px] lg:gap-[45px] justify-center mt-12 lg:mt-20 font-josefin">
          {/* Card para cuando falte publicarse */}
          <div className="w-[445px] shadow-2xl">
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
              <Button className="w-fit mx-auto" variant="details">
                VER DETALLE
              </Button>
            </div>
          </div>
          {/* Card para cuando este publicado*/}
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
                  {/* Frecuencia de pagos */}
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
              <Button className="w-fit mx-auto" variant="details">
                VER DETALLE
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-green pt-[40px] pb-[80px] lg:pt-[80px] lg:pb-[140px] text-white mt-[40px] lg:mt-[80px]">
        <div className="container flex flex-col gap-[35px] lg:gap-[50px]">
          <header className="border-[2px] border-peach-pink rounded-[25px] p-[20px] sm:p-[20px_40px] w-fit mx-auto">
            <TypographyH2>
              PROYECTOS
              <span className="flex items-end ml-[36px] sm:ml-[63px] lg:ml-[90px] gap-2">
                {" "}
                <div className="w-[15px] h-[15px] bg-[linear-gradient(to_bottom_right,#457299_50%,red_50%)] mb-[5px] md:mb-[8px]"></div>{" "}
                FINANCIADOS
              </span>
            </TypographyH2>
          </header>
          <p className="max-w-[580px] mx-auto text-center">
            Cada uno de los Proyectos Inmobiliarios que aparecen en nuestra
            Plataforma han superado rigurosas revisiones y análisis, que
            incluyen evaluación de proyectos, análisis de riesgos y viabilidad,
            estudio de títulos, estudios de mercado, consulta de centrales de
            riesgos y valuaciones inmobiliarias.
          </p>
          {/* Proyectos */}
          <div className="flex flex-col gap-10 xl:gap-20">
            {/*  proyecto */}
            <FundedProjectCard />
            <FundedProjectCard />
            <FundedProjectCard />
          </div>
        </div>
      </section>

      <section className="container pt-[40px] lg:pt-[140px]">
        <TypographyH2 className="text-center text-blue-green">
          CÓMO{" "}
          <span className="block relative w-fit mx-auto">
            {" "}
            <OptimizeImage
              className="w-[15px] sm:w-[35px] lg:w-[40px] absolute bottom-0 translate-x-[-120%]"
              src="/img/interrogacion.png"
              alt="Interrogacion"
            />{" "}
            FUNCIONA
            <OptimizeImage
              className="w-[15px] sm:w-[35px] lg:w-[40px] absolute right-0 bottom-0 translate-x-[120%] rotate-[180deg]"
              src="/img/interrogacion.png"
              alt="Interrogacion"
            />{" "}
          </span>{" "}
          GOINMUEBLES
        </TypographyH2>

        <div>
          <div className="font-josefin grid grid-cols-12  text-center max-w-[690px] mx-auto lg:max-w-[915px] xl:max-w-[1010px]">
            {/* Alberto */}
            <div className="mt-[85px] border-[2px] border-tomato rounded-[20px] p-[25px_15px_10px_15px] text-blue-green relative mx-auto col-span-12 max-w-[205px] md:mt-0  md:mx-0 md:max-w-[initial] md:col-[1/5] lg:col-[1/4]  md:before:absolute before:w-[11%] before:top-1/2 before:translate-y-[-50%] before:h-[1px] before:bg-gray62 before:left-0 before:translate-x-[-100%]">
              <OptimizeImage
                alt="Alberto"
                src="/img/empresario.png"
                className="w-[71.5px] absolute top-0 translate-y-[-85%] left-1/2 -translate-x-1/2"
              />
              Él se llama Alberto y es Promotor Inmobiliario
            </div>
            {/* Financiamiento */}
            <div className="border-[2px] border-tomato rounded-[20px] text-blue-green p-[25px_15px_10px_15px] relative mt-[85px] mx-auto col-span-12 max-w-[205px] md:mx-0 md:max-w-[initial] md:col-[2/6] lg:col-[2/5]">
              <div className="hidden md:block w-[30%] h-[186px] border-[1px] [border-color:transparent_transparent_#686868_#686868] absolute top-[-131px] left-[-82px] before:absolute before:w-[7px] before:h-[7px] before:rounded-full before:bg-gray62 before:bottom-0 before:right-0  before:translate-y-[50%] lg:left-[-102px] xl:left-[-112px]"></div>
              <OptimizeImage
                alt="Alberto"
                src="/img/casa.png"
                className="w-[71.5px] absolute top-0 translate-y-[-85%] left-1/2 -translate-x-1/2"
              />
              Busca FINANCIAMIENTO para hacer realidad sus proyectos
              inmobiliarios
            </div>
            {/* Go */}
            <div className="w-full mx-auto col-span-12 max-w-[305px]  lg:max-w-[346px] md:col-[5/9] lg:col-[4/10] relative mt-[45px] md:mt-0">
              <div className="hidden md:block w-[30%] h-[98px] border-[1px] [border-color:transparent_transparent_#686868_#686868] absolute top-[17px] left-[-82px] before:absolute before:w-[7px] before:h-[7px] before:rounded-full before:bg-gray62 before:bottom-0 before:right-0  before:translate-y-[50%] lg:left-[-102px] xl:left-[-112px] lg:h-[153px]"></div>
              <OptimizeImage src="/img/go-circle.png" alt="Goinmuebles" />
              <div className="hidden md:block w-[30%] h-[98px] border-[1px] [border-color:transparent_#686868_#686868_transparent] absolute top-[17px] right-[-82px] before:absolute before:w-[7px] before:h-[7px] before:rounded-full before:bg-gray62 before:bottom-0 before:left-0  before:translate-y-[50%] lg:right-[-102px] xl:right-[-112px] lg:h-[153px]"></div>
            </div>
            {/* Rosa */}
            <div className="mt-[85px] md:mt-0 border-[2px] border-teal rounded-[20px] text-blue-green p-[25px_15px_10px_15px] relative mx-auto col-span-12 max-w-[205px]  md:mx-0 md:row-[1] md:max-w-[initial] md:col-[9/13] lg:col-[10/13] md:before:absolute before:w-[11%] before:top-1/2 before:translate-y-[-50%] before:h-[1px] before:bg-gray62 before:right-0 before:translate-x-[100%]">
              <OptimizeImage
                alt="Alberto"
                src="/img/mujer-de-negocios.png"
                className="w-[71.5px] absolute top-0 translate-y-[-85%] left-1/2 -translate-x-1/2"
              />
              Ella se llama Rosa y es inversionista
            </div>

            {/* Rentabilidad*/}
            <div className="border-[2px] border-teal rounded-[20px] text-blue-green p-[25px_15px_10px_15px] relative mt-[85px] mx-auto col-span-12 max-w-[205px] md:row-[2]  md:mx-0 md:max-w-[initial] md:col-[8/12] lg:col-[9/12]">
              <div className="hidden md:block w-[30%] h-[186px] border-[1px] [border-color:transparent_#686868_#686868_transparent] absolute top-[-131px] right-[-82px] before:absolute before:w-[7px] before:h-[7px] before:rounded-full before:bg-gray62 before:bottom-0 before:left-0  before:translate-y-[50%] lg:right-[-102px] xl:right-[-112px]"></div>
              <OptimizeImage
                alt="Alberto"
                src="/img/billete.png"
                className="w-[71.5px] absolute top-0 translate-y-[-85%] left-1/2 -translate-x-1/2"
              />
              Necesita una RENTABILIDAD ESTABLE y Garantía Hipotecaria
            </div>

            {/* Descripcion Goinmuebles */}
            <div className="border-[2px] border-blue-green rounded-[20px] p-[20px_15px_10px_15px] text-blue-green mx-auto col-span-12 max-w-[305px]  mt-[45px] md:mt-0 lg:max-w-[363px] md:col-[5/9] lg:col-[4/10]">
              Con GOINMUEBLES Carlos financia sus Proyectos Inmobiliarios con el
              aporte de Rosa que busca aumentar su Patrimonio
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-green py-[1.5rem] mt-[40px] lg:mt-[140px]">
        <div className="container grid lg:[grid-template-columns:1fr_min-content_1fr] justify-center gap-[40px] lg:gap-[80px] max-w-[996px]">
          <div className="flex gap-4 text-white items-center">
            <OptimizeImage
              src="/img/estadistica-dolar.png"
              alt="Casa"
              className="w-[50px] sm:w-[100px] lg:w-[150px] flex-none"
            />
            <div>
              <TypographyH3>
                INVIERTE <br /> SEGURO Y FÁCIL
              </TypographyH3>
              <Link href="/register/inversor">
                <Button className="rounded-[14px] border-[2px] border-white text-white bg-teal italic py-1 px-4 hover:bg-teal/80">
                  CON NOSOTROS
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-[70%] h-[5px] lg:w-[5px] lg:h-[200px] bg-white mx-auto"></div>
          <div className="flex gap-4 text-white items-center">
            <OptimizeImage
              src="/img/financia-tu-proyecto.png"
              alt="Casa"
              className="w-[50px] sm:w-[100px] lg:w-[150px] flex-none"
            />
            <div>
              <TypographyH3>
                FINANCIA <br /> TU PROYECTO
              </TypographyH3>
              <Link href="/register/gestor">
                <Button className="rounded-[14px] border-[2px] border-white text-white bg-tomato italic py-1 px-4 hover:bg-tomato/80">
                  CON NOSOTROS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container pt-[40px] lg:pt-[140px]">
        <TypographyH2 className="text-center text-blue-green">
          TIPOS DE <br /> PROYECTOS INMOBILIARIOS
        </TypographyH2>
        <div className="mt-5 max-w-[272px] sm:mt-12 sm:max-w-[385px] md:max-w-[485px]  mx-auto">
          <Accordion />
        </div>
        <div className="grid gap-[20px] xl:gap-0 xl:[grid-template-columns:550px_1fr] items-center font-medium">
          <OptimizeImage
            alt="Inversionista"
            className="max-w-[400px] mx-auto xl:max-w-[initial] xl:h-[710px] w-full object-cover object-top"
            src="/img/saludo-persona.png"
          />
          <div>
            <div className="max-w-[603px] flex flex-col gap-[15px] items-center mx-auto">
              <p className="text-blue-green text-[20px] xl:self-start">
                Como buen inversionista que eres, <br /> recuerda que:{" "}
              </p>
              <div className="border-[2px] p-[20px_40px] border-blue-green italic relative xl:ml-12">
                <div className="text-[25px] xl:text-[45px] text-blue-green bg-white w-6 h-6 xl:w-12 xl:h-12 absolute left-0 top-1/2 -translate-y-1/2 translate-x-[-50%]">
                  <RiDoubleQuotesL />
                </div>
                <div className="text-[25px] xl:text-[45px] text-blue-green bg-white w-6 h-6 xl:w-12 xl:h-12 absolute right-0 top-1/2 -translate-y-1/2 translate-x-[50%]">
                  <RiDoubleQuotesR />
                </div>
                <strong className="text-[25px] xl:text-[35px] text-tomato ">
                  DIVERSIFICAR TU MONTO DE INVERSIÓN
                </strong>{" "}
                <span className="text-blue-green text-[25px] xl:text-[35px]">
                  te ayudará a reducir riesgos y potenciar tus ganancias
                </span>
              </div>
              <p className="text-blue-green text-center w-fit">
                <strong className="text-[25px] xl:text-[35px] block">
                  + de 3125 Inversionistas
                </strong>
                han confiado en nosotros y pudieron <br /> incrementar su
                patrimonio
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageHome;
