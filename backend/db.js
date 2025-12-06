const mysql = require("mysql2");
require("dotenv").config(); 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

module.exports = db;
// create table medicines (
//     id int auto_increment primary key,
//     medicineName varchar(80) not null,
//     type varchar(50) not null,
//     Qty int ,
//     Price int
// );

// insert into medicines values (1, "Paracetamol", "Tablet", 20, 50);
// insert into medicines values (2,"Cough Syrup", "Syrup", 10, 120);
// insert into medicines values (3,"Insulin", "Injection", 5, 300);
// insert into medicines values (4,"Vitamin C", "Tablet", 50, 80);