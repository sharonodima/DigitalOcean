const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./population.db";


function connectToDatabase() {
  if (fs.existsSync(filepath)) {
      return new sqlite3.Database(filepath);
  } else {
      const db = new sqlite3.Database(filepath, (error) => {
          if (error) {
              return console.error(error.message);
          }
          createTable(db);
          console.log("Connected to the database successfully");
      });
      return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE migration
  (
  first_name VARCHAR(10),
  email      VARCHAR(10),
  gender     VARCHAR(50)
  )
`);
}

module.exports = connectToDatabase();

// function connectToDatabase() {
//   const db = new sqlite3.Database(filepath, (error) => {
//     if (error) {
//       return console.error(error.message);
//     }
//     console.log("Connected to the database successfully");
//   });
// createTable(db);
// }

// function createTable(db) {
//   db.exec(`
//   CREATE TABLE if not exists migration
//   (
//     first_name       VARCHAR(10),
//     email            VARCHAR(10),
//     gender           VARCHAR(50),
//     direction        VARCHAR(20),

//   )
// `);
// }

// module.exports = connectToDatabase();
