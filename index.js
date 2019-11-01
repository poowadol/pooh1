const express = require('express')
const app = express()
const bodyParser  = require('body-parser');
const cors = require("cors");
const port = 3001
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.get('/', (req, res) => res.send('Hello World!'))

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pooh"
});
con.connect(function(err) {
    if (err) throw err;
});



function Query(sql){
    return new Promise((resolve,reject)=>{
        con.query(sql, function (err, rows, fields) {
            if(err){
                console.log(err);
                resolve([]);
            }
            else{
                resolve(rows);
            }
        });

    });
}

app.post('/login', async function(req, res) {
    let topic = "username,email";
	let condition = "username = '" + req.body.username + "' AND pass = '" + req.body.pass + "'";
    let sql = "SELECT "+ topic +" FROM user where " + condition;
    let query1 = await Query(sql);
	res.json(query1)
});

app.post('/register', function(req, res) {

    let topic = "username, pass , email";
    let data = "'"+req.body.username + "','" + req.body.pass +"','" + req.body.email + "'" ;
    let sql = "INSERT INTO user ("+ topic + ") VALUES ("+ data + ")";
    Query(sql);

    res.json("ok");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))