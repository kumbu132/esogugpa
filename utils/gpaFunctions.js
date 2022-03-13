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

export const faqs = [
	{
		id: '1',
		question: 'why you so?',
		answer: 'because i am',
	},
	{
		id: '2',
		question: 'why you so?',
		answer: 'because i am',
	},
	{
		id: '3',
		question: 'why you so?',
		answer: 'because i am',
	},
	{
		id: '4',
		question: 'why you so?',
		answer: 'because i am',
	},
	{
		id: '5',
		question: 'why you so?',
		answer: 'because i am',
	},
];
