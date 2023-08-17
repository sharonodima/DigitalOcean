const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("./db");
 
fs.createReadStream("./Downloads/people.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        db.serialize(function () {
            db.run(
                `INSERT INTO migration VALUES (?, ?, ?)`,
                [row[0], row[1], row[2]],
                function (error) {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log(`Row inserted, ID: ${this.lastID}`);
                }
            );
        });
    });