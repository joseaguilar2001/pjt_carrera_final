const express = require('express')
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());

//Una por ruta OJO
app.use(require('./routes/servicio'));

app.listen(app.get('port'), () => {
    console.log('Port:', app.get('port'));
});