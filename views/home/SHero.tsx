"use client";
import { TypographyH1 } from "@/components/shared";
import { Button } from "@/components/ui/button";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import Link from "next/link";

export const SHero = () => {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mt-[-114.92px]"
        grabCursor
      >
        <SwiperSlide>
          <section className="bg-[url(/img/hero.png)] bg-cover bg-no-repeat h-[730px]  grid place-content-center gap-5 px-4">
            <TypographyH1 className="text-center text-white" variant="primary">
              <span className="text-peach-pink">INVIERTE</span>

              <span className="text-[25px] sm:text-[45px] lg:text-[60px] xl:text-[115px] block">
                EN BIENES RAÍCES
              </span>
            </TypographyH1>
            <Link href="/register/inversor" className="mx-auto">
              <Button variant="primary-red">REGÍSTRATE GRATIS</Button>
            </Link>
          </section>
        </SwiperSlide>
        <SwiperSlide>
          <section className="bg-[url(/img/hero.png)] bg-cover bg-no-repeat h-[730px]  grid place-content-center gap-5 px-4">
            <TypographyH1 className="text-center text-white" variant="primary">
              <span className="text-peach-pink">INVIERTE</span>

              <span className="text-[25px] sm:text-[45px] lg:text-[60px] xl:text-[115px] block">
                EN BIENES RAÍCES
              </span>
            </TypographyH1>
            <Link href="/register/inversor" className="mx-auto">
              <Button variant="primary-red">REGÍSTRATE GRATIS</Button>
            </Link>
          </section>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
