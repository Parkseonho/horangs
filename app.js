import express from "express";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "sbsst", // 사용자이름
    password: "sbs123414", // 비번
    database: "horang", // 데이터 베이스
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})