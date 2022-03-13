import { createContext, useContext, useState } from 'react';
import uuid from 'react-uuid';
import { getLetterNoteWeight } from '../utils/utilityFunctions';

const ModulesContext = createContext(undefined);

export function ModulesProvider({ children }) {
	const [selectedModules, setSelectedModules] = useState([]);
	const [gpa, setGPA] = useState(3.1);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [calculateIsClicked, setCalculateIsClicked] = useState(false);

	const handleIncreaseModules = () => {
		setCalculateIsClicked(false);
		let arr = selectedModules;

		if (selectedModules.length) {
			arr.forEach((mod) => {
				mod.firstLoad = false;
			});
		}

		var newModuleCard = {
			id: uuid(),
			moduleID: '',
			moduleName: '',
			credits: 0,
			akts: '',
			grade: '',
			complete: false,
			firstLoad: true,
			deleteThisModule: false,
		};

		setSelectedModules([...arr, newModuleCard]);
	};

	const handleDecreaseModules = (deleteWasPressed = false) => {
		setCalculateIsClicked(false);

		if (selectedModules.length) {
			if (!deleteWasPressed) {
				let arr = selectedModules.filter(
					(module, idx) => idx !== selectedModules.length - 1
				);
				arr.forEach((module) => {
					module.firstLoad = false;
				});
				setSelectedModules(arr);

				// let arr = selectedModules;
				// let i = selectedModules.length - 1;
				// arr[i].deleteThisModule = true;
				// arr[i].firstLoad = false;

				// setSelectedModules(arr);
			}
		} else {
			return;
		}
	};

	const deleteModule = (id) => {
		let arr = selectedModules.filter((module, i) => module.id !== id);
		arr.forEach((module) => {
			module.firstLoad = false;
		});
		setSelectedModules(arr);
	};

	const changeSelectedModules = (id, module) => {
		var newModulesArray = selectedModules.map((ders) => {
			if (ders.id === id) {
				if (ders.grade === '') {
					return {
						...ders,
						moduleID: module.moduleID,
						moduleName: module.moduleName,
						credits: module.credits,
						akts: module.akts,
						complete: false,
					};
				} else if (ders.grade !== '') {
					return {
						...ders,
						moduleID: module.moduleID,
						moduleName: module.moduleName,
						credits: module.credits,
						akts: module.akts,
						complete: true,
					};
				} else {
					return {
						...ders,
						moduleID: module.moduleID,
						moduleName: module.moduleName,
						credits: module.credits,
						akts: module.akts,
					};
				}
			}
			return { ...ders };
		});

		setSelectedModules(newModulesArray);
	};

	const changeSelectedModuleGrade = (id, module) => {
		var updatedSelectedModules = selectedModules.map((ders) => {
			if (ders.id === id) {
				if (ders.moduleName === '') {
					return {
						...ders,
						grade: module.grade,
						complete: false,
					};
				} else if (ders.moduleName !== '') {
					return {
						...ders,
						grade: module.grade,
						complete: true,
					};
				} else {
					return {
						...ders,
						grade: module.grade,
					};
				}
			}
			return { ...ders };
		});

		setSelectedModules(updatedSelectedModules);
	};

	const calculateGPA = () => {
		if (selectedModules.length) {
			var totalCredits = 0;
			var totalScore = 0;
			var calculate = true;
			setCalculateIsClicked(true);

			//CHECK IF ALL FIELDS FILLED
			selectedModules.forEach((module) => {
				if (module.moduleName === '' || module.grade === '') {
					calculate = false;
				}
			});

			if (calculate) {
				selectedModules.forEach((module) => {
					totalCredits += Number(module.credits);
					if (module.grade !== '') {
						totalScore +=
							Number(module.credits) * getLetterNoteWeight(module.grade);
					}
				});

				//TODO - check what happens when you have only one course that has 0 credits and you pass.
				if (!totalCredits) {
					totalCredits = 1;
				}

				setGPA(totalScore / totalCredits);
				setModalIsOpen(true);
			} else {
				var newModulesArray = selectedModules;
				newModulesArray.forEach((ders) => {
					if (ders.grade === '' || ders.moduleName === '') {
						ders.complete = false;
					} else {
						ders.complete = true;
					}
				});
				setSelectedModules(newModulesArray);
			}
		}
	};

	return (
		<ModulesContext.Provider
			value={{
				selectedModules,
				gpa,
				calculateIsClicked,
				modalIsOpen,
				handleIncreaseModules,
				handleDecreaseModules,
				deleteModule,
				changeSelectedModules,
				changeSelectedModuleGrade,
				setModalIsOpen,
				calculateGPA,
			}}
		>
			{children}
		</ModulesContext.Provider>
	);
}

export function useModules() {
	const context = useContext(ModulesContext);

	if (!context)
		throw new Error('useModules must be used inside a `ModulesProvider`');

	return context;
}
