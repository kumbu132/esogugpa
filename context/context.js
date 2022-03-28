import { createContext, useContext, useState } from "react"
import uuid from "react-uuid"
import { getLetterNoteWeight } from "../utils/utilityFunctions"

const ModulesContext = createContext(undefined)

export function ModulesProvider({ children }) {
  const [departmentModules, setDepartmentModules] = useState([])
  const [repeatModules, setRepeatModules] = useState([])
  const [previousTotalCredits, setPreviousTotalCredits] = useState(0)
  const [faqs, setFAQs] = useState([])
  const [selectedModules, setSelectedModules] = useState([])
  const [gpa, setGPA] = useState(0)
  const [cgpa, setCGPA] = useState(0)

  const [oldGPA, setOldGPA] = useState(0)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [calculateIsClicked, setCalculateIsClicked] = useState(false)
  const [isHomePage, setIsHomePage] = useState(true)
  const [incompleteModulesWarning, setIncompleteModulesWarning] = useState(false)
  const [cgpaMode, setCGPAMode] = useState(false)
  const [hasRepeatModules, setHasRepeatModules] = useState(false)

  const changeRepeatModules = (repeatModuleIDs) => {
    let tmpRepeatModules = []
    repeatModuleIDs.forEach((repeatMod) => {
      let temp = departmentModules.filter(
        (module) => module.attributes.module_id === repeatMod
      )[0]

      const existingRepeatModule = repeatModules.find(
        (mod) => mod.attributes.module_id === repeatMod
      )

      if (existingRepeatModule) {
        temp = { ...temp, grade: existingRepeatModule.grade }
      } else {
        temp = { ...temp, grade: "" }
      }

      tmpRepeatModules.push(temp)
    })
    setRepeatModules(tmpRepeatModules)
  }
  const handleIncreaseModules = () => {
    setCalculateIsClicked(false)
    setIncompleteModulesWarning(false)
    let arr = selectedModules

    if (selectedModules.length) {
      arr.forEach((mod) => {
        mod.firstLoad = false
      })
    }

    var newModuleCard = {
      id: uuid(),
      moduleID: "",
      moduleName: "",
      credits: 0,
      akts: "",
      grade: "",
      complete: false,
      firstLoad: true,
      deleteThisModule: false,
    }

    setSelectedModules([...arr, newModuleCard])
  }

  const handleDecreaseModules = (deleteWasPressed = false) => {
    setCalculateIsClicked(false)
    setIncompleteModulesWarning(false)

    if (selectedModules.length) {
      if (!deleteWasPressed) {
        let arr = selectedModules.filter(
          (module, idx) => idx !== selectedModules.length - 1
        )
        arr.forEach((module) => {
          module.firstLoad = false
        })
        setSelectedModules(arr)

        // let arr = selectedModules;
        // let i = selectedModules.length - 1;
        // arr[i].deleteThisModule = true;
        // arr[i].firstLoad = false;

        // setSelectedModules(arr);
      }
    } else {
      return
    }
  }

  const deleteModule = (id) => {
    let arr = selectedModules.filter((module, i) => module.id !== id)
    arr.forEach((module) => {
      module.firstLoad = false
    })
    setSelectedModules(arr)
  }

  const changeSelectedModules = (id, module) => {
    var newModulesArray = selectedModules.map((ders) => {
      if (ders.id === id) {
        if (ders.grade === "") {
          return {
            ...ders,
            moduleID: module.moduleID,
            moduleName: module.moduleName,
            credits: module.credits,
            akts: module.akts,
            complete: false,
          }
        } else if (ders.grade !== "") {
          return {
            ...ders,
            moduleID: module.moduleID,
            moduleName: module.moduleName,
            credits: module.credits,
            akts: module.akts,
            complete: true,
          }
        } else {
          return {
            ...ders,
            moduleID: module.moduleID,
            moduleName: module.moduleName,
            credits: module.credits,
            akts: module.akts,
          }
        }
      }
      return { ...ders }
    })

    setSelectedModules(newModulesArray)
  }

  const changeSelectedModuleGrade = (id, module) => {
    var updatedSelectedModules = selectedModules.map((ders) => {
      if (ders.id === id) {
        if (ders.moduleName === "") {
          return {
            ...ders,
            grade: module.grade,
            complete: false,
          }
        } else if (ders.moduleName !== "") {
          return {
            ...ders,
            grade: module.grade,
            complete: true,
          }
        } else {
          return {
            ...ders,
            grade: module.grade,
          }
        }
      }
      return { ...ders }
    })

    setSelectedModules(updatedSelectedModules)
  }

  const calculateGPA = () => {
    if (selectedModules.length) {
      var totalCredits = 0
      var totalScore = 0
      var calculate = true
      setCalculateIsClicked(true)

      //CHECK IF ALL FIELDS FILLED
      selectedModules.forEach((module) => {
        if (module.moduleName === "" || module.grade === "") {
          calculate = false
        }
      })

      if (calculate) {
        setIncompleteModulesWarning(false)

        selectedModules.forEach((module) => {
          totalCredits += Number(module.credits)
          if (module.grade !== "") {
            totalScore += Number(module.credits) * getLetterNoteWeight(module.grade)
          }
        })

        //TODO - check what happens when you have only one course that has 0 credits and you pass.
        if (!totalCredits) {
          totalCredits = 1
        }

        setGPA(totalScore / totalCredits)

        //calculateCGPA
        if (cgpaMode) {
          totalCredits += +previousTotalCredits
          if (hasRepeatModules) {
            repeatModules.forEach((module) => {
              totalCredits -= +module.attributes.credits
              totalScore -=
                +module.attributes.credits * getLetterNoteWeight(module.grade)
            })
          }
          totalScore += oldGPA * +previousTotalCredits

          setCGPA(totalScore / totalCredits)
        }

        setModalIsOpen(true)
      } else {
        var newModulesArray = selectedModules
        newModulesArray.forEach((ders) => {
          if (ders.grade === "" || ders.moduleName === "") {
            ders.complete = false
          } else {
            ders.complete = true
          }
        })
        setIncompleteModulesWarning(true)
        setSelectedModules(newModulesArray)
      }
    }
  }

  const resetModules = () => {
    const arr = []
    setSelectedModules(arr)
  }

  return (
    <ModulesContext.Provider
      value={{
        selectedModules,
        gpa,
        oldGPA,
        calculateIsClicked,
        modalIsOpen,
        isHomePage,
        incompleteModulesWarning,
        departmentModules,
        faqs,
        repeatModules,
        cgpaMode,
        hasRepeatModules,
        previousTotalCredits,
        cgpa,
        handleIncreaseModules,
        handleDecreaseModules,
        deleteModule,
        changeSelectedModules,
        changeSelectedModuleGrade,
        setModalIsOpen,
        calculateGPA,
        setIsHomePage,
        resetModules,
        setDepartmentModules,
        setFAQs,
        changeRepeatModules,
        setOldGPA,
        setCGPAMode,
        setHasRepeatModules,
        setPreviousTotalCredits,
        setRepeatModules,
      }}
    >
      {children}
    </ModulesContext.Provider>
  )
}

export function useModules() {
  const context = useContext(ModulesContext)

  if (!context) throw new Error("useModules must be used inside a `ModulesProvider`")

  return context
}
