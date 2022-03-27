import {
  QuestionCircleOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  TranslationOutlined,
} from "@ant-design/icons"
import Image from "next/image"
import InitialMenu from "../InitialMenu/InitialMenu"
import Link from "next/link"
import { useModules } from "../../context/context"
import { useState } from "react"

const SettingsMenu = ({ closeMenu }) => {
  const { resetModules } = useModules()
  const [initalMenuIsOpen, setInitialMenuIsOpen] = useState(false)

  const handlePageChange = () => {
    resetModules()
    closeMenu()
  }

  const closeInitialMenu = () => {
    setInitialMenuIsOpen(false)
  }

  return (
    <>
      {" "}
      {initalMenuIsOpen && <InitialMenu closeMenu={closeInitialMenu} />}
      <div className="absolute top-[58px] w-[300px] translate-x-[-45%] overflow-hidden h-max animate-fadeIn z-[49]">
        {/* <div className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm">
				<TranslationOutlined style={{ fontSize: '16px' }} />
				<p className="px-4">Language: English</p>
			</div>
			<div className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm">
				<Image src="/images/moon.svg" alt="moon" width="16" height="16" />
				<p className="px-4">THEME</p>
			</div> */}
        <div
          className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm"
          onClick={() => {
            setInitialMenuIsOpen(true)
          }}
        >
          <p className="px-4">Hesaplama modu değiştir</p>
        </div>
        {initalMenuIsOpen && <InitialMenu closeMenu={closeInitialMenu} />}
        <Link href="/faqs">
          <a>
            <div
              className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm"
              onClick={handlePageChange}
            >
              <QuestionCircleOutlined style={{ fontSize: "16px" }} />
              <p className="px-4">Sıkça Sorulan Soruları</p>
            </div>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <div
              className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm"
              onClick={handlePageChange}
            >
              <InfoCircleOutlined style={{ fontSize: "16px" }} />
              <p className="px-4">Hakkında</p>
            </div>
          </a>
        </Link>
        <Link href="/getintouch">
          <a>
            <div
              className="p-4 flex items-center border bg-[#fcfcfc] hover:bg-slate-200 rounded-sm"
              onClick={handlePageChange}
            >
              <MessageOutlined style={{ fontSize: "16px" }} />
              <p className="px-4">İletişime geçin</p>
            </div>{" "}
          </a>
        </Link>
      </div>
    </>
  )
}

export default SettingsMenu
