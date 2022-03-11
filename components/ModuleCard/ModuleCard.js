import Select from 'react-select';
import { useModules } from '../../context/context';
import { CloseCircleOutlined } from '@ant-design/icons';
import dersler from '../../utils/mmf-bilgisayar-muhendisligi.json';

const ModuleCard = ({
	id,
	moduleID,
	moduleName,
	credits,
	grade,
	akts,
	isComplete,
}) => {
	const { deleteModule, changeSelectedModules, changeSelectedModuleGrade } =
		useModules();
	const dersOptions = [];

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

	const gradeOptions = [
		{ value: 'AA', label: 'AA' },
		{ value: 'BA', label: 'BA' },
		{ value: 'BB', label: 'BB' },
		{ value: 'CB', label: 'CB' },
		{ value: 'CC', label: 'CC' },
		{ value: 'DC', label: 'DC' },
		{ value: 'DD', label: 'DD' },
		{ value: 'FF', label: 'FF' },
		{ value: 'DZ', label: 'DZ' },
		{ value: 'YT', label: 'YT' },
	];

	const turkishCharacterRegex = (keyword) =>
		keyword
			.replace(/[ıİiI]/g, '[ıİiI]')
			.replace(/[şŞsS]/g, '[şŞsS]')
			.replace(/[çÇcC]/g, '[çÇcC]')
			.replace(/[ğĞgG]/g, '[ğĞgG]')
			.replace(/[öÖoO]/g, '[öÖoÖ]')
			.replace(/[üÜuU]/g, '[üÜuU]');

	const customFilter = (option, searchText) =>
		turkishCharacterRegex(option.data.label)
			.toLowerCase()
			.includes(turkishCharacterRegex(searchText).toLowerCase());
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
	return (
		<div className="h-[80px] w-full flex justify-around items-center  bg-[rgba(255,255,255,0.9)] px-1">
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
				onClick={() => deleteModule(id)}
			/>
		</div>
	);
};

export default ModuleCard;
