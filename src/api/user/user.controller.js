const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const { sign } = require('jsonwebtoken');

/**
 *
 *
 * User services
 */
const {
    createUser,
    updateUser,
    deleteUser,
    findUserById,
    findAllUsers,
    searchUser,
    findUserByUserEmail
} = require('./user.service');

module.exports = {
    createUser: (req, res) => {
        const salt = genSaltSync(10);
        req.body.pass = hashSync(req.body.pass, salt);

        createUser(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "A conexão com o banco de dados falhou."
                });
            }
            return res.status(201).json({
                success: true,
                message: "Usuário criado com sucesso.",
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        updateUser(req.body, req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "A conexão com o banco de dados falhou."
                });
            }
            return res.status(200).json({
                success: true,
                message: "Usuário editado com sucesso.",
                data: results
            });
        });
    },

    deleteUser: (req, res) => {
        deleteUser(req.params.id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: false,
                    data: { message: "O usuário não foi encontrado." }
                });
            }
            return res.status(200).json({
                success: true,
                data: { message: "Usuário deletado com sucesso!" }
            });
        });
    },

    findUserById: (req, res) => {
        const id = req.params.id;
        findUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: false,
                    data: { message: "Nenhum usuário encontrado." }
                });
            }
            return res.status(200).json({
                success: true,
                data: results
            });
        });
    },

    findAllUsers: (req, res) => {
        findAllUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(404).json({
                    success: false,
                    data: { message: "Nenhum usuário encontrado." }
                });
            }
            return res.status(200).json({
                success: true,
                data: results
            });
        });
    },

    searchUser: (req, res) => {
        searchUser(req.query.q, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results || results.length === 0) {
                return res.status(404).json({
                    success: false,
                    data: { message: "Nenhum registro encontrado." }
                });
            }

            results.forEach(user => {
                user.pass = undefined;
            });

            return res.status(200).json({
                success: true,
                data: results
            });
        });
    },

    signin: (req, res) => {
        findUserByUserEmail(req.body.email, (err, results) => {

            if (err) {
                console.log("[controller error]: ", err);
            }

            //if there are no records
            if (!results) {
                return res.status(401).json({
                    success: false,
                    data: { message: "E-mail ou senha inválidos. Tente novamente." }
                });
            }

            //compare if password is correct
            const isRight = compareSync(req.body.pass, results.pass);

            if (isRight) {

                //delete password record
                results.pass = undefined;

                const jwt = {
                    payload: { user: results },
                    secret: process.env.SECRET_KEY,
                    options: {
                        issuer: "auth-api",
                        algorithm: "HS256",
                        expiresIn: "120000ms"
                    }
                }

                sign(
                    jwt.payload,
                    jwt.secret,
                    jwt.options,
                    (err, token) => {
                    if (err) {
                        console.log("[jwt error]: ", err);
                    }

                    return res.status(202).json({
                        success: true,
                        message: "Login efetuado com sucesso!",
                        token: token,
                        user: results
                    });
                });
            } else {
                return res.status(401).json({
                    success: false,
                    data: { message: "E-mail ou senha inválidos! Tente novamente." }
                });
            }
        });
    }
};
