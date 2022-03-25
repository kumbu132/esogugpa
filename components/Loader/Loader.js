import Image from "next/image"

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center fixed mx-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-screen z-50 bg-white w-screen">
      <div className="h-[100px] w-[100] animate-spin">
        <Image src="/images/loader.svg" alt="loading" width="100" height="100" />
      </div>
      <h1>Loading...</h1>
    </div>
  )
}

export default Loader
