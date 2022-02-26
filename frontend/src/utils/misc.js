const branches = {
	ae: "Aerospace Engineering",
	am: "Engineering Mechanics",
	be: "Biological Engineering",
	bs: "Biological Sciences",
	ca: "Chemical Engineering",
	ce: "Civil Engineering",
	ch: "Chemical Engineering",
	cs: "Computer Science and Engineering",
	cy: "Chemistry",
	ed: "Engineering Design",
	ee: "Electrical Engineering",
	ep: "Engineering Physics",
	hs: "Humanities and Social Sciences",
	ma: "Mathematics",
	me: "Mechanical Engineering",
	mm: "Metallurgical and Materials Engineering",
	ms: "Management Studies",
	na: "Naval Architecture",
	oe: "Ocean Engineering",
	ph: "Physics",
};

const degrees = {
	btech: "B. Tech",
	dualdegree: "Dual Degree",
};
const rollRegex = /^([a-z]{2})(\d{2})([a-z])(\d{3})$/;

const transformYear = (year) => {
	const numYear = 22 - +year;
	const ordinals = ["st", "nd", "rd", "th"];
	return `${numYear}${ordinals[Math.max(3, numYear - 1)]} Year`;
};

export const parseRoll = (roll) => {
	const [, branch, year, degree] = roll.match(rollRegex);
	return {
		branch: branches[branch],
		year: transformYear(year),
	};
};
