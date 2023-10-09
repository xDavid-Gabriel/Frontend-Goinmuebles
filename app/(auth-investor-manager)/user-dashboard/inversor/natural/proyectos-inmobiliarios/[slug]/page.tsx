import {
  Countdown,
  OptimizeImage,
  TypographyH2,
  TypographyH3,
} from "@/components/shared";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fn } from "@/utils/functions";
const projects = [
  {
    title: "DESCRIPCIÓN DEL PROYECTO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum blandit mauris, vitae vehicula velit. Sed ac lacinia nunc. Aenean tincidunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum blandit mauris, vitae vehicula velit. Sed ac lacinia nunc. Aenean tincidunt.",
  },
  {
    title: "CARACTERISTICAS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum blandit mauris, vitae vehicula velit. Sed ac lacinia nunc. Aenean tincidunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum blandit mauris, vitae vehicula velit. Sed ac lacinia nunc. Aenean tincidunt.",
  },
  {
    title: "SITUACIÓN FINANCIERA",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum blandit mauris, vitae vehicula velit. Sed ac lacinia nunc. Aenean tincidunt Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum blandit mauris, vitae vehicula velit. Sed ac lacinia nunc. Aenean tincidunt.",
  },
];

const Page = async ({ params }: { params: { slug: string } }) => {
  const user = await fn.isPermitions({
    userName: "Inversionista",
    userType: "natural",
  });
  return (
    <div>
      {/* CARD DEL DETALLE DE LA IMAGEN */}
      <div className="w-full mx-auto mb-5">
        <div className="flex flex-col sm:flex-row w-full">
          <OptimizeImage
            src="/img/img-card.jpg"
            alt="Card"
            className="h-[380px] sm:h-[395px] w-full sm:w-1/2 object-cover"
          />
          {/* Contenido en el lado derecho */}
          <div className="border border-black w-full sm:w-1/2 relative flex flex-col gap-[30px]">
            {/* Esto permite que el contenido tome la otra mitad del ancho total */}
            <span className="bg-blue-magenta py-4 px-10 text-white block text-center font-body text-[20px]">
              Datos Financieros
            </span>
            {/* Descripcion */}
            <div className="flex flex-col p-[10px_25px_50px_25px] gap-[13px]">
              <div className="flex flex-col gap-[40px]">
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
                  <div className="flex items-end gap-[2px] mb-5">
                    <span className="font-semibold flex-none">
                      Hipoteca 1º Rango
                    </span>
                    <div className="w-full border-t-[1px] border-gray62 h-[1px] border-dashed mb-[7px]"></div>
                    <span className="text-[17px] font-semibold flex-none">
                      10.3%
                    </span>
                  </div>
                  <div className="flex items-center gap-[2px] justify-between flex-wrap">
                    <span className="text-[18px] font-extrabold flex-none break-all">
                      Monto de Inversión
                    </span>

                    <div className="flex gap-5">
                      <span className="text-xl font-semibold px-5 py-2 border-gray62 border-[1px] flex-none">
                        $ 500
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                //className="items-center border-teal hover:text-white inline-flex justify-center transition duration-300 sm:text-[22px] p-[8px_1rem] bg-teal font-bold text-white font-display hover:bg-teal/80 w-fit px-9 py-2 mx-auto disabled:bg-teal/80 col-span-12"
                variant="primary-teal"
                className="w-fit mx-auto"
              >
                INVERTIR
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* SECCION */}
      <div className="mt-12">
        <h1 className="text-[30px] font-extrabold text-center">
          Departamento de ThisCold
        </h1>
        <div className="flex items-center justify-center gap-4 mt-4">
          <OptimizeImage
            src="/img/ubicacion.png"
            alt="Ubicación"
            className="w-[30px]"
          />
          <h2 className="text-[20px] font-extrabold text-center">
            San Borja - Lima, Perú
          </h2>
        </div>

        {/* Cuadro con contenido */}
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-12 mt-12"
        >
          {projects.map((project, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="border-[2px] border-blue-magenta"
            >
              <AccordionTrigger className="px-5 sm:px-10">
                <TypographyH3 className="text-teal">
                  {project.title}
                </TypographyH3>
              </AccordionTrigger>
              <AccordionContent className="px-5 sm:px-10 pb-10">
                {project.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
