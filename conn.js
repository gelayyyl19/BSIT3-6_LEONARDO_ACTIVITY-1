const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",   
    user: "root",        
    password: "",       
    database: "ui_3_6_26" 
});

conn.connect((err) => {
    if (err) {
        console.error('Connection failed: ', err.message);
        return;
    }
    console.log('Connected to XAMPP MySQL Database successfully!');
});

module.exports = conn;