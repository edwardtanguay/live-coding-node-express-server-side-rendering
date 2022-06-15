import express from 'express';
import axios from 'axios';

const app = express();
const port = 3009;

const employees = (await axios.get('https://edwardtanguay.netlify.app/share/employees.json')).data;

app.get('/maincss', (req, res) => {
	res.send(`h1 {
		color:blue;
	}
	`
)
});

app.get('/', (req, res) => {
	res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" type="text/css" href="http://localhost:3009/maincss" />	
	<title>Info Site</title>
</head>
<style>

</style>
<body>

<h1>Info Site</h1>	
<h2>There are ${employees.length} employees</h2>	
<ul>
	${employees.map(employee => `<li>${employee.lastName}</li>`).join('')}
</ul>
<script>

</script>	
</body>
</html>
	`)
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
});