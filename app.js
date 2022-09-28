const { response } = require('express');
const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'sbsst',
    password: 'sbs123414',
    database: 'horang'
});

con.connect(function(err){
 if(err) throw err;
 console.log('Connected');

});

app.get('/', (request, response) => {
    const sql = "select * from secretPost"
    con.query(sql, function(err, result, fields){
       if(err) throw err;
       response.send(result)
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})