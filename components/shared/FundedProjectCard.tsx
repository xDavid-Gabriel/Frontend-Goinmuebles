import { OptimizeImage, TypographyH3 } from ".";

export const FundedProjectCard = () => {
  return (
    <div className="grid xl:[grid-template-columns:474px_1fr] max-w-[380px] mx-auto xl:max-w-[initial] xl:mx-0 xl:grid-rows-[308px]">
      <figure className="h-[308px] xl:h-full relative">
        <OptimizeImage
          src="/img/img-card.jpg"
          alt="Proyecto finalizado"
          className="w-full object-cover h-full"
        />
        <button className="py-3 px-6 bg-teal/70 text-white absolute bottom-0 w-full font-medium">
          VER DETALLES
        </button>
      </figure>

      <div className="pt-[62px] pb-[45px] px-4  sm:px-[42px]  2xl:px-[72px] bg-white text-gray62 font-josefin font-medium flex flex-col gap-[15px] relative">
        <span className="block bg-blue-magenta-100 text-white py-2 absolute top-0 left-0 px-8 rounded-br-[18px]">
          FINANCIADO
        </span>
        <div>
          <TypographyH3 className="font-josefin font-medium">
            Departamento de ThisCold
          </TypographyH3>
          <div className="flex gap-3 items-center">
            <OptimizeImage
              src="/img/ubicacion.png"
              alt="Ubicación"
              className="w-[28px]"
            />
            <span className="lg:text-[20px]">San Borja - Lima, Perú</span>
          </div>
        </div>
        <span className="lg:text-[20px]">Modalidad: Renta</span>
        <div className="grid xl:grid-cols-3 gap-5">
          <div className="border-[2px]  border-gray62 py-[10px] px-[20px] flex flex-col items-center">
            Rentabilidad Bruta
            <span className="mt-auto">S/ 135.000</span>
          </div>
          <div className="border-[2px]  border-gray62 py-[10px] px-[20px] flex flex-col items-center">
            Rentabilidad Neta
            <span className="mt-auto">S/ 135.000</span>
          </div>
          <div className="border-[2px]  border-gray62 py-[10px] px-[20px] flex flex-col items-center">
            Frecuencia de pagos
            <span className="mt-auto">1 año</span>
          </div>
        </div>
      </div>
    </div>
  );
};
