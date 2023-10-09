import { TableProject } from "@/components/forms/inversor/juridica/notificaciones";
import { TypographyH1 } from "@/components/shared";
import { IUser } from "@/interfaces";
import { fn } from "@/utils/functions";
import React from "react";

const NotificationsPage = async () => {
  const user: IUser = await fn.isPermitions({
    userName: "Inversionista",
    userType: "juridica",
  });
  return (
    <div>
      <TypographyH1
        variant="primary-100"
        className="my-4 text-teal text-center"
      >
        Notificaciones
      </TypographyH1>
      <TableProject user={user} />
    </div>
  );
};

export default NotificationsPage;
