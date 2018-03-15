/*****************************************************************************
  EXPORT SET UP FOR HOUSES.JS
*****************************************************************************/
module.exports = function(){
  var express = require('express');
	var router = express.Router();
	var mysql = require('./dbcon.js');
  var methodOverride = require("method-override");

  /*****************************************************************************
    HELPER QUERY FUNCTIONS
  *****************************************************************************/
  function getHouses(res, mysql, context, complete){
    mysql.pool.query('SELECT Houses.id AS id, Houses.name, Professors.fname AS head_prof_fname, Professors.lname AS head_prof_lname FROM Houses INNER JOIN Professors ON Professors.house = Houses.id OR Professors.id = Houses.head_prof',
      function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.houses = results;
        console.log(context)
        complete();
    });
  }

  function getHouse(res, mysql, context, req, complete){

    mysql.pool.query('SELECT Houses.id AS id, Houses.name, Professors.fname AS head_prof_fname, Professors.lname AS head_prof_lname FROM Houses INNER JOIN Professors ON Professors.house = Houses.id OR Professors.id = Houses.head_prof WHERE Houses.id ='+req.params.id,
    function(error, results, fields){
         if(error){
             res.write(JSON.stringify(error));
             res.end();
         }
         context.house = results[0];
         complete();
     });
  }

  function getProfessors(res, mysql, context, complete){
    mysql.pool.query('SELECT Professors.id AS id, Professors.fname, Professors.lname, Houses.name AS name FROM Professors INNER JOIN Houses ON Houses.id = Professors.house OR Houses.head_prof = Professors.id',
    function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.professors = results;
      complete();
  });
  }


  /*****************************************************************************
    DISPLAY ALL HOUSES
  *****************************************************************************/
  router.get('/',function(req,res){
    var context = {};
    callbackCount = 0;
    var mysql = req.app.get('mysql');
    getHouses(res, mysql, context, complete)
    getProfessors(res, mysql, context, complete)
    function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('houses', context);
            }
    }
  });



  /*****************************************************************************
    DISPLAY ONE HOUSE (FOR UPDATE HOUSE)
  *****************************************************************************/
  router.get('/:id',function(req,res){
		var context = {};
		callbackCount = 0;
		var mysql = req.app.get('mysql');
    getHouse(res, mysql, context, req, complete)
    getProfessors(res, mysql, context, complete)
		function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-house', context);
            }
		}
	});

  /*****************************************************************************
    INSERT HOUSE
  *****************************************************************************/
  router.post('/', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Houses (name, head_prof) VALUES (?,?)";
    var inserts = [req.body.name, req.body.head_prof];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/houses');
        }
    });
  });
  /*****************************************************************************
    DELETE HOUSE
  *****************************************************************************/


/*****************************************************************************
  CLOSE THE EXPORT SET UP FOR HOUSES.JS: RETURN ROUTER
*****************************************************************************/
  return router;
}();


























//space buffer
