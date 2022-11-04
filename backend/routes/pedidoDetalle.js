const express = require('express');
const router = express.Router();
const mysqlconexion = require('../db');


router.get('/', (req, res) => {
    mysqlconexion.query('SELECT d.id, d.idPedido, pe.correlativoUE AS pedido, d.idProducto, pro.nombre, codInsumo, d.fecha, d.cantidad, d.cantidadAutorizada, descripcion, renglonAfectado, valorEstimado, IncluidoPAAC, contratoAbierto'+
	' FROM pedidodetalle as d'+
    ' INNER JOIN pedido AS pe ON d.idPedido = pe.id'+
    ' INNER JOIN producto AS pro ON d.idProducto = pro.id;',
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
    mysqlconexion.query('select * from pedidoDetalle where id= ?', [id], (error, rows, fields) => {
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

    mysqlconexion.query('DELETE FROM pedidoDetalle where id= ?', [id], (error, rows, fields) => {
        if (!error) {

            res.json({ status: "Borrado" });
        }

        else {
            console.log(error);

        }

    });
});

//INSERTAR

router.post('/', (req, res) => {
    const { idPedido, idProducto, codInsumo, fecha, cantidad, cantidadAutorizada, descripcion, renglonAfectado, valorEstimado, IncluidoPAAC, contratoAbierto } = req.body;

    mysqlconexion.query("INSERT INTO pedidoDetalle(idPedido, idProducto, codInsumo, fecha, cantidad, cantidadAutorizada, descripcion, renglonAfectado, valorEstimado, IncluidoPAAC, contratoAbierto) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [idPedido, idProducto, codInsumo, fecha, cantidad, cantidadAutorizada, descripcion, renglonAfectado, valorEstimado, IncluidoPAAC, contratoAbierto], (error, rows, fields) => {
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

    const { idPedido, idProducto, codInsumo, fecha, cantidad, cantidadAutorizada, descripcion, renglonAfectado, valorEstimado, IncluidoPAAC, contratoAbierto} = req.body;
    const { id } = req.params;

    mysqlconexion.query("UPDATE pedidoDetalle SET idPedido = ?, idProducto = ?, codInsumo = ?, fecha = ?, cantidad = ?, cantidadAutorizada = ?, descripcion = ?, renglonAfectado = ?, valorEstimado = ?, IncluidoPAAC = ?, contratoAbierto = ? WHERE id = ?", [idPedido, idProducto, codInsumo, fecha, cantidad, cantidadAutorizada, descripcion, renglonAfectado, valorEstimado, IncluidoPAAC, contratoAbierto, id], (error, rows, fields) => {
        if (!error) {
            res.json({ status: "Se actualizo el detallepedido" });
        } else {
            console.log(error);
        }
    });

});

//Actualizar Monto Pedido
router.put('/encabezado/:id', (req, res) => {

    const { montoTotal } = req.body;
    const { id } = req.params;

    mysqlconexion.query("UPDATE pedido SET montoTotal = montoTotal + ? where id = ?", 
    [montoTotal, id], 
    (error, rows, fields) => {
        if (!error) {
            res.json({ status: "Se actualizo el monto del pedido" });
        } else {
            console.log(error);
        }
    });

})


module.exports = router;