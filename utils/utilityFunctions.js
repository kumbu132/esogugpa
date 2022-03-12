const turkishCharacterRegex = (keyword) =>
	keyword
		.replace(/[ıİiI]/g, '[ıİiI]')
		.replace(/[şŞsS]/g, '[şŞsS]')
		.replace(/[çÇcC]/g, '[çÇcC]')
		.replace(/[ğĞgG]/g, '[ğĞgG]')
		.replace(/[öÖoO]/g, '[öÖoÖ]')
		.replace(/[üÜuU]/g, '[üÜuU]');

export const customFilter = (option, searchText) =>
	turkishCharacterRegex(option.data.label)
		.toLowerCase()
		.includes(turkishCharacterRegex(searchText).toLowerCase());

export const gradeOptions = [
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

export const getLetterNoteWeight = (grade) => {
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

export const displayGPA = (number) => {
	return +(Math.round(number + 'e+2') + 'e-2');
};
