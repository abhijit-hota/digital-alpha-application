import Puppeteer from "puppeteer";

/**
 * @param {HTMLTableElement} courseTable
 * @returns {Promise<array>} semesters
 */
const traverse = (courseTable) => {
	return [...courseTable.childNodes].reduce(
		(acc, row, i) => {
			if (i === 0) return acc;
			if (row.childNodes.length === 1) {
				const title = row.firstChild.textContent.split(" (")?.[0]?.trim();
				acc.semesters[acc.currentSem] = {
					rank: acc.currentSem + 1,
					title,
					courses: [],
					creditsEarned: 0,
					gpa: 0,
					cgpa: 0,
				};
				return acc;
			}
			if (row.childNodes.length === 2) {
				acc.cgpa = +row.childNodes.item(1).textContent.split(":")[1];
				return acc;
			}
			if (row.childNodes.length === 3) {
				const [creditsEarned, gpa, cgpa] = [...row.childNodes].map(
					(td) => +td.textContent.split(":")[1]
				);
				acc.semesters[acc.currentSem] = {
					...acc.semesters[acc.currentSem],
					creditsEarned,
					gpa,
					cgpa,
				};
				acc.currentSem++;
				return acc;
			}
			const [, code, title, category, credit, grade, attendance] = [...row.childNodes].map(
				(td) => td.textContent
			);
			acc.semesters[acc.currentSem].courses.push({
				code,
				title,
				category,
				credit,
				grade,
				attendance,
			});
			return acc;
		},
		{ currentSem: 0, semesters: [], cgpa: 0 }
	);
};

const scrape = async ({ roll, password }) => {
	const browser = await Puppeteer.launch();
	try {
		console.debug("[Scrapping] Request Received from:", roll);

		const page = await browser.newPage();

		await page.setUserAgent(
			"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36"
		);
		await page.goto("https://www.iitm.ac.in/viewgrades/index.html");

		await page.type('input[name="rollno"]', roll);
		await page.type('input[name="pwd"]', password);
		await Promise.all([page.waitForNavigation(), page.click('input[name="submit"]')]);

		await page.goto("https://www.iitm.ac.in/viewgrades/studentauth/btechdual.php");

		const studentRowElement = await page.$("center table");
		const student = await studentRowElement.evaluate((elem) => elem?.textContent);

		if (!student) {
			console.debug("[Scrapping] Error in logging in:", roll);
			await browser.close();
			return false;
		}
		const [, name, degree] = student.split("-");

		console.debug("[Scrapping] Successfully logged in:", roll);

		const table = await page.$("center center table tbody");

		/**
		 * @type {array} semesters
		 */
		const { semesters, cgpa } = await table.evaluate(traverse);

		await browser.close();
		console.debug("[Scrapping] Successfully scraped and transformed:", roll);

		return {
			name,
			roll,
			cgpa,
			degree,
			semesters,
		};
	} catch (error) {
		console.error("[Scrapping] Error occurred:", error);
		await browser.close();
		return false;
	}
};

export default scrape;
