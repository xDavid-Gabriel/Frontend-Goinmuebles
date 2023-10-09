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
export interface IMyProjects {
  inmuebles_id: string;
  compra_venta: string;
  inmueble: Inmueble;
}

export interface Inmueble {
  id: number;
  titulo: string;
  tipo_inversion_id: string;
  id_tipo: string;
  id_departamento_propiedad: string;
  id_provincia_propiedad: string;
  id_distrito_propiedad: string;
  tipo_inmueble: TipoIn;
  tipo_inversion: TipoIn;
  departamento_propiedad: Propiedad;
  provincia_propiedad: Propiedad;
  distrito_propiedad: Propiedad;
}

export interface Propiedad {
  id: number;
  nombre: string;
}

export interface TipoIn {
  id: number;
  nombres: string;
}

interface Props {
  user: IUser;
}
export const TableProject = ({ user }: Props) => {
  //Traer los departamentos
  const { data: myProjects, isLoading: isMyProjects } = useData<IMyProjects[]>(
    `https://api.goinmuebles.com/api/mis-proyectos/PJ0009`
  );

  return (
    <Table className="relative">
      <TableHeader>
        <TableRow className="bg-tomato hover:bg-tomato/80">
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            TÍTULO DEL <br /> PROYECTO
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            TÍTULO DE <br /> INMUEBLE
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            TIPO DE INVERSIÓN
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            PRECIO DE <br /> COMPRA VENTA
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            DEPARTAMENTO
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            PROVINCIA
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            DISTRITO
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            FECHA DE <br /> PUBLICACIÓN
          </TableHead>
          <TableHead className="text-white text-center whitespace-nowrap px-6 py-3 uppercase tracking-wider text-xs">
            ESTADO
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {myProjects?.map((project) => (
          <TableRow key={project.inmuebles_id}>
            <TableCell className="font-medium whitespace-nowrap">
              {project.inmueble.titulo}
            </TableCell>
            <TableCell className="font-medium whitespace-nowrap">
              {project.inmueble.tipo_inmueble.nombres}
            </TableCell>
            <TableCell className="font-medium whitespace-nowrap">
              {project.inmueble.tipo_inversion.nombres}
            </TableCell>
            <TableCell className="font-medium whitespace-nowrap">
              {project.compra_venta}
            </TableCell>

            <TableCell className="font-medium whitespace-nowrap">
              {project.inmueble.departamento_propiedad.nombre}
            </TableCell>
            <TableCell className="font-medium whitespace-nowrap">
              {project.inmueble.provincia_propiedad.nombre}
            </TableCell>
            <TableCell className="font-medium whitespace-nowrap">
              {project.inmueble.distrito_propiedad.nombre}
            </TableCell>
            <TableCell className="font-medium whitespace-nowrap">-</TableCell>
            <TableCell className="font-medium whitespace-nowrap">
              Pendiente
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // <div className="overflow-x-auto">
    //   <table className="min-w-full divide-y divide-gray-200">
    //     <thead className="text-white bg-tomato hover:bg-tomato/80 transition duration-300">
    //       <tr>
    //         <th className="px-6 text-center py-3  text-xs font-medium uppercase tracking-wider whitespace-nowrap">
    //           TÍTULO DEL <br /> PROYECTO
    //         </th>
    //         <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap">
    //           TÍTULO DE <br /> INMUEBLE
    //         </th>
    //         <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap">
    //           TIPO DE INVERSIÓN
    //         </th>
    //         <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap">
    //           PRECIO DE <br /> COMPRA VENTA
    //         </th>

    //         <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap">
    //           DEPARTAMENTO
    //         </th>

    //         <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap">
    //           PROVINCIA
    //         </th>

    //         <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap">
    //           DISTRITO
    //         </th>

    //         <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap">
    //           FECHA DE <br /> PUBLICACIÓN
    //         </th>
    //         <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap">
    //           ESTADO
    //         </th>

    //         {/* <!-- Agrega más encabezados según sea necesario --> */}
    //       </tr>
    //     </thead>
    //     <tbody className="bg-white divide-y divide-gray-200">
    //       {/* <!-- Filas de datos --> */}
    //       {myProjects?.map((project) => (
    //         <tr key={project.inmuebles_id}>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {project.inmueble.titulo}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {project.inmueble.tipo_inmueble.nombres}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {project.inmueble.tipo_inversion.nombres}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {project.compra_venta}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {project.inmueble.departamento_propiedad.nombre}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {project.inmueble.provincia_propiedad.nombre}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">
    //             {project.inmueble.distrito_propiedad.nombre}
    //           </td>
    //           <td className="px-6 py-4 whitespace-nowrap">-</td>
    //           <td className="px-6 py-4 whitespace-nowrap">Pendiente</td>

    //           {/* <!-- Agrega más celdas de datos según sea necesario --> */}
    //         </tr>
    //       ))}

    //       {/* <!-- Agrega más filas de datos según sea necesario --> */}
    //     </tbody>
    //   </table>
    // </div>
  );
};
