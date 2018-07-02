/*
  _id         serial PRIMARY KEY,
  title       VARCHAR(255),
  url         TEXT,
  html        TEXT,
  css         TEXT,
  user_id     INTEGER NOT NULL,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES users (_id)
*/

const pg = require('pg');
require('dotenv').config();
const bodyParser = require('body-parser');

const connectionString = 'postgres://aupadlon:R9jDOCvYOaWQN_KEVFDez3UOVzV2tRIb@elmer.db.elephantsql.com:5432/aupadlon'

const client = new pg.Client({connectionString})

client.connect(function (err) {
  if (err) {
    console.log("client connect: ", err);
  } else {
   // console.log('success?');
  }
});


const noteController = {

  getAllNotes(req, res) {
    client.query('SELECT * FROM notes;', (err, results) => {
      console.log('in notes');
      if (err) {
        console.log(err);
      } else {
        res.json(results.rows);
      }
      client.end();
    });
  },

  getNotesByUser(req, res) {
    const userID = req.body.user_id;

    client.query(`SELECT * FROM notes WHERE user_id = ${userID}`, (err, results) => {
      console.log('in notes');
      if (err) {
        console.log(err);
      } else {
        res.json(results.rows);
      }
      client.end();
    });
  },

  getNoteByID(req, res) {
    const noteId = req.body.note_id;

    client.query(`SELECT * FROM notes WHERE _id = ${noteID}`, (err, results) => {
      if (err) {
        console.log('error:', err);
      } else {
        res.sed(results);
      }
      client.end();
    });
  },

  createNote(req, res) {
    let { _id, title, url, html, css, user_id, } = req.body;
    let q = `INSERT INTO notes VALUES (${_id}, '${title}', '${url}', '${html}', '${css}', ${user_id})`
    console.log(q);
    client.query(q, (err, results) => {
      if (err) {
        console.log('error:', err);
        res.end();
      } else {
        res.send(results);
      }
      client.end();
    });
  },

  deleteNote(req, res) {
    let noteID = req.body.note_id;
    client.query(`DELETE FROM notes WHERE _id = ${noteID}`, (err, results) => {
      if (err) {
        console.log('error:', err);
      } else {
        res.send(results);
      }
      client.end();
    });
  },

  // updateNote: {
  // }
}

module.exports = noteController; 
