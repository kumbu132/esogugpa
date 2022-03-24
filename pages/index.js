//TO-DO
//Header will have add ders, remove ders, ders sayi, question mark for help, and language settings
// alerts for incomplete form, and can't calculate if there are no modules
// Results modal
// localisation
// FAQs
// animations
// get in touch form
// deleteaspressed unnecessary?
// fonts
// faw page and contact page will have "Calculate GPA!/GNO Hesaplaya! button in nav to take them back to home"
// SEO SEO SEO SEO SEO SEO SEO SEO SEO SEO SEO SEO
//when changing set value
import { useModules } from "../context/context"
import { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import ModuleCard from "../components/ModuleCard/ModuleCard"
import { fetchDepartmentModules } from "../api"

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center absolute top-0 left-0 h-screen z-50 bg-white w-screen">
      <div className="h-[100px] w-[100] animate-spin">
        <Image src="/images/loader.svg" alt="loading" width="100" height="100" />
      </div>
      <h1>Loading...</h1>
    </div>
  )
}

export default function Home() {
  const { selectedModules, setIsHomePage, departmentModules, setDepartmentModules } =
    useModules()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsHomePage(true)
  }, [])

  useEffect(() => {
    const fetchModules = async () => {
      const res = await fetchDepartmentModules()
      setDepartmentModules(res.data.data)
      setIsLoading(false)
      console.log({ dep: res.data.data })
    }

    if (departmentModules.length) {
      setIsLoading(false)
    } else {
      try {
        fetchModules()
      } catch (error) {}
    }
  }, [])

  return (
    <div className="wrapper max-w-screen-md relative">
      <Head>
        <title>ESOGU GNO HESAPLAMA</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Bu dönem için GNO'nızı kolay ve hızlı bir şekilde hesaplayın!"
        />
      </Head>
      <span className="fixed mx-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] opacity-20 pointer-events-none">
        <Image src={"/images/esogu-logo.png"} alt="esogu" width="200" height="200" />
      </span>
      {isLoading && <Loader />}
      <main className=" w-full pt-[60px]">
        {selectedModules.map((module) => (
          <ModuleCard
            key={module.id}
            id={module.id}
            moduleID={module.moduleID}
            moduleName={module.moduleName}
            credits={module.credits}
            grade={module.grade}
            akts={module.akts}
            isComplete={module.complete}
            firstLoad={module.firstLoad}
            deleteThisModule={module.deleteThisModule}
          />
        ))}
      </main>
    </div>
  )
}
