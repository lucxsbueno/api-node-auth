const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {

        let token = req.get("authorization");

        if (token) {
            
            token = token.slice(7);

            verify(token, process.env.SECRET_KEY, (error, decoded) => {
                
                console.log(decoded);

                if (error) {

                    if (error.name === "TokenExpiredError") {
                        res.status(401).json({
                            success: false,
                            message: "Token expirado.",
                            expiredAt: error.expiredAt 
                        });
                    }

                    if (error.name === "JsonWebTokenError") {
                        res.status(401).json({
                            success: false,
                            data: { message: "O token fornecido é inválido."}
                        });
                    }
                } else { 
                    next();
                }
            })
        } else {
            res.status(401).json({
                success: false,
                data: { message: "Acesso negado! Usuário não autorizado." }
            });
        }
    }
}