const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const fs = require('fs');

const {Pool} = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: false
});

console.log("DATABASE_URL: "+process.env.DATABASE_URL);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  
  .get('/', (req, res) => res.render('pages/index'))

  .get('/db', async(req,res) => {
  	try {
  		const client = await pool.connect();
  		const result = await client.query('SELECT * FROM  test_table');
  		const results = { 'results': (result) ? result.rows : null};
  		res.render('pages/db', results );
  		client.release();
  	} catch (err) {
  		console.error(err);
  		res.send("Error: "+ err);
  	}
  })

  .get('/files', async(req,res) =>{
    console.log("server.js get /files");
    console.log(req.query.page);
    var imageFolder = './public/images/'+req.query.page+'/';
    try {
      fs.readdir(imageFolder, (err,files) => {
        //files.forEach(file => {
        //  console.log(file);
        //});
        res.send(files);
      });
    } catch (err) {
      console.error(err);
      res.send("Error: "+err);
    }
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
