const pool = require('../../database/db');

module.exports = {
    createUser: (data, callBack) => {
        const { name, email, pass } = data;

        pool.query(
            `INSERT INTO user(name, email, pass)
                VALUES(?, ?, ?)`, [ name, email, pass ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },

    updateUser: (data, id, callBack) => {
        const { name, email } = data;

        pool.query(
            `UPDATE user SET name = ?, email = ? WHERE id = ?`,
            [ name, email, id ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }
        );
    },

    deleteUser: (id, callBack) => {
        pool.query(
            `DELETE FROM user WHERE id = ?`, [ id ], (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },

    findUserById: (id, callBack) => {
        pool.query(
            `SELECT * FROM user WHERE id = ?`, [ id ],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }
        );
    },

    findAllUsers: callBack => {
        pool.query(
            `SELECT name, email FROM user`, [], (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },

    findUserByUserEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM user WHERE email = ?`,
            [ email ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }
        );
    },

    searchUser: (query, callBack) => {
        pool.query(
            `SELECT * FROM user WHERE name LIKE ? OR email LIKE ?`,
            [ `%${query}%`, `%${query}%` ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    }
};