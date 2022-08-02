var mysql = require('mysql');
var connection  = mysql.createPool({
  host     : 'us-cdbr-east-06.cleardb.net',
  user     : 'b79df9c093fe0d',
  password : '0687e529',
  database : 'heroku_d764cdfbd769019'
});
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
module.exports=connection;