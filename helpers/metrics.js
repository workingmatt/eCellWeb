const {Pool} = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: false
});

const getm = async function(req, res){
	try {
 		const client = await pool.connect();
  		const result = await client.query('SELECT * FROM results;');
  		const results = { 'results': (result) ? result.rows : null};

  		//tried to get list of headers from query to set up table on metrics.ejs. couldn't send two data vars over res.render.
	  		//const header = await client.query("SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'results';");
	  		//const headers = { 'headers': (header) ? header.rows : null};

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
		var date;
		date = new Date().toISOString().slice(0, 19).replace('T', ' ');
 		const client = await pool.connect();	
		const result = await client.query("INSERT INTO results VALUES (DEFAULT, '"+date+"') RETURNING id;");
	
		console.log(result.rows[0]["id"]);

		res.write(result.rows[0]["id"].toString());
		//({'id':'mr matyt'});
		res.send();
		//res.sendStatus(200);
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
		//const client = await pool.connect();
		//const result = await client.query("INSERT INTO results ")
	} catch (err) {
		console.log(err);
		res.send("update error: "+err);
	}
}

module.exports = {
	addm,
	getm,
	deletem,
	updatem,
}