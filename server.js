import express from 'express';
import axios from 'axios';

const app = express();
const port = 3009;

const employees = (await axios.get('https://edwardtanguay.netlify.app/share/employees.json')).data;

app.get('/', (req, res) => {
	res.send(`
<h1>Info Site</h1>	
<h2>There are ${employees.length} employees</h2>	
<ul>
	${employees.map(employee => `<li>${employee.lastName}</li>`).join('')}
</ul>
	`)
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
});