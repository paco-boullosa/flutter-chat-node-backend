const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({
    de:  {
        type: Schema.Types.ObjectId,    // este campo es un objeto de BD
        ref: 'Usuario',                 // que hace referencia a esta Coleccion
        required: true
    },
    para:  {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje:  {
        type: String,
        required: true
    }
}, {
    timestamps: true                    // en lugar de almacenar la fecha en el modelo es mas optimo para Mongo ponerlo asi
});

MensajeSchema.method('toJSON', function() {
    // De la respuesta  se eliminan datos que no interesan
    const { __v, _id, ...objeto } = this._doc; // se quitan estas propiedades
    return objeto;
});

module.exports = model('Mensaje', MensajeSchema);