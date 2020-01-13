const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const dbConfig = require('MongoFallero/config/database.config');
const mongoose = require('mongoose');
let port = process.env.PORT;

if(port==null|| port==""){
    port = 3000;
}

//Conexión MongoDB


app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true}).then(()=>{
        console.log(" * Cargada y preparada en 2020");

    }).catch(err=>{
        console.log("Algo ha pasado...saliendo : ",err);
        process.exit();
    });



// Paginas publicas (estaticas)

app.use(express.static(path.join(__dirname, 'MongoFallero/public')));
// Escuchemos en un puerto

require('./MongoFallero/app/routes/puntuaciones.route.js')(app);

app.listen(port,() => {
    console.log(" * MongoFallero Running en http://localhost:3001");
});

