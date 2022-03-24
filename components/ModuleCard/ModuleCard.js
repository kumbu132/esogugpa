//useEffect. if isDeleted is true, set state in such a way so that the thing deletes both from the array and here0

import { useState, useEffect } from "react"
import Select from "react-select"
import { useModules } from "../../context/context"
import { CloseCircleOutlined } from "@ant-design/icons"
import { customFilter, gradeOptions } from "../../utils/utilityFunctions"

const ModuleCard = ({
  id,
  moduleID,
  moduleName,
  credits,
  grade,
  akts,
  isComplete,
  firstLoad,
}) => {
  const {
    deleteModule,
    calculateIsClicked,
    changeSelectedModules,
    changeSelectedModuleGrade,
    departmentModules,
  } = useModules()
  const [isDeleting, setIsDeleting] = useState(false)
  const dersOptions = []

  departmentModules.map((ders) => {
    const { module_id, name, ects, credits } = ders.attributes
    dersOptions.push({
      value: `${module_id} ${name}`,
      label: `${module_id} ${name}`,
      moduleName: name,
      moduleID: module_id,
      credits: credits,
      akts: ects,
    })
  })

  const handleModuleChange = (module) => {
    var newModule = dersOptions.filter((ders) => ders.label === module.label)[0]

    changeSelectedModules(id, newModule)
  }

  const handleGradeChange = (moduleGrade) => {
    var newModule = dersOptions.filter((ders) => ders.label === module.label)[0]

    newModule = { ...newModule, grade: moduleGrade.value }
    changeSelectedModuleGrade(id, newModule)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      deleteModule(id)
    }, 50)
  }

  return (
    <div
      className={`h-[80px] w-full flex justify-around items-center 
			${
        !isComplete && calculateIsClicked
          ? "bg-[rgba(255,20,20,0.8)]"
          : "bg-[rgba(252,252,252,0.9)]"
      }
			${firstLoad ? "animate-moduleCard" : ""}
			${isDeleting ? "animate-moduleDelete" : ""}			px-1 border
`}
    >
      <Select
        options={dersOptions}
        onChange={handleModuleChange}
        className="w-[60%] text-xs text-left"
        placeholder="Ders seçin..."
        filterOption={customFilter}
        blurInputOnSelect
        captureMenuScroll
      />
      <Select
        options={gradeOptions}
        onChange={handleGradeChange}
        className="w-[110px] text-xs"
        isSearchable={false}
        placeholder="Harf notu"
        captureMenuScroll
      />
      <CloseCircleOutlined
        className="hover:cursor-pointer hover:opacity-80"
        onClick={handleDelete}
      />
    </div>
  )
}

export default ModuleCard
