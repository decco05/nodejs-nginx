const express = require('express')
const app = express()

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const commandSqlCreateTable = `CREATE TABLE IF NOT EXISTS people (id int, nome varchar(255))`
const commandSqlInsert = `INSERT INTO people (nome) SELECT * FROM (SELECT 'DOUGLAS DECCO') AS tmp WHERE NOT EXISTS (SELECT nome FROM people WHERE nome = 'DOUGLAS DECCO') LIMIT 1;`
const commandSqlSelect = `SELECT nome FROM people` 

var nome = "";
connection.query(commandSqlCreateTable, function (err, result, fields) {
   connection.query(commandSqlInsert, function (err, result, fields) {
       connection.query(commandSqlSelect, function (err, result, fields) {    
           nome = result[0].nome;
           connection.end();
        });
    });
  });

  app.get('/', (req,res) => {
    res.send('<h1>Full Cycle Rocks!</h1> <br/> <h1>' + nome + '</h1>')
  });

app.listen(3000, () => console.log('Server ready'));