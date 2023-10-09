"use client";

import { useData } from "@/hooks";

export interface IOperations {
  tipo: Tipo;
  monto: string;
  fecha: Date;
  descripcion: Descripcion;
  boletaImagen: string;
  estado: string;
}

export enum Descripcion {
  Depositando = "Depositando",
  MiPrimerDeposito = "Mi primer deposito",
  MiPrimerDepositoDadasd = "Mi primer deposito dadasd",
  MiPrimerDepositoWWW = "Mi primer deposito www",
}

export enum Tipo {
  Deposito = "deposito",
}

export const OperationsData = () => {
  const { data: operations, isLoading: isOperations } = useData<IOperations[]>(
    `https://api.goinmuebles.com/api/transacciones-aprobadas/PJ0009`
  );

  return (
    <>
      {operations?.map((operation, index) => (
        <div className="mb-20" key={index}>
          <p className="bg-teal px-10 w-fit py-2 text-white text-center">
            {/* 05 de Setiembre */}
            {new Date(operation.fecha).toLocaleDateString()}
          </p>
          <div className="grid sm:grid-cols-3 content-center rounded-none shadow-md">
            <div className="col-span-2 px-4 sm:px-10 py-4 sm:py-10">
              <p className="text-xl sm:text-2xl lg:text-[30px]">
                {operation.descripcion}
              </p>
              <p className="text-lg sm:text-xl">{operation.tipo}</p>
            </div>
            <div className="font-extrabold text-2xl sm:text-4xl lg:text-[50px] justify-self-center sm:justify-self-center sm:self-center">
              <p>$ {operation.monto}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
