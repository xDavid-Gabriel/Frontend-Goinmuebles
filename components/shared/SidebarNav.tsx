"use client";

import Link from "next/link";
import {
  sidebarLinksGestorNatural,
  sidebarLinksGestorJuridica,
  sidebarLinksInversorJuridica,
  sidebarLinksInversorNatural,
} from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import { HiLogin } from "react-icons/hi";
import { useStateAuthContext } from "@/context";
import { ISidebarLinks } from "@/interfaces";
import { FaMoneyBill, FaRegUser, FaSuitcase, FaWallet } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsNutFill } from "react-icons/bs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RiLuggageDepositFill } from "react-icons/ri";

export function SidebarNav() {
  const router = useRouter();

  const { user, logout } = useStateAuthContext();
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

  const pathname = usePathname();
  const renderLinks = () => {
    return sidebarLinks.map((link) => {
      const isActive =
        (pathname.includes(link.route) && link.route.length > 1) ||
        pathname === link.route;

      return (
        <Link
          href={link.route}
          key={link.title}
          className={`relative flex justify-start items-center gap-4 rounded-lg p-4 text-[17px] group ${
            user.rol === "Gestor"
              ? "hover:bg-white hover:text-tomato"
              : "hover:bg-white hover:text-teal"
          } ${
            isActive &&
            `bg-white ${user.rol === "Gestor" ? "text-tomato" : "text-teal"} `
          }`}
        >
          <i
            className={`text-xl ${
              // isActive ? "text-tomato" : "text-white"
              user.rol === "Gestor"
                ? "group-hover:text-tomato"
                : "group-hover:text-teal"
            }`}
          >
            {link.imgURL}
          </i>
          <p className="hidden xl:block">{link.title}</p>
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
    <aside
      className={`custom-scrollbar sticky left-0 top-0  flex h-screen w-fit flex-col justify-between overflow-auto border-r pb-5 pt-28 max-md:hidden ${
        user.rol === "Gestor" && "border-r-tomato/60 bg-tomato"
      } ${user.rol === "Inversionista" && "border-r-teal/60 bg-teal"}`}
    >
      <div className="flex w-full flex-1 flex-col gap-6 px-6 xl:pl-14 xl:pr-20 text-white">
        {/* {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.title}
              className={`relative flex justify-start items-center gap-4 rounded-lg p-4 text-[17px] group ${
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
                className={`text-xl ${
                  // isActive ? "text-tomato" : "text-white"
                  user.rol === "Gestor"
                    ? "group-hover:text-tomato"
                    : "group-hover:text-teal"
                }`}
              >
                {link.imgURL}
              </i>

              <p className="hidden xl:block">{link.title}</p>
            </Link>
          );
        })} */}
        {user.rol === "Gestor" &&
        (user.user.id_persona_rol === "1" || user.user.id_persona_rol === "2")
          ? renderLinks()
          : // Aquí puedes agregar tus propios enlaces para los inversionistas
            tipoInversor && (
              <>
                <Link
                  href={`/user-dashboard/inversor/${tipoInversor}/perfil`}
                  className={`flex items-center gap-4 rounded-lg p-4 text-[17px] hover:bg-white hover:text-teal justify-center xl:justify-start group ${
                    pathname ===
                      `/user-dashboard/inversor/${tipoInversor}/perfil` &&
                    "bg-white text-teal"
                  }`}
                >
                  <i className="text-xl group-hover:text-teal">
                    <FaRegUser />
                  </i>
                  <p className="hidden xl:block">Perfil</p>
                </Link>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger
                      className={`relative flex justify-start items-center gap-4 rounded-lg p-4 text-[17px] hover:bg-white hover:text-teal group ${
                        pathname.includes("billetera-digital") &&
                        "bg-white text-teal"
                      }`}
                    >
                      <i className="text-xl group-hover:text-teal">
                        <FaWallet />
                      </i>
                      <p className="hidden xl:block">Billetera digital</p>
                    </AccordionTrigger>
                    <AccordionContent className="xl:w-[244.41px]">
                      <ul className="my-2 px-4 flex flex-col gap-4">
                        <li>
                          <Link
                            href={`/user-dashboard/inversor/${tipoInversor}/billetera-digital/deposito`}
                            className={`py-2 px-4 hover:bg-white hover:text-teal rounded-lg w-fit flex items-center gap-2 ${
                              pathname ===
                                `/user-dashboard/inversor/${tipoInversor}/billetera-digital/deposito` &&
                              "bg-white text-teal"
                            }`}
                          >
                            <RiLuggageDepositFill />
                            <p className="hidden xl:block">Depósito</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/user-dashboard/inversor/${tipoInversor}/proyectos-inmobiliarios`}
                            className="py-2 px-4 hover:bg-white hover:text-teal rounded-lg w-fit flex items-center gap-2"
                          >
                            <FaMoneyBill />
                            <p className="hidden xl:block">Inversión</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/user-dashboard/inversor/${tipoInversor}/billetera-digital/retiro`}
                            className={`py-2 px-4 hover:bg-white hover:text-teal rounded-lg w-fit flex items-center gap-2 ${
                              pathname ===
                                `/user-dashboard/inversor/${tipoInversor}/billetera-digital/retiro` &&
                              "bg-white text-teal"
                            }`}
                          >
                            <BiMoneyWithdraw />
                            <p className="hidden xl:block">Retiro</p>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/user-dashboard/inversor/${tipoInversor}/billetera-digital/operaciones`}
                            className={`py-2 px-4 hover:bg-white hover:text-teal rounded-lg w-fit flex items-center gap-2 ${
                              pathname ===
                                `/user-dashboard/inversor/${tipoInversor}/billetera-digital/operaciones` &&
                              "bg-white text-teal"
                            }`}
                          >
                            <BsNutFill />
                            <p className="hidden xl:block">Operaciones</p>
                          </Link>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  {/* <Link
              href="/tu-enlace-personalizado-1"
              className="relative flex justify-start items-center gap-4 rounded-lg p-4 text-[17px] hover:bg-white hover:text-teal group"
            >
              <i className="text-xl group-hover:text-teal">
                <FaWallet />
              </i>
              <p className="hidden xl:block">Billetera digital</p>
            </Link> */}
                </Accordion>
                <Link
                  href={`/user-dashboard/inversor/${tipoInversor}/proyectos-inmobiliarios`}
                  className={`flex items-center gap-4 rounded-lg p-4 text-[17px] hover:bg-white hover:text-teal justify-center xl:justify-start group ${
                    pathname ===
                      `/user-dashboard/inversor/${tipoInversor}/proyectos-inmobiliarios` &&
                    "bg-white text-teal"
                  }`}
                >
                  <i className="text-xl group-hover:text-teal">
                    <FaSuitcase />
                  </i>
                  <p className="hidden xl:block">Proyectos inmobiliarios</p>
                </Link>
                <Link
                  href={`/user-dashboard/inversor/${tipoInversor}/notificaciones`}
                  className={`flex items-center gap-4 rounded-lg p-4 text-[17px] hover:bg-white hover:text-teal justify-center xl:justify-start group ${
                    pathname ===
                      `/user-dashboard/inversor/${tipoInversor}/notificaciones` &&
                    "bg-white text-teal"
                  }`}
                >
                  <i className="text-xl group-hover:text-teal">
                    <IoNotifications />
                  </i>
                  <p className="hidden xl:block">Notificaciones</p>
                </Link>

                {/* ... */}
              </>
            )}
      </div>

      <button
        className="mt-10 px-6 text-white flex items-center gap-2 justify-center lg:justify-start"
        onClick={() => {
          logout();
          router.push("/");
        }}
      >
        <i className="text-[25px]">
          <HiLogin />
        </i>
        <p className="hidden xl:block">Sing In</p>
      </button>
    </aside>
  );
}
