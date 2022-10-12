const mysql = require('mysql')

const mysqlconn = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: ''
}
);

mysqlconn.connect(function(error)
{
    if(error){
        console.log(error);
        return;
    }else{
        console.log('Conected!')
    }
});

module.exports = mysqlconn;