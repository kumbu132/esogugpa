import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"
import { useModules } from "../context/context"

const About = () => {
  const { setIsHomePage } = useModules()

  useEffect(() => {
    setIsHomePage(false)
  }, [])
  return (
    <div className="wrapper max-w-screen-md relative">
      <Head>
        <title>ESOGU GNO HESAPLAMA | Hakkında</title>
      </Head>
      <span className="fixed mx-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] opacity-20 pointer-events-none">
        <Image src={"/images/esogu-logo.png"} alt="esogu" width="200" height="200" />
      </span>
      <main className=" w-full pt-[60px] p-3">
        <h1 className="text-3xl my-2 font-bold">Hakkında</h1>
        <div className=" ">
          <p className="text-lg py-2 text-justify">
            Asırlık bir soruna basit bir çözüm - dönem GNO'nızı tahmin etmek! Bu
            uygulama tamamen ücretsizdir ve tamamen bilgilendirme amaçlıdır.
          </p>

          <p className="text-lg py-2 text-justify">
            Bu proje bir öğrencinin kişisel projesi olarak başlasa da projenin açık
            kaynak kodlu olmasına karar verildi. Herkes katkıda bulunabilir.
            GitHub'da bir{" "}
            <span>
              <a className="underline" href="https://github.com/kumbu132/esogugpa">
                PR oluşturmanız
              </a>
            </span>{" "}
            yeterli.
          </p>
        </div>
      </main>
    </div>
  )
}

export default About
