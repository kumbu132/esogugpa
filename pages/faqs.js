import Head from "next/head"
import Image from "next/image"
import { useModules } from "../context/context"
import { useEffect, useState } from "react"
import { fetchFAQs } from "../api"
import FAQ from "../components/FAQ/FAQ"
import Loader from "../components/Loader/Loader"

const FAQs = () => {
  const { setIsHomePage, faqs, setFAQs } = useModules()
  useEffect(() => {
    setIsHomePage(false)
  }, [])

  const [activeFAQ, setActiveFAQ] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchFAQs()
      const { data } = res.data
      setFAQs(data)
      setIsLoading(false)
    }

    if (!faqs.length) {
      try {
        fetchData()
      } catch (error) {}
    } else {
      setIsLoading(false)
    }
  }, [])
  return (
    <div className="FAQs wrapper max-w-screen-md relative">
      <Head>
        <title>ESOGU GNO HESAPLAMA| Sıkça Sorulan Solurarı</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <Loader />}
      <span className="fixed mx-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] opacity-40 pointer-events-none">
        <Image src={"/images/esogu-logo.png"} alt="esogu" width="200" height="200" />
      </span>
      <main className=" w-full pt-[60px] p-3">
        <h1 className="text-3xl my-3 font-bold"> Sıkça Sorulan Solurarı</h1>
        {faqs.map((faq) => {
          const { question, answer } = faq.attributes
          return (
            <div key={faq.id} className="w-full">
              <FAQ
                question={question}
                answer={answer}
                id={faq.id}
                active={activeFAQ}
                setActive={setActiveFAQ}
              />
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default FAQs
