const { response } = require('express');
//  const Evento = require('../models/Evento');
const Lugare = require('../models/Lugares');


// las principal esta en routes/events
const getLugar = async (req, res = response) => {

   // retornar la lista de todos los eventos
   // populate('user', 'name'); me trae informacion especifica
   const lugares = await Lugare.find();

   res.json({
      ok: true,
      // msg: 'getLugar',
      // muestra todos los eventos
      lugares
   })

}
// tengo verificado que tengo el evento
const crearLugar = async (req, res = response) => {
   const lugar = new Lugare(req.body); // nueva instancia de mi modelo
   try {
      //       // necesito el id del usuario
      //       evento.user = req.uid;
      console.log(req.body);

      //       // grabamos el evento en la base
      const lugarGuardado = await lugar.save(); // await espera q esto termine
      res.json({
         ok: true,
         lugar: lugarGuardado
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

const actualizarLugar = async (req, res = response) => {

   // obtener el id desde la url
   const lugarid = req.params.id;
   // el uid es el del usuario
   //    const uid = req.uid

   // necesito interactuar con la base x eso va en un trycatch
   try {

      // verificar si existe en la base
      const lugar = await Lugare.findById(lugarid);

      // si el id no es correcto
      if (!lugar) {
         // cuando algo no existe este es el codgio
         return res.status(404).json({
            ok: false,
            msg: 'El lugar no existe con ese id'
         })
      }


      // si llega a este punto significa q si la persona creo la nota
      const nuevoLugar = {
         // desestrcuturo todo lo q viene en el
         ...req.body,
      }

      // aca ya tengo la nueva data es momento de actualizar
      // findByIdAndUpdate busca un evento por el id y lo actualiza
      const lugarActualizado = await Lugare.findByIdAndUpdate(lugarid, nuevoLugar, { new: true });

      return res.json({
         ok: true,
         msg: 'Actualizado lugar',
         lugar: lugarActualizado
      });


   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: 'Pongase en contacto con el administrador'
      })
   }

}

const eliminarLugar = async (req, res = response) => {

      // obtener el id desde la url
      const lugarid = req.params.id;
      // el uid es el del usuario
      // const uid = req.uid

   // necesito interactuar con la base x eso va en un trycatch
      try {

         // verificar si existe en la base
         const lugar = await Lugare.findById(lugarid);

         // si el id no es correcto
         if (!lugar) {
            // cuando algo no existe este es el codgio
           return res.status(404).json({
               ok: false,
               msg: 'El evento no existe con ese id'
            })
         }
         // aca ya tengo la nueva data es momento de actualizar
         // findByIdAndUpdate busca un evento por el id y lo actualiza
          await Lugare.findByIdAndDelete( lugarid, {new: true} )

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
   getLugar,
   crearLugar,
   actualizarLugar,
   eliminarLugar
}







