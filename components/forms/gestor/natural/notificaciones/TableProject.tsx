"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData } from "@/hooks";
import { IUser } from "@/interfaces";
import React from "react";

export interface INotifications {
  id: number;
  usuario_id: string;
  inmueble_id: null | string;
  titulo: string;
  mensaje: string;
  tipo: string;
  estado: string;
  fecha_creacion: Date;
  link: null;
  tipo_notificacion_id: null;
  created_at: Date;
  updated_at: Date;
}

interface Props {
  user: IUser;
}
export const TableProject = ({ user }: Props) => {
  //Traer los departamentos
  const { data: notifications, isLoading: isNotifications } = useData<
    INotifications[]
  >(`https://api.goinmuebles.com/api/notificaciones/mail/PJ0001`);

  return (
    <Table className="relative">
      <TableHeader>
        <TableRow className="bg-tomato hover:bg-tomato/80">
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            TÍTULO
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            DESCRIPCIÓN
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            FECHA
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notifications?.map((notification) => (
          <TableRow key={notification.id}>
            <TableCell className="font-medium whitespace-nowrap">
              <div className="flex gap-3 items-center">
                <img
                  src="/img/go-para-correo.png"
                  className="w-9 h-9 rounded-full"
                  alt="go"
                />

                {notification.titulo}
              </div>
            </TableCell>
            <TableCell className="font-medium whitespace-nowrap">
              {notification.mensaje}
            </TableCell>
            <TableCell className="font-medium whitespace-nowrap">
              {new Date(notification.fecha_creacion).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
