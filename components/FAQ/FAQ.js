import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons"
import ReactMarkdown from "react-markdown"

const FAQ = ({ question, answer, id, active, setActive }) => {
  const handleFAQClick = () => {
    if (active === id) {
      setActive("")
    } else {
      setActive(id)
    }
  }
  return (
    <div
      className="p-4 border-b cursor-pointer backdrop-blur-sm "
      onClick={handleFAQClick}
    >
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-semibold">{question}</p>
        {active !== id && <CaretDownOutlined style={{ fontSize: "16px" }} />}
        {active === id && <CaretUpOutlined style={{ fontSize: "16px" }} />}
      </div>
      {active === id && (
        <ReactMarkdown
          className="animate-moduleCard pl-3"
          children={answer}
        ></ReactMarkdown>
      )}
    </div>
  )
}

export default FAQ
