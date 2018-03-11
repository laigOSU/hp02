/*****************************************************************************
  SET UP
*****************************************************************************/
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 8315);
app.set('mysql', mysql);


/*****************************************************************************
  EXPORT SET UP FOR STUDENTS.JS
*****************************************************************************/

//app.use('/students', require('./students.js'));
app.get('/',function(req,res){
    res.render('home');
});

app.use('/students', require('./students.js'))


/*****************************************************************************
  EXPORT SET UP FOR HOUSES.JS
*****************************************************************************/

app.use('/houses', require('./houses.js'))



/*****************************************************************************
  ERROR HANDLERS & LISTEN PORT
*****************************************************************************/
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
