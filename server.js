const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
let port = process.env.PORT;
if(port==null|| port==""){
    port = 3000;
}

//Conexión MongoDB
const dbConfig = require('./MongoFallero/config/database.config');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true}).then(()=>{
        console.log(" * Cargada y preparada en 2019");

    }).catch(err=>{
        console.log("Algo ha pasado...saliendo : ",err);
        process.exit();
    });


/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://adminFallero:mongo1234@cluster0-yzrtq.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("mongofallero").collection("mongofallero");
  // perform actions on the collection object
  client.close();
});*/
// Paginas publicas (estaticas)

app.use(express.static(path.join(__dirname, 'MongoFallero/public')));
// Escuchemos en un puerto

require('./MongoFallero/app/routes/puntuaciones.route.js')(app);

app.listen(port,() => {
    console.log(" * MongoFallero Running en http://localhost:3001");
});

