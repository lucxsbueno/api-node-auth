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

    signin: (req, res) => {
        findUserByUserEmail(req.body.email, (err, results) => {
            if (err) {
                console.log("[controller error]: ", err);
            }
            if (!results) {
                return res.status(401).json({
                    success: false,
                    data: { message: "E-mail ou senha inválidos. Tente novamente." }
                });
            }
            const comparePass = compareSync(req.body.pass, results.pass);
            if (comparePass) {

                comparePass.pass = undefined;
                const jwt = sign({ comparePass: results }, "qwe1234", {
                    expiresIn: "1h"
                });

                results.pass = undefined;
                
                return res.status(202).json({
                    success: true,
                    token: jwt,
                    data: {
                        message: "Login efetuado com sucesso!",
                        user: results
                    }
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
