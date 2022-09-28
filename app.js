const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'sbsst',
    password: 'sbs123414',
});

con.connect(function(err){
 if(err) throw err;
 console.log('Connected');
})

app.get('/', (req, res) => {
  res.send('이게 무슨일!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})