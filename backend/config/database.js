import mysql from "mysql2";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mevnstack'
});

db.connect(error => {
    if (error) throw error;
    console.log("Succesfully Connected To Database");
})

export default db;