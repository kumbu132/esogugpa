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
