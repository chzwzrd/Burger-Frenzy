var connection = require('./connection');

var printQuestionMarks = (num) => {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
};

var objToSql = (obj) => {
    var arr = [];

    for (var key in obj) {
        var value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = `'${value}'`;
            }
            arr.push(`${key} = ${value}`);
        }
    }

    return arr.toString();
};

var orm = {
    selectAll: (table, cb) => {
        var queryString = 'SELECT * FROM ' + table;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: (table, cols, vals, cb) => {
        var queryString = 'INSERT INTO ' + table;
        queryString += " (" + cols.toString() + ") ";
        queryString += "VALUES (" + printQuestionMarks(vals.length) + ")";

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) console.error(err);
            cb(result);
        });
    },
    updateOne: (table, objColVals, condition, cb) => {
        var queryString = 'UPDATE ' + table;
        queryString += " SET " + objToSql(objColVals);
        queryString += " WHERE " + condition;

        console.log(queryString);

        connection.query(queryString, (err, result) => {
            if (err) console.error(err);
            cb(result);
        });
    },
    deleteOne: (table, condition, db) => {

    }
};

module.exports = orm;