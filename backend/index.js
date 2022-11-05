const express = require('express');
const app = express();
const cors = require('cors');

var presentacionRoute = require('./routes/presentacion');
var servicioRoute = require('./routes/servicio');
var solicitanteRoute = require('./routes/solicitante');
var ejecutorRoute = require('./routes/ejecutores');
var kardexRoute = require('./routes/kardex');
var productoRoute = require('./routes/producto');
var loteRoute = require('./routes/lotes');
var dKardexRoute = require('./routes/detalleKardex');
var pedidoRoute = require('./routes/pedido');
var pedidoDetalleRoute = require('./routes/pedidoDetalle');
var usuarioRoute = require('./routes/usuario');
var rolRoute = require('./routes/rol');
var bingresoSistemaRoute = require('./routes/bingresoSistema');
var permisosRoute = require('./routes/permisos');
var ingresoRoute = require('./routes/ingreso');
var requisicionRoute = require('./routes/requisicion');
const cookieSession = require("cookie-session");
var dRequisicionRoute = require('./routes/detalleRequisicion');
var auditoriaRoute = require('./routes/auditoria');
//var index = require('./routes/index');

app.set('port', process.env.PORT || 8080);
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(
    cookieSession({
        name: "equipo4-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true,
        sameSite: 'strict'
    })
)
app.use('/presentacion', presentacionRoute);
app.use('/servicio', servicioRoute);
app.use('/solicitante', solicitanteRoute);
app.use('/ejecutores', ejecutorRoute);
app.use('/kardex', kardexRoute);
app.use('/producto', productoRoute);
app.use('/lotes', loteRoute);
app.use('/detalleKardex', dKardexRoute);
app.use('/pedido', pedidoRoute);
app.use('/pedidoDetalle', pedidoDetalleRoute);
app.use('/usuario', usuarioRoute);
app.use('/rol', rolRoute);
app.use('/bingresoSistema', bingresoSistemaRoute);
app.use('/permisos', permisosRoute);
app.use('/ingreso', ingresoRoute);
app.use('/requisicion', requisicionRoute);
app.use('/detalleRequisicion', dRequisicionRoute);
app.use('/auditoria', auditoriaRoute)
//app.use('/index', index);

app.listen(app.get('port'), () => {
    console.log('Port:', app.get('port'));
});