module.exports = (app) => {
    const puntuaciones = require('../controllers/puntuaciones.controller.js');

    // Create a new puntuaciones
    app.post('/api/puntuaciones', puntuaciones.create);

    // Retrieve all puntuaciones
    app.get('/api/puntuaciones', puntuaciones.findAll);

    // Retrieve a single puntuaciones with puntuacionId
    app.get('/api/puntuaciones/:idFalla', puntuaciones.buscaUna);

    // Retrieve true or false if vote exists
    app.get('/api/puntuaciones/votadas/:idFalla/:ip', puntuaciones.findOne);

    // Update a puntuaciones with puntuacionId
    app.put('/api/puntuaciones/:puntuacionId', puntuaciones.update);

    // Delete a puntuaciones with puntuacionId
    //app.delete('/puntuaciones/:puntuacionId', puntuaciones.delete);
}