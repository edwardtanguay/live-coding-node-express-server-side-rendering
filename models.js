import axios from 'axios';
import Excel from 'exceljs';
import * as qfil from './qtools/qfil.js';
import * as qstr from './qtools/qstr.js';

const employees = (
    await axios.get('https://edwardtanguay.netlify.app/share/employees.json')
).data;

const getTranslations = async () => {
    const wb = new Excel.Workbook();
    await wb.xlsx.readFile('./data/newGoogleTranslations.xlsx');
    const translations = [];
    const ws = wb.getWorksheet(1);
    for (let row = 1; row <= 100000; row++) {
        const fromlanguageCell = `A${row}`;
        const toLanguageCell = `B${row}`;
        const fromPhraseCell = `C${row}`;
        const toPhraseCell = `D${row}`;

        const fromLanguage = ws.getCell(fromlanguageCell).value;
        const toLanguage = ws.getCell(toLanguageCell).value;
        const fromPhrase = ws.getCell(fromPhraseCell).value;
        const toPhrase = ws.getCell(toPhraseCell).value;

		if (fromLanguage === null) {
			break;
		} else {
			translations.push({
				fromLanguage,
				toLanguage,
				fromPhrase,
				toPhrase
			});
		}
    }
    return translations;
};

const getJobs = () => {
    const jobs = [];
    const jobFileNames = qfil.getSiteRelativePathAndFileNames('data/jobs');
    jobFileNames.forEach(jobFileName => {
        const fixedPathName = '\\' + qstr.replaceAll(jobFileName, '/', '\\');
        const lines = qfil.getFileAsLines(fixedPathName);
        const markdown = qstr.convertLinesToStringBlock(lines);
        const html = qstr.parseMarkDown(markdown);
    
        let idCode = qstr.chopLeft(jobFileName, 'data/jobs/');
        idCode = qstr.chopRight(idCode, '.md');

        jobs.push({
            idCode,
            html
        })
    })
    
    return jobs;
}

export const siteModel = {
    employees,
    translations: await getTranslations(),
    jobs: getJobs()
};
