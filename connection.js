const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'us-cdbr-east-06.cleardb.net',
  user     : 'b79df9c093fe0d',
  password : '0687e529',
  database : 'heroku_d764cdfbd769019'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

module.exports=connection;