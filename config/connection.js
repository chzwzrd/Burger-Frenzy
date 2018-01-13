var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'burgers_db'
    });
}

connection.connect((err) => {
    if (err) {
        console.error(`Error connection: ${err.stack}`);
        return;
    }
    console.log(`Connected at id: ${connection.threadId}`);
});

module.exports = connection;