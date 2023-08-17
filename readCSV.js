const fs = require("fs");
const { parse } = require("csv-parse");

fs.createReadStream("./Downloads/people.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row)
    const findOne = (row, arrayOfNames) => {
      return arrayOfNames.some(v => row.includes(v));
  };
  console.log(findOne(row, ["Gunther", "Felita", "Michael", "James", "Otto"]));
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
  