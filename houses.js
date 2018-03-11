/*****************************************************************************
  EXPORT SET UP FOR HOUSES.JS
*****************************************************************************/
module.exports = function(){
  var express = require('express');
	var router = express.Router();
	var mysql = require('./dbcon.js');




  /*****************************************************************************
    DISPLAY ALL HOUSES
  *****************************************************************************/
  router.get('/',function(req,res){
    var context = {};
    // callbackCount = 0;
    // var mysql = req.app.get('mysql');
    // getStudents(res, mysql, context, complete)
    // getHouses(res, mysql, context, complete)
    // function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('students', context);
    //         }
    // }
    res.render('houses', context);
  });




















/*****************************************************************************
  CLOSE THE EXPORT SET UP FOR HOUSES.JS: RETURN ROUTER
*****************************************************************************/
  return router;
}();
