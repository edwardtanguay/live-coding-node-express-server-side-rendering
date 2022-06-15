import express from 'express';

const app = express();
const port = 3009;

app.get('/', (req, res) => {
	res.send(`this is the <b>info site333</b>`)
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
});