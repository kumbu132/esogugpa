import { createContext, useContext, useState } from 'react';
import uuid from 'react-uuid';

const ModulesContext = createContext(undefined);

export function ModulesProvider({ children }) {
	const [selectedModules, setSelectedModules] = useState([]);
	const [gpa, setGPA] = useState(3.1);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [caluclateIsClicked, setCalculateIsClicked] = useState(false);

	const handleIncreaseModules = () => {
		setCalculateIsClicked(false);
		// resetIncompleteModuleWarning();

		var newModuleCard = {
			id: uuid(),
			moduleID: '',
			moduleName: '',
			credits: 0,
			akts: '',
			grade: '',
			complete: true,
		};
		setSelectedModules((prevArray) => [...prevArray, newModuleCard]);
	};

	const handleDecreaseModules = (deleteWasPressed = false) => {
		// setCalculateIsClicked(false)

		if (selectedModules.length) {
			if (!deleteWasPressed) {
				setSelectedModules(
					selectedModules.filter(
						(module, idx) => idx !== selectedModules.length - 1
					)
				);
			}
		} else {
			return;
		}
	};

	const deleteModule = (id) => {
		let arr = selectedModules.filter((module, i) => module.id !== id);
		setSelectedModules(arr);
	};

	const changeSelectedModules = (id, module) => {
		var newModulesArray = selectedModules.map((ders) => {
			if (ders.id === id) {
				if (caluclateIsClicked && ders.grade === '') {
					return {
						...ders,
						moduleID: module.moduleID,
						moduleName: module.moduleName,
						credits: module.credits,
						akts: module.akts,
						complete: false,
					};
				} else if (caluclateIsClicked && ders.grade !== '') {
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

		console.log(newModulesArray);
		setSelectedModules(newModulesArray);
	};

	const changeSelectedModuleGrade = (id, module) => {
		var updatedSelectedModules = selectedModules.map((ders) => {
			if (ders.id === id) {
				if (caluclateIsClicked && ders.moduleName === '') {
					return {
						...ders,
						grade: module.grade,
						complete: false,
					};
				} else if (caluclateIsClicked && ders.moduleName !== '') {
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

	const getLetterNoteWeight = (grade) => {
		if (grade === 'AA') {
			return 4;
		} else if (grade === 'BA') {
			return 3.5;
		} else if (grade === 'BB') {
			return 3;
		} else if (grade === 'CB') {
			return 2.5;
		} else if (grade === 'CC') {
			return 2;
		} else if (grade === 'DC') {
			return 1.5;
		} else if (grade === 'DD') {
			return 1;
		} else if (grade === 'FF') {
			return 0;
		} else if (grade === 'DZ') {
			return 0;
		} else if (grade === 'YT') {
			return 1;
		}
	};

	const calculateGPA = () => {
		var totalCredits = 0;
		var totalScore = 0;
		var calculate = true;
		setCalculateIsClicked(true);
		//CHECK IF ALL FIELDS FILLED
		selectedModules.forEach((module) => {
			if (module.moduleID === '' || module.grade === '') {
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

			setGPA(totalScore / totalCredits);
			openModal();
		} else {
			var newModulesArray = modules;
			newModulesArray.forEach((ders) => {
				if (ders.grade === '' || ders.moduleName === '') {
					ders.complete = false;
				} else {
					ders.complete = true;
				}
			});
			setSelectedModules(newModulesArray);
		}
	};

	return (
		<ModulesContext.Provider
			value={{
				selectedModules,
				handleIncreaseModules,
				handleDecreaseModules,
				deleteModule,
				gpa,
				caluclateIsClicked,
				changeSelectedModules,
				changeSelectedModuleGrade,
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
