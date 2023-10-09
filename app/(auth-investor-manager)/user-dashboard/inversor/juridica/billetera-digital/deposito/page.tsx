import { DepositForm } from "@/components/forms/inversor/juridica/billetera-digital/deposito";
import { TypographyH1 } from "@/components/shared";
import { fn } from "@/utils/functions";
import React from "react";

const DigitalWalletDepositNaturalPage = async () => {
  const user = await fn.isPermitions({
    userName: "Inversionista",
    userType: "juridica",
  });
  return (
    <div>
      <TypographyH1
        variant="primary-100"
        className="text-teal uppercase text-center"
      >
        Datos para el Depósito
      </TypographyH1>
      <div className="">
        <p className="text-center pt-10 px-10 pb-10">
          Recuerda que debes realizar el depósito a la cuenta de la empresa y
          así, con los datos que debes indicar, validaremos tu depósito y
          tendrás el saldo disponible en tu Billetera Digital.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-teal">
            <thead>
              <tr className="grid grid-cols-1 sm:table-row">
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre de la Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GOINMUEBLES
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal">
              <tr className="grid grid-cols-1 sm:table-row">
                <td className=" bg-gray-50  px-6 py-4 whitespace-nowrap">
                  Entidad Bancaria
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Banco BBVA Continental
                </td>
              </tr>
              <tr className="grid grid-cols-1 sm:table-row">
                <td className=" bg-gray-50  px-6 py-4 whitespace-nowrap">
                  Cuenta corriente en Dólares (US$)
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  0011-0518-0200081826-86
                </td>
              </tr>
              <tr className="grid grid-cols-1 sm:table-row">
                <td className=" bg-gray-50  px-6 py-4 whitespace-nowrap">
                  Código de Cuenta Interbancario (CCI)
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  011-518-000200081826-86
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-20">
          <DepositForm />
        </div>
      </div>
    </div>
  );
};

export default DigitalWalletDepositNaturalPage;
