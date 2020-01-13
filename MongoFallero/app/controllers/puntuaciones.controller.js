const Puntuacion = require('../models/puntuaciones.model.js');

// Obtener todos los puntuaciones
exports.findAll = (req,res) => {

    Puntuacion.find().then(puntuaciones=>{
        res.send(puntuaciones);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });

};


// Crear y salvar
exports.create = (req,res)=>{
    // Validamos el puntuacion
    if (!req.body){
        return res.status(400).send({
           message:"puntuacion Vacio..." 
        });
    }

    const puntuacion = new Puntuacion({
        idFalla: req.body.idFalla || "idFallaVacio",
        ip: req.body.ip || "127.0.0.1",
        puntuacion: req.body.puntuacion|| 42
    })

    puntuacion.save().then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message|| "Something was wrong creating puntuacion"
        });
    });
};

exports.buscaUna = (req,res)=>{
    Puntuacion.find({'idFalla':req.params.idFalla}).then(puntuaciones=>{
        //console.log(req.params);
        res.send(puntuaciones);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });
};

exports.findOne = (req,res)=>{
    Puntuacion.find({'idFalla':req.params.idFalla,'ip':req.params.ip}).then(puntuaciones=>{
        //console.log(req.params);
        res.send(puntuaciones);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });
};

exports.votadas = (req,res)=>{
    Puntuacion.find({'idFalla':req.params.idFalla,'ip':req.params.ip}).then(votadas=>{
        if(votadas=='') res.send(false);
        else res.send(coincidencias);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || 'Algo fue mal durante la captura de datos'
        });
    });
};

exports.update = (req,res)=>{
    let puntuacionId = req.params.puntuacionId;
    let update = req.body;
    console.log(req.body);
    Puntuacion.findByIdAndUpdate(puntuacionId,update,(err,puntuacionUpdated)=>{
        if(err) res.status(500).send({message: `Error actualizando puntuación: ${err}`})
        res.status(200).send({product:puntuacionUpdated})
    })
};