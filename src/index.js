const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)


const sql = `CREATE TABLE IF NOT EXISTS people (id int, nome varchar(255))`
connection.query(sql);

const sql2 = `INSERT INTO people (nome)
                SELECT * FROM (SELECT 'DOUGLAS DECCO') AS tmp
                WHERE NOT EXISTS (
                    SELECT nome FROM people WHERE nome = 'DOUGLAS DECCO'
                ) LIMIT 1;`
connection.query(sql2);

var nome = "";
connection.query("SELECT * FROM people", function (err, result, fields) {
    if (err) throw err;
    nome = result[0].nome;
  });
connection.end();

app.get('/', (req,res) => {
    res.send('<h1>Full Cycle Rocks!</h1> <br/> <h1>' + nome + '</h1>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})