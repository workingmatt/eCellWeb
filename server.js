const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const fs = require('fs');
const metrics = require('./helpers/metrics.js')


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  
  .get('/', (req, res) => res.render('pages/index'))

  .get('/metrics', metrics.getm) //list all stored metrics
  .post('/metrics', metrics.addm) //add a new metric to the database

  .get('/files', async(req,res) =>{
    //console.log(req.query.page);
    var imageFolder = './public/images/'+req.query.page+'/';
    try {
      fs.readdir(imageFolder, (err,files) => {
        res.send(files);
      });
    } catch (err) {
      console.error(err);
      res.send("Error: "+err);
    }
  })

  .get('/matt', (req, res) => {
    res.json({info:"some text"});
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
