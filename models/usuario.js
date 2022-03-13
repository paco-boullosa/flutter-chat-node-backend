const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:  {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true
    },
    online:  {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function() {
    // este metodo se usa solo como respuesta a la creacion del registro, para que se pueda
    // utilizar el id creado. Por lo tanto, de la respuesta  se eliminan datos que no interesa 
    // mostrar, como la password, etc.
    const { __v, _id, password, ...objeto } = this._doc; // se quitan estas propiedades
    objeto.uid = _id;  // se añade esta
    return objeto;
});

module.exports = model('Usuario', UsuarioSchema);