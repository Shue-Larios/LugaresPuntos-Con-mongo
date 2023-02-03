import { configureStore } from "@reduxjs/toolkit";
import { authSlice,lugaresSlice } from "./";
import { puntosSlice } from "./puntos/puntosSlice";
 
 
 
 
 


export const store = configureStore({
    reducer: {
        // para utilizar nuestro Slice
        // es el nombre de como lo voy a identificar
        auth: authSlice.reducer,
        
        lugares: lugaresSlice.reducer,
        puntos: puntosSlice.reducer,

 

    },
    // // configurar middleware
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     // solo es para q revise si esas fechas se pueden serealizar
    //     serializableCheck: false,
    // })



})