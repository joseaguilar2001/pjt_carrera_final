const express = require('express');
const router = express.Router();
const mysql = require('../db');
const bcrypt = require('bcrypt');
const expressAsyncHandler = require('express-async-handler');
const utils = require('../utils');

router.post('/signup', expressAsyncHandler(async(req, res) => {
    const password = req.body.password;    
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const nuevo = {
        idRol: req.body.idRol,
        nombre: req.body.nombre,
        email: req.body.email,
        password: encryptedPassword,
        nroCelular: req.body.nroCelular,
        direccion: req.body.direccion,
        estado: req.body.estado,
    };
    mysql.query('INSERT INTO usuario(idRol, nombre, email, password, nroCelular, direccion, estado) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [nuevo.idRol, nuevo.nombre, nuevo.email, nuevo.password, nuevo.nroCelular, nuevo.direccion, nuevo.estado], 
    async function(error, results, fields) {
        if (error) {        
                res.send({          
                code:400,          
                failed:"error occurred",          
                error : error});   
            } else {
                res.send({          
                    code:200,          
                    success:"user registered sucessfully",
                    nombre: nuevo.idRol,
                    email: nuevo.email,
                    nroCelular: nuevo.nroCelular,
                    direccion:  nuevo.direccion,
                    estado: 1,

                });
            }});
}));

router.post('/signin', expressAsyncHandler(async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    mysql.query("SELECT u.id, r.nombre as rol, u.nombre, u.email, u.password, u.nroCelular, u.direccion FROM usuario u"  
    + " INNER JOIN rol r " 
    + "ON u.idRol  = r.id "
    + "WHERE u.email = ?; ", [email], async function(error, results, fields){
        if (error) {        
                res.send({          
                code:400,          
                failed:"error occurred",          
                error : error        
                });      
        }else{        
            if(results.length > 0){
                const comparison = await bcrypt.compare(password, results[0].password)
                if(comparison){
                    const user = {
                        id: results[0].id,
                        idR: results[0].idR,
                        rol: results[0].rol,
                        nombre: results[0].nombre,
                        email: results[0].email,
                        nroCelular: results[0].nroCelular,
                        direccion: results[0].direccion,
                        estado: results[0].estado,
                    };
                    const token = utils(user);
                    req.session.token = token;
                    res.send({
                        code:200,
                        success:"login successful",
                        id: results[0].id,
                        rol: results[0].rol,
                        nombre: results[0].nombre,
                        email: results[0].email,
                        nroCelular: results[0].nroCelular,
                        direccion: results[0].direccion,
                        estado: results[0].estado,
                        token: token
                    });
                }else{
                    res.send({code:204, error:"El correo y la contrase??a no coinciden"});
                }
            }else {
                res.send({"code":206, "error":"El correo no existe"});
            }
        }
    });
}));

router.post('/create', expressAsyncHandler(async(req, res) => {
    const password = req.body.password;    
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const nuevo = {
        idRol: req.body.idRol,
        nombre: req.body.nombre,
        email: req.body.email,
        password: encryptedPassword,
        nroCelular: req.body.nroCelular,
        direccion: req.body.direccion,
        estado: 1,
    };
    mysql.query('INSERT INTO usuario(idRol, nombre, email, password, nroCelular, direccion, estado) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [nuevo.idRol, nuevo.nombre, nuevo.email, nuevo.password, nuevo.nroCelular, nuevo.direccion, nuevo.estado], 
    async function(error, results, fields) {
        if (error) {        
                res.send({          
                code:400,          
                failed:"error occurred",          
                error : error});   
            } else {
                res.send({          
                    code:200,          
                    success:"user registered sucessfully",
                    nombre: nuevo.idRol,
                    email: nuevo.email,
                    nroCelular: nuevo.nroCelular,
                    direccion:  nuevo.direccion,
                    estado: 1,
                });
            }});
}));

router.get('/', expressAsyncHandler(async(req, res) => {
    mysql.query(`SELECT u.id as id, r.id as idRol, r.nombre as rol, u.nombre as nombre, 
    u.nroCelular as nroCelular, u.email as email, u.direccion as direccion, 
    u.estado AS estado
    FROM usuario u 
    INNER JOIN rol AS r 
    ON u.idRol = r.id`, async (error, rows, fields) => {
        if(error){
            res.send({message: "Error"});
        } else {
            res.json(rows);
        }
    })
}));

router.get('/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params; 
    mysql.query('SELECT * FROM usuario WHERE id = ?', [id] ,async (error, rows, fields) => {
        if(error){
            res.send({message: "Error"});
        } else {
            res.json(rows[0]);
        }
    })
}));

router.put('/update/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    const password = req.body.password;    
    const encryptedPassword = bcrypt.hashSync(password, 10)
    const nuevo = {
        idRol: req.body.idRol,
        nombre: req.body.nombre,
        email: req.body.email,
        password: encryptedPassword,
        nroCelular: req.body.nroCelular,
        direccion: req.body.direccion,
        estado: req.body.estado,
    };
    mysql.query(`UPDATE usuario SET idRol = ?, 
    nombre = ?, email=?, password=?, nroCelular=?,
    direccion=?, estado=? WHERE id = ?`, [nuevo.idRol, nuevo.nombre, nuevo.email,
    nuevo.password, nuevo.nroCelular, nuevo.direccion, nuevo.estado, id], async function(error, rows, fields){
        if (error) {        
            res.send({          
            code:400,          
            failed:"error occurred",          
            error : error})      
        } else {        
            res.json(rows);
        }

    });
}));

router.delete('/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    mysql.query('UPDATE usuario SET estado = 0 WHERE id = ?',[id], async function(error, rows, fields){
        if(error){
            res.send({code: 400, failed: "Error en actualizar"});
        }else{
            res.send({code: 200, success: "Usuario eliminado"})
        }
    })
}));

router.get('/signout', expressAsyncHandler(async(req, res) => {
    req.session.destroy(function(err){
        if(!err){

        }else{
            res.status(200).send({message: 'Adiosito'});
        }
    })
}));

module.exports = router;