const { response } = require('express');
// const Evento = require('../models/Evento');
const Punto = require('../models/Puntos');

// las principal esta en routes/events
const getPunto = async(req, res = response) => {

   // retornar la lista de todos los eventos
   // populate('user', 'name'); me trae informacion especifica
  const puntos = await Punto.find();

   res.json({
      ok: true,
      // msg:'getPunto',
      // muestra todos los eventos
      puntos
   })

}
// tengo verificado que tengo el evento
const crearPunto = async (req, res = response) => {
  const punto = new Punto(req.body); // nueva instancia de mi modelo
   try {
//       // necesito el id del usuario
//       evento.user = req.uid;
console.log( req.body );

//       // grabamos el evento en la base
       const puntoGuardado = await punto.save(); // await espera q esto termine
      res.json({
         ok: true,
  
        punto: puntoGuardado
      })



   } catch (error) {
      console.log(error);
      // status 500 como un error interno 
      res.status(500).json({
         ok: false,
         msg: 'Pongase en contacto con el administrador'
      })
   }

}

const actualizarPunto = async (req, res = response) => {

   // obtener el id desde la url
    const puntoid = req.params.id;
   // el uid es el del usuario
  // const uid = req.uid

   // necesito interactuar con la base x eso va en un trycatch
   try {

      // verificar si existe en la base
      const punto = await Punto.findById(puntoid);

      // si el id no es correcto
      if (!punto) {
         // cuando algo no existe este es el codgio
         return res.status(404).json({
            ok: false,
            msg: 'El punto no existe con ese id'
         })
      }

      // si llega a este punto significa q si la persona creo la nota
      const nuevoPunto ={
         // desestrcuturo todo lo q viene en el
         ...req.body,
 
      }

      // aca ya tengo la nueva data es momento de actualizar
      // findByIdAndUpdate busca un evento por el id y lo actualiza
      const puntoActualizado = await Punto.findByIdAndUpdate( puntoid,nuevoPunto, {new: true} );

      return res.json({
         ok: true,
         msg:'Actualizado punto',
        punto: puntoActualizado
      });


   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: 'Pongase en contacto con el administrador'
      })
   }

}

const eliminarPunto = async (req, res = response) => {

   // obtener el id desde la url
   const puntoid = req.params.id;
    

   // necesito interactuar con la base x eso va en un trycatch
   try {

      // verificar si existe en la base
      const punto = await Punto.findById(puntoid);

      // si el id no es correcto
      if (!punto) {
         // cuando algo no existe este es el codgio
        return res.status(404).json({
            ok: false,
            msg: 'El evento no existe con ese id'
         })
      }

      // aca ya tengo la nueva data es momento de actualizar
      // findByIdAndUpdate busca un evento por el id y lo actualiza
       await Punto.findByIdAndDelete( puntoid, {new: true} )
      
      return res.json({
         ok: true,
      });


   } catch (error) {
      console.log(error);
     return res.status(500).json({
         ok: false,
         msg: 'Pongase en contacto con el administrador'
      })
   }



}




module.exports = {
    getPunto,
    crearPunto,
    actualizarPunto,
    eliminarPunto
}







 