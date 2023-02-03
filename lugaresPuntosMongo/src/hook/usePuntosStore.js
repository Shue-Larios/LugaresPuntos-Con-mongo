import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { lugarApi } from '../api';
import { onAddNewPunto, onCloseModal, onDeletePunto, onLoadPunto, onSetActivePunto, onSetEditPunto, onUpdatePunto } from '../store/puntos/puntosSlice';


export const usePuntosStore = () => {

   const dispatch = useDispatch();

   // lo primero q va hacer es tomar los datos del state
   const { puntos, activePunto, editpuntos } = useSelector(state => state.puntos);

   const setActivePunto = (e) => {
      dispatch(onSetActivePunto(e))
   }

   const setEditPunto = () => {
      dispatch(onSetEditPunto())
   }

   const startSavingPunto = async (e) => {

      try {
         if (e._id) {
            // console.log('actualizando');
            await lugarApi.put(`/detalle/${e._id}`, e);
            dispatch(onUpdatePunto({ ...e }));
            return
         }
         const { data } = await lugarApi.post('/detalle/:id', e);
         dispatch(onAddNewPunto({ ...e, _id: data.punto._id }));
         // console.log('creando');
      } catch (error) {
         Swal.fire('Error al guardar', error.response.data.msg, 'error');

      }


   }

   const startCloseModal = () => {
      dispatch(onCloseModal())
   }

   const deletePunto = async (a) => {
      try {
         // Todo bien
         // eiminar en el backend
         await lugarApi.delete(`/detalle/${a}`);
         dispatch(onDeletePunto(a));
         return
         // el error lo manda el back sino fuimos nosotros q creamos la nota tira el error
      } catch (error) {
         // console.log(error);
         Swal.fire('Error al eliminar', error.response.data.msg,'error')
      }
   }

   // para cargar los lugares del back
   const startLoadingPunto = async () => {
      // como puede fallar
      try {
         // para llegar al back
         const { data } = await lugarApi.get('/detalle/:id');
         // console.log(data);
         dispatch(onLoadPunto(data));
         // console.log(events);
      } catch (error) {
         console.log('Error cargando Lugares');
         console.log(error);
      }
   }


   return {
      // propiedades
      puntos,
      activePunto,
      editpuntos,
      // metodos

      setActivePunto,
      startSavingPunto,
      startCloseModal,
      startLoadingPunto,
      deletePunto,
      setEditPunto
   }
}
