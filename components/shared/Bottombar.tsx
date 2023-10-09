"use client";
import { useStateAuthContext } from "@/context";
import { ISidebarLinks } from "@/interfaces";
import {
  sidebarLinksGestorJuridica,
  sidebarLinksGestorNatural,
  sidebarLinksInversorJuridica,
  sidebarLinksInversorNatural,
} from "@/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaMoneyBill, FaRegUser, FaSuitcase, FaWallet } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsNutFill } from "react-icons/bs";

export const Bottombar = () => {
  const pathname = usePathname();
  const { user } = useStateAuthContext();
  let sidebarLinks: ISidebarLinks[] = [];

  if (user.rol === "Gestor" && user.user.id_persona_rol === "1") {
    sidebarLinks = sidebarLinksGestorNatural;
  }
  if (user.rol === "Gestor" && user.user.id_persona_rol === "2") {
    sidebarLinks = sidebarLinksGestorJuridica;
  }
  if (user.rol === "Inversionista" && user.user.id_persona_rol === "1") {
    sidebarLinks = sidebarLinksInversorNatural;
  }
  if (user.rol === "Inversionista" && user.user.id_persona_rol === "2") {
    sidebarLinks = sidebarLinksInversorJuridica;
  }

  const renderLinks = () => {
    return sidebarLinks.map((link, index) => {
      const isActive =
        (pathname.includes(link.route) && link.route.length > 1) ||
        pathname === link.route;

      return (
        <Link
          href={link.route}
          key={link.title}
          className={`bottombar_link group ${
            user.rol === "Gestor"
              ? "hover:bg-white hover:text-tomato"
              : "hover:bg-white hover:text-teal"
          } ${
            isActive &&
            `bg-white ${user.rol === "Gestor" ? "text-tomato" : "text-teal"} `
          }`}
        >
          <i
            className={`${
              user.rol === "Gestor"
                ? "group-hover:text-tomato"
                : "group-hover:text-teal"
            }`}
          >
            {link.imgURL}
          </i>

          <p className="text-[12px] leading-[16px] font-semibold max-sm:hidden">
            {index === 2 || index === 4
              ? link.title.split(/\s+/)[1]
              : link.title.split(/\s+/)[0]}
          </p>
        </Link>
      );
    });
  };

  let tiposInversor = {
    "1": "natural",
    "2": "juridica",
  };
  let tipoInversor =
    user.rol === "Inversionista"
      ? tiposInversor[user.user?.id_persona_rol as "1" | "2"]
      : "";

  return (
    <nav
      className={`bottombar ${user.rol === "Gestor" ? "bg-tomato" : "bg-teal"}`}
    >
      <ul className="bottombar_container text-white">
        {/* {sidebarLinks.map((link, index) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.title}
              className={`bottombar_link group ${
                user.rol === "Gestor"
                  ? "hover:bg-white hover:text-tomato"
                  : "hover:bg-white hover:text-teal"
              } ${
                isActive &&
                `bg-white ${
                  user.rol === "Gestor" ? "text-tomato" : "text-teal"
                } `
              }`}
            >
              <i
                className={`${
                  user.rol === "Gestor"
                    ? "group-hover:text-tomato"
                    : "group-hover:text-teal"
                }`}
              >
                {link.imgURL}
              </i>

              <p className="text-[12px] leading-[16px] font-semibold max-sm:hidden">
                {index === 2 || index === 4
                  ? link.title.split(/\s+/)[1]
                  : link.title.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })} */}
        {user.rol === "Gestor" &&
        (user.user.id_persona_rol === "1" || user.user.id_persona_rol === "2")
          ? renderLinks()
          : tipoInversor && (
              // Aquí puedes agregar tus propios enlaces para los inversionistas
              <>
                <Link
                  href={`/user-dashboard/inversor/${tipoInversor}/perfil`}
                  className={`bottombar_link hover:bg-white hover:text-teal group ${
                    pathname ===
                      `/user-dashboard/inversor/${tipoInversor}/perfil` &&
                    "bg-white text-teal"
                  }`}
                >
                  <i className="group-hover:text-teal">
                    <FaRegUser />
                  </i>

                  <p className="text-[12px] leading-[16px] font-semibold max-sm:hidden">
                    Perfil
                  </p>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="bottombar_link hover:bg-white hover:text-teal group">
                    <i className="group-hover:text-teal">
                      <FaWallet />
                    </i>

                    <p className="text-[12px] leading-[16px] font-semibold max-sm:hidden">
                      Billetera
                    </p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Billetera digital</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link
                      href={`/user-dashboard/inversor/${tipoInversor}/billetera-digital/deposito`}
                    >
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer group">
                        <i className="group-hover:text-teal transition duration-300">
                          <RiLuggageDepositFill />
                        </i>
                        <p className="group-hover:text-teal transition duration-100">
                          Depósito
                        </p>
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      href={`/user-dashboard/inversor/${tipoInversor}/proyectos-inmobiliarios`}
                    >
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer group">
                        <i className="group-hover:text-teal transition duration-300">
                          <FaMoneyBill />
                        </i>
                        <p className="group-hover:text-teal transition duration-100">
                          Inversión
                        </p>
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      href={`/user-dashboard/inversor/${tipoInversor}/billetera-digital/retiro`}
                    >
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer group">
                        <i className="group-hover:text-teal transition duration-300">
                          <BiMoneyWithdraw />
                        </i>
                        <p className="group-hover:text-teal transition duration-100">
                          Retiro
                        </p>
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      href={`/user-dashboard/inversor/${tipoInversor}/billetera-digital/operaciones`}
                    >
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer group">
                        <i className="group-hover:text-teal transition duration-300">
                          <BsNutFill />
                        </i>
                        <p className="group-hover:text-teal transition duration-100">
                          Operaciones
                        </p>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href={`/user-dashboard/inversor/${tipoInversor}/proyectos-inmobiliarios`}
                  className="bottombar_link hover:bg-white hover:text-teal group"
                >
                  <i className="group-hover:text-teal">
                    <FaSuitcase />
                  </i>

                  <p className="text-[12px] leading-[16px] font-semibold max-sm:hidden">
                    Proyectos
                  </p>
                </Link>
                <Link
                  href={`/user-dashboard/inversor/${tipoInversor}/notificaciones`}
                  className="bottombar_link hover:bg-white hover:text-teal group"
                >
                  <i className="group-hover:text-teal">
                    <IoNotifications />
                  </i>

                  <p className="text-[12px] leading-[16px] font-semibold max-sm:hidden">
                    Notificaciones
                  </p>
                </Link>
                {/* ... */}
              </>
            )}
      </ul>
    </nav>
  );
};
