const {Pool} = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: false
});

const getm = async function(req, res){
	try {
 		const client = await pool.connect();
  		const result = await client.query('SELECT * FROM  test_table');
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
		const result = await client.query("INSERT INTO test_table VALUES (2,'auto inserted');");
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
		const result = await client.query("DELETE FROM test_table WHERE name = 'auto inserted';");
		res.status(201).send("deleted metric");
		client.release();
	} catch (err) {
		console.log(err);
		res.send("deletem error: "+ err);
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
}