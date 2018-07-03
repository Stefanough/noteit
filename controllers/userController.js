

const pg = require('pg');
require('dotenv').config();
const bodyParser = require('body-parser');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const connectionString = 'postgres://aupadlon:R9jDOCvYOaWQN_KEVFDez3UOVzV2tRIb@elmer.db.elephantsql.com:5432/aupadlon'

const client = new pg.Client({ connectionString })

client.connect(function (err) {
  if (err) {
    console.log("client connect: ", err);
  } else {
    console.log('hi');
  }
})

const userController = {

    verifyUsername: (req, res, next) => {

        if (req.body.name && req.body.password) {
            client.query(`SELECT password FROM users WHERE (name = '${req.body.name}');`, (err, results) => {
                console.log("checkUser log: ", results.rowCount);
                if(results.rowCount > 0) {
                    return res.send("This username already exists.");
 
                }
                else{
                    next();
                }
            })
        }
        else {
            return res.send("The username or password can't be empty");
          }
    },
    
    
    createUser: (req, res) => {
  
      let { name, password } = req.body;
      //let password = req.body.password;

      let promise = new Promise((resolve, reject) => {

        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
          if (err) return console.log("Salt gen: ", err);
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) return console.log("Hash gen: ", err);
            else {
              password = hash;
              resolve();
            }
          });
        });
      })

      promise.then(() => {
        console.log("hashed password: ", password);
        let q = `INSERT INTO users(name, password) VALUES ('${name}', '${password}');`;
        console.log("Our query is read: ", q);

        client.query(q, (err, results) => {
          console.log('query');
          if (err) console.log(err);
          else return res.send(true)
        });
      }).catch(err => {
        console.log("err promise: ", err);

      })
    
    

    // client.end();
    // });
    // Promise.all(promise)
    // .then(() => {
    //   console.log("Promise got resolved");
    //   db.end()
    // })
    // .catch((err) => {
    //   console.log("Error promise", err)});
  },

  checkUser: (req, res) => {

    client.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results.rows);
      }

    });
  },

  verifyUser: (req, res) => {
    let candidatePassword = req.body.password;
    let password;

    let promiseVerify = new Promise((resolve, reject) => {

      client.query(`SELECT password FROM users WHERE (name = '${req.body.name}');`, (err, results) => {
        console.log("username: ", req.body.name)
        if (err) reject();
        if (results.rows[0] === undefined) {
          console.log("result: ", results);
          return res.send(false);
        }
        else {
          password = results.rows[0].password;
          console.log("password: ", password);
          resolve();
        }

      });

    });

    console.log("CandidatePassword: ", candidatePassword);


    promiseVerify.then(() => {
      bcrypt.compare(candidatePassword, password, function (err, isMatch) {
        if (err) {
          console.log("compare error: ", err);
        } else if (isMatch) {
          return res.send(true);
        } else if (!isMatch) {
          return res.send(false);
        }
      });
    }).catch(err => {
      console.log("err promiseVerify: ", err);
    });
    // client.end();

  }
}

module.exports = userController;
/*
  _id         serial,
  name        VARCHAR(32) PRIMARY KEY,
  password    VARCHAR(255) NOT NULL,
  created     timestamptz,
  updated     timestamptz
*/