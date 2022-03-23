import { useEffect } from "react"
import { useRouter } from "next/router"
import * as ga from "../lib/ga"
import { ModulesProvider } from "../context/context"
import Layout from "../components/layout"
import "../styles/global.css"
export default function App({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  return (
    <ModulesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModulesProvider>
  )
}
