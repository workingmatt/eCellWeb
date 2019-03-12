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
  		res.send("helpers/metrics.js Error: "+ err);
  	}
}

const addm = async (req, res) => {
	try {
		var date;
		date = new Date().toISOString().slice(0, 19).replace('T', ' ');
 		const client = await pool.connect();	
		const result = await client.query("INSERT INTO results VALUES (DEFAULT, '"+date+"') RETURNING id;");
		res.sendStatus(200);
		client.release();
	} catch (err) {
		console.log(err);
		res.send("helpers/metrics.js addm Error: "+ err);
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
		res.send("helpers/metrics.js deletem error: "+ err);
	}
}

const updatem = async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query("UPDATE results SET "+req.body.event+"_time = "+req.body.timeElapsed+", "+req.body.event+"_errors = "+req.body.numErrorDrops+" WHERE id = (SELECT Max(id) FROM results);");
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.send("helpers/metrics.js update error: "+err);
	}
}

module.exports = {
	addm,
	getm,
	deletem,
	updatem,
}