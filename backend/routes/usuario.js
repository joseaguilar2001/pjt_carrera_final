import { put } from './presentacion';

const express = require('express');
const router = express.Router();
const mysql = require('../db');
const bcrypt = require('bcrypt');
const expressAsyncHandler = require('express-async-handler');
const { generateToken } = require('../utils');

router.post('/signup', expressAsyncHandler(async(req, res) => {
    const password = req.body.password;    
    const encryptedPassword = bcrypt.hashSync(password)
    const nuevo = {
        idRol: req.body.idRol,
        nombre: req.body.nombre,
        email: req.body.email,
        password: encryptedPassword,
        nroCelular: req.body.nroCelular,
        direccion: req.body.direccion,
        estado: 1,
    };
    mysql.query('INSERT INTO usuario(idRol, nombre, email, password, nroCelular, direccion, estado) ?', 
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
                    idRol: req.body.idRol,
                    nombre: req.body.nombre,
                    email: req.body.email,
                    nroCelular: req.body.nroCelular,
                    direccion: req.body.direccion,
                    estado: 1,
                    token: generateToken(nuevo),
                });
            }});
}));

router.post('/signin', expressAsynHandler(async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    mysql.query("SELECT * WHERE email = ?", [email], async function(error, results, fields){
        if (error) {        
                res.send({          
                code:400,          
                failed:"error occurred",          
                error : error        
            });      
            }else{        
            if(results.length >0){
                const comparison = await bcrypt.compare(password, results[0].password)
                if(comparison){
                    res.send({
                        code:200,
                        success:"login successful",
                        id: results[0].id,
                        idRol: results[0].idRol,
                        nombre: results[0].nombre,
                        email: results[0].email,
                        nroCelular: results[0].nroCelular,
                        direccion: results[0].direccion,
                        estado: results[0].estado,
                        token:generateToken(results),
                    });
                }else{
                    res.send({"code":204, "error":"El correo y la contraseña no coinciden"});
                }
            }else {
                res.send({"code":206, "error":"El correo no existe"});
            }
        }
    });
    return;
}));

router.put('/:id', expressAsynHandler(async(req, res) => {
    const { id } = req.params;
    const password = req.body.password;    
    const encryptedPassword = bcrypt.hashSync(password)
    const nuevo = {
        idRol: req.body.idRol,
        nombre: req.body.nombre,
        email: req.body.email,
        password: encryptedPassword,
        nroCelular: req.body.nroCelular,
        direccion: req.body.direccion,
        estado: 1,
    };
    mysql.query(`UPDATE usuario SET idRol = ?, 
    nombre = ?, email=?, password=?, nroCelular=?,
    direccion=?, estado=? VALUES (?,?,?,?,?,?,?)`, [nuevo.idRol, nuevo.nombre, nuevo.email,
    nuevo.password, nuevo.nroCelular, nuevo.direccion, nuevo.estado, id], async function(error, rows, fields){
        if (error) {        
            res.send({          
            code:400,          
            failed:"error occurred",          
            error : error})      
        } else {        
            res.send({          
                code:200,          
                success:"Usuario actualizado",
                id: results[0].id,
                idRol: results[0].idRol,
                nombre: results[0].nombre,
                email: results[0].email,
                nroCelular: results[0].nroCelular,
                direccion: results[0].direccion,
                estado: results[0].estado
            })
        }

    });
    return;
}));

router.delete('/:id', expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    mysql.query('UPDATE usuario SET estado = ?',[id], async function(error, rows, fields){
        if(error){
            res.send({code: 400, failed: "Error en actualizar"});
        }else{
            res.send({code: 200, success: "Usuario eliminado"})
        }
    })
}))
export default router;