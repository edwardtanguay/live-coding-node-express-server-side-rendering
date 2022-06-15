import axios from 'axios';

const employees = (await axios.get('https://edwardtanguay.netlify.app/share/employees.json')).data;

export const siteModel = {
	employees
};
