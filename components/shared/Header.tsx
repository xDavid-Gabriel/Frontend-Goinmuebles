"use client";
import { FaBars } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useStateAuthContext } from "@/context";

export const Header = () => {
  const { user } = useStateAuthContext();
  // console.log(user);

  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Aquí capturamos la posición del scroll
      setScrollY(window.scrollY);
    };

    // Agregamos el detector del evento de scroll
    window.addEventListener("scroll", handleScroll);

    // No olvides eliminar el detector cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`pt-[41px] pb-[20px] transition duration-300 text-white sticky top-0 z-10 ${
        scrollY > 0 || pathname.length > 1 ? "bg-forest-green" : ""
      }`}
    >
      <div className="container flex justify-between">
        <Link href="/">
          <img
            src="/img/logo.png"
            className="w-[133px] lg:w-[233px]"
            alt="Logo"
          />
        </Link>
        <div
          className={`fixed z-10 top-0 h-screen w-full left-0 transition duration-300 xl:[position:initial] xl:h-[auto] xl:contents ${
            isMenuOpen ? "translate-x-[0]" : "translate-x-[-100%]"
          }`}
        >
          <ul className="bg-forest-green min-h-screen flex flex-col gap-[35px] justify-center xl:flex xl:gap-[65px] xl:min-h-[initial] items-center xl:flex-row xl:bg-transparent font-bold">
            <li>
              <a
                href="#"
                className="hover:text-primary transition duration-300 group"
                onClick={() => setIsMenuOpen((prevState) => !prevState)}
              >
                NOSOTROS
                <hr className="w-0 bg-white group-hover:w-[100%] transition-[width] duration-300" />
              </a>
            </li>

            <li>
              <a
                href="#"
                className="hover:text-primary transition duration-300 group"
                onClick={() => setIsMenuOpen((prevState) => !prevState)}
              >
                NUESTROS PROYECTOS
                <hr className="w-0 bg-white group-hover:w-[100%] transition-[width] duration-300" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary transition duration-300 group"
                onClick={() => setIsMenuOpen((prevState) => !prevState)}
              >
                INVIERTE
                <hr className="w-0 bg-white group-hover:w-[100%] transition-[width] duration-300" />
              </a>
            </li>
            {Object.keys(user.user).length > 0 ? (
              <li>
                Bienvenido:{" "}
                {user.user.nombres ? user.user.nombres : "Persona Jurídica"}
              </li>
            ) : (
              <li className="flex flex-col gap-4 sm:flex-row sm:gap-7">
                <Link href="/register/inversor">
                  <Button
                    variant="outline-100"
                    onClick={() => setIsMenuOpen((prevState) => !prevState)}
                  >
                    REGÍSTRATE
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline-100"
                    onClick={() => setIsMenuOpen((prevState) => !prevState)}
                  >
                    INICIA SESIÓN
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <button
          className="text-white text-2xl z-10 xl:hidden"
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
        >
          {isMenuOpen ? <CgClose /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};
