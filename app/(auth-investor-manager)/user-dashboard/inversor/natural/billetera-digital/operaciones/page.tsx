import { OperationsData } from "@/components/forms/inversor/natural/billetera-digital/operaciones";
import { TypographyH1 } from "@/components/shared";
import { fn } from "@/utils/functions";
import React from "react";

const OperationsPage = async () => {
  const user = await fn.isPermitions({
    userName: "Inversionista",
    userType: "natural",
  });
  return (
    <div>
      <TypographyH1
        variant="primary-100"
        className="text-teal text-center uppercase"
      >
        Mis Operaciones
      </TypographyH1>
      <div className="px-4 sm:px-0">
        <p className="text-xl sm:text-2xl font-extrabold text-blue-green text-center mb-8">
          Últimos Movimientos
        </p>
        <OperationsData />
      </div>
    </div>
  );
};

export default OperationsPage;
