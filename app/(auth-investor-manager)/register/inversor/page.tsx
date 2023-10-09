"use client";
import {
  RegisterPersonNormal,
  RegisterPersonJuridica,
} from "@/components/forms/register";
import { OptimizeImage } from "@/components/shared";
import { useToggle } from "@/hooks";
import Link from "next/link";

const PageRegisterInversor = () => {
  const { state: isPersonJuridica, toggle } = useToggle();

  return (
    <>
      <section className="relative xl:h-[1000px] xl:flex xl:items-center">
        <figure className="relative xl:absolute top-0 h-[350px] xl:h-full right-0 w-full xl:w-[40%] 2xl:w-[45%]">
          <OptimizeImage
            alt="Goinmuebles"
            src="/img/img-card.jpg"
            className="w-full h-full object-cover"
          />
          <div className="bg-light-sky-blue/80 absolute inset-0"></div>
          <figure className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] max-w-[230px] xl:max-w-[350px]">
            <OptimizeImage src="/img/logo-vertical-go.png" alt="Goinmuebles" />
            <p className="font-josefin text-black text-center text-[20px] sm:text-[25px] 2xl:text-[35px]">
              Te da la bienvenida
            </p>
          </figure>
        </figure>
        <div className="container">
          <div className="p-[30px_20px] my-[50px] mx-auto rounded-[20px] border-[1px] border-gray62 max-w-[700px] relative flex flex-col gap-6 shadow-2xl sm:my-[75px] xl:mx-0">
            <ul className="flex gap-1 top-0 absolute translate-y-[-100%] ">
              <li>
                <Link
                  href="/register/inversor"
                  className="bg-teal text-[13px] pt-1 px-4 sm:px-6 rounded-[12px_12px_0_0] font-bold [letter-spacing:1px] text-white sm:text-[16px]"
                >
                  INVERSOR
                </Link>
              </li>
              <li>
                <Link
                  href="/register/gestor"
                  className="bg-gray62/40 text-[13px] transition duration-300 hover:bg-tomato/80 pt-1 px-4 sm:px-6 rounded-[12px_12px_0_0] font-bold [letter-spacing:1px] text-white sm:text-[16px]"
                >
                  GESTOR
                </Link>
              </li>
            </ul>
            <h1 className="text-blue-green text-[25px] sm:text-[30px] font-extrabold">
              REGISTRO
            </h1>
            {isPersonJuridica ? (
              <RegisterPersonJuridica
                onChangeToJuridica={toggle}
                styleCheckBox="border-teal/80 focus-visible:ring-teal/80 data-[state=checked]:bg-teal/80"
                userType="inversor"
              />
            ) : (
              <RegisterPersonNormal
                onChangeToFisica={toggle}
                styleCheckBox="border-teal/80 focus-visible:ring-teal/80 data-[state=checked]:bg-teal/80"
                userType="inversor"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PageRegisterInversor;
