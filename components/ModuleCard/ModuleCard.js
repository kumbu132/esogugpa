//useEffect. if isDeleted is true, set state in such a way so that the thing deletes both from the array and here0

import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useModules } from '../../context/context';
import { CloseCircleOutlined } from '@ant-design/icons';
import dersler from '../../utils/mmf-bilgisayar-muhendisligi.json';
import { customFilter, gradeOptions } from '../../utils/utilityFunctions';

const ModuleCard = ({
	id,
	moduleID,
	moduleName,
	credits,
	grade,
	akts,
	isComplete,
	firstLoad,
	deleteThisModule,
}) => {
	const {
		deleteModule,
		calculateIsClicked,
		changeSelectedModules,
		changeSelectedModuleGrade,
	} = useModules();
	const dersOptions = [];
	const [isDeleting, setIsDeleting] = useState(false);

	dersler.map((ders) =>
		dersOptions.push({
			value: `${ders['module-id']} ${ders['module-name']}`,
			label: `${ders['module-id']} ${ders['module-name']}`,
			moduleName: ders['module-name'],
			moduleID: ders['module-id'],
			credits: ders['credits'],
			akts: ders['akts'],
		})
	);

	const handleModuleChange = (module) => {
		var newModule = dersOptions.filter(
			(ders) => ders.label === module.label
		)[0];

		changeSelectedModules(id, newModule);
	};

	const handleGradeChange = (moduleGrade) => {
		var newModule = dersOptions.filter(
			(ders) => ders.label === module.label
		)[0];

		newModule = { ...newModule, grade: moduleGrade.value };
		changeSelectedModuleGrade(id, newModule);
	};

	const handleDelete = () => {
		setIsDeleting(true);
		setTimeout(() => {
			deleteModule(id);
		}, 50);
	};

	useEffect(() => {
		console.log({ deleteThisModule });
	}, [deleteThisModule]);

	return (
		<div
			className={`h-[80px] w-full flex justify-around items-center 
			${
				!isComplete && calculateIsClicked
					? 'bg-[rgba(255,20,20,0.8)]'
					: 'bg-[rgba(255,255,255,0.9)]'
			}
			${firstLoad ? 'animate-moduleCard' : ''}
			${isDeleting ? 'animate-moduleDelete' : ''}			px-1
`}
		>
			<Select
				options={dersOptions}
				onChange={handleModuleChange}
				className="w-[60%] text-xs text-left"
				placeholder="Select module..."
				filterOption={customFilter}
				blurInputOnSelect
				captureMenuScroll
			/>
			<Select
				options={gradeOptions}
				onChange={handleGradeChange}
				className="w-[100px]"
				isSearchable={false}
				placeholder="Grade"
				captureMenuScroll
			/>
			<CloseCircleOutlined
				className="hover:cursor-pointer hover:opacity-80"
				onClick={handleDelete}
			/>
		</div>
	);
};

export default ModuleCard;
