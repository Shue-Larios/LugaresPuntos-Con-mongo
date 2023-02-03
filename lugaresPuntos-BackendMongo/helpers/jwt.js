// una funcion encargada de generar nuestro json web token
// hay q instalar npm i jsonwebtoken
const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        // creamos el payload
        const payload = { uid };
        // para firmar un token
        // se ocupa el payload
        // SECRET_JWT_SEED es una variable de entorno
        // y la duracion del jwt
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h' // dice que expira en una hora
            // esto x si no se podria firmar x alguna razon
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }
            resolve(token);
        })
    })
}

module.exports = {
    generarJWT
}