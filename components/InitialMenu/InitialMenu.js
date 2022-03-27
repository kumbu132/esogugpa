import { useState } from "react"
import Select from "react-select"
import Switch from "react-switch"
import { useModules } from "../../context/context"
import { customFilter } from "../../utils/utilityFunctions"

const InitialMenu = ({ closeMenu }) => {
  const {
    departmentModules,
    repeatModules,
    changeRepeatModules,
    oldGPA,
    setOldGPA,
    cgpaMode,
    setCGPAMode,
    hasRepeatModules,
    setHasRepeatModules,
  } = useModules()
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

  const selectedRepeatModules = []
  repeatModules.map((ders) => {
    const { module_id, name, ects, credits } = ders.attributes
    selectedRepeatModules.push({
      value: `${module_id} ${name}`,
      label: `${module_id} ${name}`,
      moduleName: name,
      moduleID: module_id,
      credits: credits,
      akts: ects,
    })
  })

  const handleSelectChange = (modules) => {
    const repeatModuleIDs = []
    modules?.forEach((module) => {
      repeatModuleIDs.push(module.moduleID)
    })
    changeRepeatModules(repeatModuleIDs)
  }

  const handleCalculate = () => {
    //validate form
    //set global variables
    //close initial menu
    closeMenu()
  }
  return (
    <div className="flex flex-col justify-center items-center fixed mx-auto left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-screen z-50 bg-white w-full">
      <div className="h-screen max-w-screen-md w-full">
        <div className="navbars flex justify-center items-center h-[60px] mb-1">
          <h1 className="font-bold text-3xl">ESOGUGPA</h1>
        </div>
        <div className="min-h-[60px] p-3 border-b border-t">
          <div className="flex justify-between items-center">
            <div className="description-container max-w-[70%] ">
              <p className="text-[16px] font-medium">{`HESAPLAMA MODU: ${
                cgpaMode ? "GNO" : "DNO"
              }`}</p>
              <p className="text-sm">
                Dönem not ortalaması ve genel not ortalama modları arasında geçiş
                yapın.
              </p>
            </div>
            <Switch
              checked={cgpaMode}
              onChange={() => setCGPAMode(!cgpaMode)}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 1px rgba(0, 0, 0, 0.2)"
              className="react-switch"
              id="material-switch"
            />
          </div>
          {cgpaMode && (
            <div className="flex justify-between items-center my-1">
              <p className="text-[16px] font-medium">Mevcut GNO'nuz:</p>
              <input
                type="number"
                className="border w-[50px]"
                max={4}
                min={0}
                defaultValue={oldGPA}
                step={0.01}
                onChange={(e) => {
                  setOldGPA(e.target.value)
                }}
              />
            </div>
          )}
        </div>
        {cgpaMode && (
          <div className="p-3 border-b border-t min-h-[60px]">
            <div className="flex justify-between items-center">
              <div className="animate-moduleCard  description-container max-w-[70%] font-medium">
                <p className="text-[16px]">
                  GEÇMİŞTE ALDIĞIM EN AZ BİR DERSİ TEKRAR ALIYORUM.
                </p>
              </div>
              <input
                type="checkbox"
                className="pr-3"
                defaultChecked={hasRepeatModules}
                onChange={(e) => {
                  setHasRepeatModules(e.target.checked)
                }}
              />
            </div>
            {hasRepeatModules && (
              <form className="mt-2">
                <Select
                  isMulti
                  name="colors"
                  options={dersOptions}
                  defaultValue={selectedRepeatModules}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Dersleri seçin..."
                  blurInputOnSelect
                  captureMenuScroll
                  filterOption={customFilter}
                  onChange={handleSelectChange}
                />
              </form>
            )}
          </div>
        )}
        <div className="flex justify-center items-center mt-4">
          <button
            className="p-3 rounded-md bg-orange-500 hover:brightness-110"
            onClick={handleCalculate}
          >
            HESAPLA
          </button>
        </div>
      </div>
    </div>
  )
}

export default InitialMenu
