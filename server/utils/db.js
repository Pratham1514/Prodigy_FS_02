import mysql from "mysql";
import "dotenv/config";

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});

con.connect(function (err) {
  if (err) {
    console.log("Connection error");
  } else {
    console.log("Connected");
  }
});

export default con;
