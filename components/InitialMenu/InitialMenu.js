//add input for previous toal accumulated credits
//set validation

import Select from "react-select"
import Switch from "react-switch"
import { useModules } from "../../context/context"
import { customFilter, gradeOptions } from "../../utils/utilityFunctions"
import { SaveOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { notification } from "antd"

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
    previousTotalCredits,
    setPreviousTotalCredits,
    setRepeatModules,
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

  const openNotification = (placement) => {
    notification.warning({
      message: "Hata",
      description: "Eksik alanları doldurun.",
      placement,
      closeIcon: <CloseCircleOutlined style={{ fontSize: "16px" }} />,
    })
  }

  const handleCalculate = () => {
    let err = false
    //validate form
    if (!cgpaMode) {
      closeMenu()
      return
    }
    if (!hasRepeatModules) {
      closeMenu()
      return
    }

    if (!repeatModules.length) {
      console.log("in !repeatModules.length block")
      openNotification("top")
      return
    }
    repeatModules.forEach((module) => {
      if (module.grade === "") {
        openNotification("top")
        err = true
      }
    })

    if (!err) closeMenu()
  }

  const handleGradeChange = (moduleGrade, module) => {
    const temp = { ...module, grade: moduleGrade.value }
    setRepeatModules((prev) => {
      return prev.map((repeatModule) => {
        if (repeatModule.attributes.module_id === module.attributes.module_id) {
          return temp
        }
        return repeatModule
      })
    })
  }

  return (
    <div className="flex flex-col justify-center items-center fixed mx-auto top-0 left-0 h-screen z-50 bg-white w-full">
      <div className="h-screen max-w-screen-md w-full">
        <div className="navbars flex justify-between items-center mb-1">
          <span className="pl-3"></span>
          <h1 className="font-bold text-3xl">ESOGUGPA</h1>
          <button
            className=" hover:brightness-110 flex justify-between items-center pr-3"
            onClick={handleCalculate}
          >
            <SaveOutlined style={{ fontSize: "18px" }} />
          </button>
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
            <>
              <div className="flex justify-between items-center my-1">
                <p className="text-[16px] font-medium">Mevcut GNO'nuz:</p>
                <input
                  type="number"
                  className="border w-[50px]"
                  max={4}
                  min={0}
                  value={oldGPA}
                  step={0.01}
                  onChange={(e) => {
                    setOldGPA(e.target.value)
                  }}
                />
              </div>
              <div className="flex justify-between items-center my-1">
                <p className="text-[16px] font-medium">Başarılan kredi sayısı:</p>
                <input
                  type="number"
                  className="border w-[50px]"
                  min={0}
                  value={previousTotalCredits}
                  step={1}
                  onChange={(e) => {
                    setPreviousTotalCredits(+e.target.value)
                  }}
                />
              </div>
            </>
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
                {repeatModules.length > 0 &&
                  repeatModules.map((module) => {
                    const { module_id, name } = module.attributes

                    return (
                      <div
                        className="flex justify-between items-center my-1 px-2"
                        key={module_id}
                      >
                        <p>{`${module_id} ${name}`}</p>
                        {module.grade === "" && (
                          <Select
                            options={gradeOptions}
                            onChange={(grade) => {
                              handleGradeChange(grade, module)
                            }}
                            className="w-[110px] text-xs"
                            isSearchable={false}
                            placeholder="Harf notu"
                            captureMenuScroll
                          />
                        )}
                        {module.grade !== "" && (
                          <Select
                            options={gradeOptions}
                            onChange={(grade) => {
                              handleGradeChange(grade, module)
                            }}
                            className="w-[110px] text-xs"
                            isSearchable={false}
                            placeholder="Harf notu"
                            captureMenuScroll
                            defaultValue={{
                              value: module.grade,
                              label: module.grade,
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default InitialMenu
