import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans, Inter, Josefin_Sans } from "next/font/google";
import { Header, OptimizeImage, TypographyH3 } from "@/components/shared";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { ContactUsAt } from "@/components/forms";
import { AuthProvider } from "@/context/auth";
import { ProjectProvider } from "@/context/project";
// import { SWRConfig } from "swr";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});
const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});
const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Goinmuebles",
  description: "Descripción de Goinmuebles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${nunito_sans.variable} ${josefin_sans.variable}`}
    >
      <body>
        <AuthProvider>
          <ProjectProvider>
            <Header />
            <>{children}</>
            <footer className="bg-forest-green py-[40px] md:py-[80px] text-white">
              <div className="container grid md:grid-cols-2 gap-[35px] md:gap-[70px]">
                <div className="flex flex-col gap-[45px]">
                  <div className="flex flex-col gap-[10px]">
                    <TypographyH3>CONTACTO</TypographyH3>
                    <hr className="bg-white h-[4px] w-[35%]" />
                    <ul className="flex flex-col gap-[15px]">
                      <li>
                        <a href="#" className="flex gap-[15px] items-center">
                          <OptimizeImage
                            alt="Whatsapp"
                            src="/img/whatsapp.png"
                            className="w-[30px]"
                          />
                          999999999
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex gap-[15px] items-center">
                          <OptimizeImage
                            alt="Correo"
                            src="/img/correo.png"
                            className="w-[30px]"
                          />
                          info@goinmuebles.com
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex gap-[15px] items-center">
                          <OptimizeImage
                            alt="Ubicacion"
                            src="/img/marcador-de-posicion.png"
                            className="w-[30px]"
                          />
                          Av. Manuel Olguín 325 Of. 904 (Torre Olguín +)
                          Santiago de Surco – Lima
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <TypographyH3>SÍGUENOS EN</TypographyH3>
                    <hr className="bg-white h-[4px] w-[35%]" />
                    <ul className="flex gap-5">
                      <li>
                        <a
                          href="https://www.facebook.com/Goinmueblesperu"
                          target="_blank"
                        >
                          <i className="text-[50px]">
                            <FaFacebook />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="text-[50px]">
                            <FaInstagram />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/@goinmuebles8019"
                          target="_blank"
                        >
                          <i className="text-[50px]">
                            <FaYoutube />
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <ContactUsAt />
              </div>
            </footer>
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
{
  /* <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
</SWRConfig> */
}
