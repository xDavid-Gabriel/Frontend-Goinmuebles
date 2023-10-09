import { TableProject } from "@/components/forms/gestor/natural/notificaciones";
import { TypographyH1 } from "@/components/shared";
import { IUser } from "@/interfaces";
import { fn } from "@/utils/functions";
import React from "react";

const NotificationsNaturalPage = async () => {
  const user: IUser = await fn.isPermitions({
    userName: "Gestor",
    userType: "natural",
  });
  return (
    <div>
      <TypographyH1
        variant="primary-100"
        className="my-4 text-tomato/80 text-center"
      >
        Notificaciones
      </TypographyH1>
      <TableProject user={user} />
    </div>
  );
};

export default NotificationsNaturalPage;
