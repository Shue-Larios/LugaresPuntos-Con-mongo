const { Schema, model } = require('mongoose');

// como queremos q luzca el Schema que es como la informacion que voy a grabar en la base
// esto seria como una tabla de mysql
const LugareSchema = Schema({

    // aca es la configuracion del campo diseño de la base
    nombre: {
        type: String,
        required: true,
    },
    disponible: {
        type: String,
        required: true,
    },
    rango: {
        type: Number,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },

});



// Evento es como se va a llamar en otro archivo y el Schema q va a utilizar
module.exports = model('Lugare', LugareSchema);