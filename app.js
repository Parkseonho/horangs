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

/* 쿼리문 불러오기 */ 
app.get('/', (request, response) => {
    const sql = "select * from secretPost"
    con.query(sql, function(err, result, fields){
       if(err) throw err;
       response.send(result)
    });
})

/* 정상실행 시 console 출력 */ 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/* 쿼리문 추가 Values.VER1*/ 
const sqlV1 = "INSERT INTO secretPost(title, content) VALUES('오늘은 무슨날이죠?', '즐거운날..^^')"

con.query(sqlV1, function(err, result, fields){
  if (err) throw err;
  console.log(result)
})


/* 쿼리문 추가 Values?.VER2*/ 
const sqlV2 = "INSERT INTO secretPost(title, content) VALUES(?,?)"

con.query(sqlV2, ['HiByeMaMa','이 드라마 재미있음'], function(err, result, fields){
  if (err) throw err;
  console.log(result)
})

/* 쿼리문 추가 SET?.VER*/ 

const sqlSet = "INSERT INTO secretPost SET ?"

con.query(sqlSet, {title:'정직한후보2',content:'재미있는듯'}, function(err, result, fields){
  if(err) throw err;
  console.log(result)
});
