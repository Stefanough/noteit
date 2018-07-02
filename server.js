'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const noteController = require ('./controllers/noteController');
const userController = require ('./controllers/userController');

require('dotenv').config();
const app = express();

const PORT = 5535;

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// User routing
app.post('/signup', userController.createUser, userController.checkUser);
app.post('/login', userController.verifyUser);

// Note routing
// get all notes (for testing purposes)
app.get('/notes/all', noteController.getAllNotes);

// get one note by note id
app.get('/notes/:note_id', noteController.getNoteByID);

// get all notes belonging to one user
app.get('/notes/:user_id', noteController.getNotesByUser);

// create a note
app.post('/notes/create', noteController.createNote);

// update a note
// app.put('/notes/:note_id', );

// delete a note
app.delete('/notes/delete', noteController.deleteNote);

// Routing
// app.get('/', (req, res, next) => {
//   res.redirect('/home', )
// });

app.use(express.static(path.join(__dirname, 'build')));
