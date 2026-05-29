const express = require('express'); 
const mysql = require('mysql2'); 
const bodyParser = require('body-parser'); 
const app = express(); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 
const db = mysql.createConnection({ 
 host: 'localhost', 
 user: 'root', 
 password: '', 
 database: 'myDex' 
}); 
app.post('/leggtil', (req, res) => { 
 const { Navn, dex_id, Level, Type, Type2 } = req.body; 
 db.query( 
 'INSERT INTO brukere (navn, dex_id, level, type, type2) VALUES (?, ?, ?, ?, ?)', 
 [Navn, dex_id, Level, Type, Type2], 
 (err) => { 
 if (err) return res.send('Feil i databasen: ' + err.message); 
 res.send('Data lagt til!'); 
 } 
 ); 
}); 
app.listen(3000, () => { 
 console.log('Server kjører på http://localhost:3000'); 
}); 