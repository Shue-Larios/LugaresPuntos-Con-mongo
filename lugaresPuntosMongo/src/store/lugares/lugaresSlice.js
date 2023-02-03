import { createSlice } from '@reduxjs/toolkit';


// const tempLugares = {
//     _id: 1,
//     nombre: "Filipinas",
//     disponible: 'no disponible',
//     puntos: '0',
//     tipo: 'Colonia',
//     rango: 241,
//     user: {
//         _id: '123',
//         name: 'Shue'
//     }
// }


export const lugaresSlice = createSlice({
    name: 'lugares',
    initialState: {
        isLoadingLugares: true,
        lugares: [
            // tempLugares
        ],
        activeLugar: null,
        editLugares: null
    },
    reducers: {
        onSetActiveLugar: (state,  {payload} ) => {
            //  console.log({payload});
             state.activeLugar = payload;
            state.editLugares = null;
        },
        onSetEditLugar: (state ) => {
             state.editLugares = true;
        },
        // para añadir una nueva
        onAddNewLugar: (state,  {payload} ) => {
            state.lugares.push(payload );
        state.activeLugar= null
        state.editLugares = null;

        },
        onUpdateLugar: (state,  {payload} ) => {
            state.activeLugar= null 
            state.editLugares = null;
            state.lugares = state.lugares.map( lugar =>{
                if( lugar._id === payload._id ){
                    return payload;                
                }
                return lugar;
            } )
        },
        onCloseModal: (state,  {payload} ) => {
            //  console.log({payload});
            state.activeLugar= null;
            state.editLugares = null;
        },
        onDeleteLugar: (state, {payload} ) => {
            // state.activeLugar = payload;
             if (state.activeLugar){
                state.lugares = state.lugares.filter( lugar => lugar._id !== state.activeLugar._id );
              state.activeLugar= null
            state.editLugares = null;
            }
        },
        onOpenDateModal: (state, /* action */ ) => {
            state.isDateModalOpen= true;
         },
          // para que nos permita establecer los eventos
        onLoadLugar: (state, { payload = {} }) => {
            // se cancela cuando ya tenemos los eventos
            state.isLoadingLugares = false;
             state.lugares = payload.lugares;
            // console.log(state.lugares);
        },
        onLogoutLugar: (state) => {
            // este es lo mismo q el estado inicial del  state.calendar
            state.isLoadingLugares= true,
            state.lugares=[],
            state.activeLugar=null
        },


    }
});
export const { 
    onSetActiveLugar,
    onSetEditLugar, 
    onLoadLugar,
    onAddNewLugar, 
    onUpdateLugar, 
    onCloseModal, 
    onLogoutLugar,
    onDeleteLugar} = lugaresSlice.actions;