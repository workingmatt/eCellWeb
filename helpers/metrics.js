const {Pool} = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: false
});

const getm = async function(req, res){
	try {
 		const client = await pool.connect();
  		const result = await client.query('SELECT * FROM results');
  		const results = { 'results': (result) ? result.rows : null};
  		res.render('pages/metrics', results );
 		//res.status(201).send(results);
  		client.release();
  	} catch (err) {
  		console.error(err);
  		res.send("Error: "+ err);
  	}
}

const addm = async (req, res) => {
	try {
 		const client = await pool.connect();	
		const result = await client.query("INSERT INTO results VALUES (DEFAULT, '2016-06-22 19:10:25-07', 72);");
		res.status(201).send("added metric");
		client.release();
	} catch (err) {
		console.log(err);
		res.send("addm Error: "+ err);
	}
}

const deletem = async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query("DELETE FROM results WHERE id = "+req.body.id+";");
		res.status(201).send("deleted metric");
		client.release();
	} catch (err) {
		console.log(err);
		res.send("deletem error: "+ err);
	}
}

const updatem = async (req, res) => {
	console.log("Updating record");
	try {
		console.log(req.body);
	} catch (err) {
		console.log(err);
		res.send("update error: "+err);
	}
}



	//const {name, email} = req.body;
	//console.log(req.body);
	//res.send(result);
	//res.status(201).send('Response from server to addMetric');

module.exports = {
	addm,
	getm,
	deletem,
	updatem,
}