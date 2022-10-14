const jwt = require('json-web-token');

export const generateToken = (user) => {
    return jwt.sign({
        idRol: user.idRol,
        nombre: user.nombre,
        email: user.email,
        nroCelular: user.nroCelular,
        direccion: user.direccion,
        estado: user.estado,
    }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}