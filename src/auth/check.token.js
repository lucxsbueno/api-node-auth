const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, "qwe1234", (error, decoded) => {
                if (error) {
                    res.status(401).json({
                        success: false,
                        data: { message: "Token inválido ou expirado."}
                    });
                } else { next(); }
            })
        } else {
            res.status(401).json({
                success: false,
                data: { message: "Acesso negado! Usuário não autorizado." }
            });
        }
    }
}