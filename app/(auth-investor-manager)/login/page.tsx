import { Login } from "@/components/forms/login";
import { OptimizeImage } from "@/components/shared";
import React from "react";

const LoginPage = () => {
  return (
    <section className="container py-[100px] lg:py-[200px]">
      <div className="bg-light-sky-blue max-w-[500px] rounded-[25px] mx-auto p-[100px_20px_20px_20px] relative">
        <OptimizeImage
          alt="User"
          src="/img/usuario.png"
          className="w-[120px] h-[120px] absolute top-0 translate-y-[-50%] left-1/2 translate-x-[-50%]"
        />
        <Login />
      </div>
    </section>
  );
};

export default LoginPage;
