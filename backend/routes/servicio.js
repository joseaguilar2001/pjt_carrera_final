const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');


router.get('/servicio', (req, res) => {
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

router.get('/servicio/:id', (req, res) => {

    const { id } = req.params;
    mysqlconexion.query('select *from servicio where id= ?', [id], (error, rows, fields) => {
        if (!error) {
            res.json(rows[0]);
        } else {
            console.log(error);
        }
    });
});


//DELETE
router.delete('/servicio/:id', (req, res) => {

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

router.post('/servicio', (req, res) => {
    const { id, nombre, descripcion, estado } = req.body;

    mysqlconexion.query("INSERT INTO servicio(id, nombre, descripcion, estado) VALUES (?,?,?,?)", [id, nombre, descripcion, estado], (error, rows, fields) => {
        if (!error) {

            res.json({ status: "Se agrego correctamente" });
        }

        else {
            console.log(error);

        }
    });
});

//ACTUALIZAR

router.put('/servicio/:idc', (req, res) => {

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