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
 database: 'myDexapp' 
}); 
app.post('/add', (req, res) => { 
 const { navn, dex_id, level, type, type2 } = req.body; 
 db.query( 
 'INSERT INTO pokemon (navn, dex_id, level, type, type2) VALUES (?, ?, ?, ?, ?)', 
 [navn, dex_id, level, type, type2], 
 (err) => { 
 if (err) return res.send('Error in database: ' + err.message); 
 res.send('Data added!'); 
 } 
 ); 
}); 
app.listen(3000, () => { 
 console.log('Server kjører på http://localhost:3000'); 
}); 