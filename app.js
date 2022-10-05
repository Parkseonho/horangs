const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const moment = require('moment')
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

/* 미들웨어 */
app.use(bodyParser.urlencoded({extended: true}));
/* 템플릿 엔진에서 ejs 사용을 위함 */
app.set('view engine', 'ejs');


/* 쿼리문 불러오기  
app.get('/', (request, response) => {
    const sql = "select * from secretPost"
    con.query(sql, function(err, result, fields){
       if(err) throw err;
       response.send(result)
    });
})
*/

/* list */
app.get('/', (request, response) => {
 const sql = "select * from secretPost";
 con.query(sql, function(err, result, fields){
  if(err) throw err;
  response.render('index',{
  secretPost:result,
  moment
  });
 });
});

/* html문 가져오기 */
app.get('/create', (request, response) => {
  response.sendFile(path.join(__dirname,'html/form.html'))
});

/* html문 보내기 */
app.post('/create', (request, response) => {
  const sqlInsert = "INSERT INTO secretPost SET ?"

  con.query(sqlInsert, request.body, function(err, result, fields){
    if(err) throw err;
    console.log(result);
    response.redirect('/');
  });
});

/* 삭제 */
app.get('/delete/:id',(request, response)=>{
  const sql = "DELETE FROM secretPost WHERE id = ?";

  con.query(sql, [request.params.id], function(err, result, fields){
    if(err) throw err;
    console.log(result)
    response.redirect('/')

  });
});

/* 업데이트 */
app.get('/edit/:id',(request, response)=>{
  const sql = "SELECT * FROM secretPost WHERE id = ?";

  con.query(sql, [request.params.id], function(err, result, fields){
    if(err) throw err;
    response.render('edit',{secretPost : result});
  });
});


/* 업데이트 */
app.post('/update/:id',(request, response)=>{
  const sql = "UPDATE secretPost SET ? WHERE id = "+request.params.id;

  con.query(sql, request.body, function(err, result, fields){
    if(err) throw err;
    console.log(result);
    response.redirect('/');
  });
});



/* 정상실행 시 console 출력 */ 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
