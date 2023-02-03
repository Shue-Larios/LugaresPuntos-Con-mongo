const { Schema, model } = require('mongoose');

// como queremos q luzca el Schema que es como la informacion que voy a grabar en la base
// esto seria como una tabla de mysql
const PuntoSchema = Schema({

    // aca es la configuracion del campo diseño de la base
    codigo: {
        type: Number,
        required: true,
    },
    latitud: {
        type: Number,
        required: true,
    },
    longitud: {
        type: Number,
        required: true,
    }, 
    idLugar: {
        type: String,
        required: true,
    }  
});


// Evento es como se va a llamar en otro archivo y el Schema q va a utilizar
module.exports = model('Punto', PuntoSchema);