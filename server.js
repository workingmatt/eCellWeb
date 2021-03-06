const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const fs = require('fs');
const server_metrics = require('./helpers/metrics.js')


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  
  .get('/', (req, res) => res.render('pages/index'))

  .get('/metrics', server_metrics.getm) //list all stored metrics
  .post('/metrics', server_metrics.addm) //create a new metric record to the database
  .delete('/metrics', server_metrics.deletem) //delete metric 'auto inserted'
  .put('/metrics', server_metrics.updatem) //populate certain fields in the record created above.

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
