import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import lugarApi from '../api/lugarApi';

import { onAddNewLugar, onCloseModal, onDeleteLugar, onLoadLugar, onSetActiveLugar, onSetEditLugar, onUpdateLugar } from '../store';

export const useLugarStore = () => {

   const dispatch = useDispatch();

   // lo primero q va hacer es tomar los datos del state
   const { lugares, activeLugar, editLugares } = useSelector(state => state.lugares);

   const setActiveLugar = (e) => {
      dispatch(onSetActiveLugar(e))
   }

   const setEditLugar = () => {
      dispatch(onSetEditLugar())
   }

   const startSavingLugar = async (e) => {
      try {
         if (e._id) {
            // console.log('actualizando');
            await lugarApi.put(`/lugares/${e._id}`, e);
            dispatch(onUpdateLugar({ ...e }));
            return;
         }
         const { data } = await lugarApi.post('/lugares', e);
         dispatch(onAddNewLugar({ ...e, _id: data.lugar._id }));
         // console.log('creando');     
      } catch (error) {
         // console.log(error);
         Swal.fire('Error al guardar', error.response.data.msg, 'error');
      }

   }

   const startCloseModal = () => {
      dispatch(onCloseModal())
   }

   const deleteLugar = async (a) => {
      try {
         // Todo bien
         // eiminar en el backend
         await lugarApi.delete(`/lugares/${a}`);
         dispatch(onDeleteLugar(a));
         return
         // el error lo manda el back sino fuimos nosotros q creamos la nota tira el error
      } catch (error) {
         // console.log(error);
         Swal.fire('Error al eliminar',error.response.data.msg, 'error')
      }
   }


   // para cargar los lugares del back
   const startLoadingLugar = async () => {
      // como puede fallar
      try {
         // para llegar al back
         const { data } = await lugarApi.get('/lugares');
         //  console.log(data);
         dispatch(onLoadLugar(data));
         // console.log(events);
      } catch (error) {
         console.log('Error cargando Lugares');
         console.log(error);
      }
   }






   return {
      // propiedades
      lugares,
      activeLugar,
      editLugares,
      // metodos
      setActiveLugar,
      startSavingLugar,
      startCloseModal,
      startLoadingLugar,
      deleteLugar,
      setEditLugar
   }
}
