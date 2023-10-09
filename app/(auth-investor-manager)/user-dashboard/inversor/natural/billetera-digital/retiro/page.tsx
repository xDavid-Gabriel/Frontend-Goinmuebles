import { RetreatForm } from "@/components/forms/inversor/natural/billetera-digital/retiro";
import { TypographyH1 } from "@/components/shared";
import { fn } from "@/utils/functions";
import React from "react";

const page = async () => {
  const user = await fn.isPermitions({
    userName: "Inversionista",
    userType: "natural",
  });
  return (
    <div>
      <TypographyH1 variant="primary-100" className="text-center">
        RETIRO
      </TypographyH1>
      <p className="text-[20px] text-center">
        RECUERDA QUE: Debes indicar el monto y moneda.
      </p>
      <p className="text-[20px] text-center">
        Al recibir la solicitud enviaremos inmediatamente a nuestro Fideicomiso
      </p>
      <p className="text-[20px] text-center mb-10">
        para que proceda con el Desembolso
      </p>
      <RetreatForm />
    </div>
  );
};

export default page;
