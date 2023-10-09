import { TableProject } from "@/components/forms/gestor/juridica/mis-proyectos";
import { TypographyH1 } from "@/components/shared";
import { IUser } from "@/interfaces";
import { fn } from "@/utils/functions";
import React from "react";

const MyProjectsJuridicaPage = async () => {
  const user: IUser = await fn.isPermitions({
    userName: "Gestor",
    userType: "juridica",
  });
  return (
    <div>
      <TypographyH1
        variant="primary-100"
        className="my-4 text-tomato/80 text-center"
      >
        MIS PROYECTOS
      </TypographyH1>
      <TableProject user={user} />
    </div>
  );
};

export default MyProjectsJuridicaPage;
