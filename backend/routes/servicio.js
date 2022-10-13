const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');


router.get('/', (req, res) => {
    mysqlconexion.query('Select * from servicio',
        (error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {

                console.log(error);
            }
        });
});

//GET

router.get('/:id', (req, res) => {

    const { id } = req.params;
    mysqlconexion.query('select * from servicio where id= ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});


//DELETE
router.delete('/:id', (req, res) => {

    const { id } = req.params;

    mysqlconexion.query('DELETE FROM servicio where id= ?', [id], (error, rows, fields) => {
        if (!error) {

            res.json(rows[0]);
        }

        else {
            console.log(error);

        }

    });
});

//INSERTAR

router.post('/', (req, res) => {
    const {nombre, descripcion, estado } = req.body;
    mysqlconexion.query("INSERT INTO servicio(nombre, descripcion, estado) VALUES (?,?,?)", [nombre, descripcion, estado], (error, rows, fields) => {
        if (!error) {
            res.json({ status: "Se agrego correctamente" });
        }
        else {
            console.log(error);
        }
    });
});

//ACTUALIZAR

router.put('/:id', (req, res) => {

    const { nombre, descripcion, estado } = req.body;
    const { id } = req.params;

    mysqlconexion.query("UPDATE servicio SET nombre = ?, descripcion = ?, estado =? WHERE id = ?", [nombre, descripcion, estado, id], (error, rows, fields) => {
        if (!error) {
            res.json({ status: "Se actualizo el servicio" });
        } else {
            console.log(error);
        }
    });

});


module.exports = router;