import { createSlice } from '@reduxjs/toolkit';


// const tempPuntos = {
//     _id: 1,
//     codigo: "80",
//     latitud: 14.0818,
//     longitud: -87.2068,
//     idLugar: '1',
// }


export const puntosSlice = createSlice({
    name: 'puntos',
    initialState: {
        isLoadingPuntos: true,
        puntos: [
            // tempPuntos
        ],
        activePunto: null,
        editpuntos: null
    },
    reducers: {
        onSetActivePunto: (state, { payload }) => {
            //  console.log({payload});
            state.activePunto = payload;
            state.editpuntos = null;
        },
        onSetEditPunto: (state) => {
            state.editpuntos = true;
        },
        // para añadir una nueva
        onAddNewPunto: (state, { payload }) => {
            state.puntos.push(payload);
            state.activePunto = null
            state.editpuntos = null;

        },
        onUpdatePunto: (state, { payload }) => {
            state.activePunto = null
            state.editpuntos = null;
            state.puntos = state.puntos.map(Punto => {
                if (Punto._id === payload._id) {
                    return payload;
                }
                return Punto;
            })
        },
        onCloseModal: (state, { payload }) => {
            //  console.log({payload});
            state.activePunto = null;
            state.editpuntos = null;
        },
        onDeletePunto: (state, { payload }) => {
            // state.activePunto = payload;
            if (state.activePunto) {
                state.puntos = state.puntos.filter(Punto => Punto._id !== state.activePunto._id);
                state.activePunto = null
                state.editpuntos = null;
            }
        },
        // onOpenDateModal: (state, /* action */ ) => {
        //     state.isDateModalOpen= true;
        //  },

        // para que nos permita establecer los eventos
        onLoadPunto: (state, { payload = [] }) => {
            // se cancela cuando ya tenemos los eventos  
            state.isLoadingPuntos = false; 
            state.puntos = payload.puntos;
            // console.log(state.puntos);
        },

        onLogoutPunto: (state) => {
            // este es lo mismo q el estado inicial del  state.calendar
            state.isLoadingPuntos= true,
            state.puntos=[],
            state.activePunto=null
        },



    }
});
export const { onLoadEvent,
    onLoadPunto,
    onSetActivePunto,
    onSetEditPunto,
    onAddNewPunto,
    onUpdatePunto,
    onCloseModal,
    onLogoutPunto,
    onDeletePunto } = puntosSlice.actions;