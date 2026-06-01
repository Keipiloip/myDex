const express = require('express'); 
const mysql = require('mysql2'); 
const bodyParser = require('body-parser'); 
const app = express(); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
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
app.get('/api/pokemon', (req, res) => { 
 db.query('SELECT * FROM pokemon', (err, results) => { 
 if (err) return res.status(500).json({ error: err.message }); // If an error occurs
 res.json(results); // Sends the data as JSON (list of Pokémon)
 }); 
}); 

app.delete('/api/pokemon/:id', (req, res) => {
 const id = req.params.id;
 db.query(
 'DELETE FROM pokemon WHERE id = ?', 
 [id],
 (err) => {
 if (err) return res.status(500).json({ error: err.message });
 res.json({ message: 'Pokémon slettet' });
 } 
 );
});

app.put('/api/pokemon/:id', (req, res) => {
 const id = req.params.id;
 const { navn, dex_id, level, type, type2 } = req.body;
 db.query(
 'UPDATE pokemon SET navn = ?, dex_id = ?, level = ?, type = ?, type2 = ? WHERE id = ?', 
 [navn, dex_id, level, type, type2, id],
 (err) => {
 if (err) return res.status(500).json({ error: err.message });
 res.json({ message: 'Pokémon oppdatert' });
 } 
 );
});

app.listen(3000, () => { 
 console.log('Server kjører på http://localhost:3000'); 
}); 

