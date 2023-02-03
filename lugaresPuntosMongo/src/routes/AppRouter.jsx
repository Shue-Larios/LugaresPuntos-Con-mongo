import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../auth';
import { useAuthStore } from '../hook';
import { DetallesPage, LugaresPage } from '../lugares';
import { MapsPage } from '../maps';


export const AppRouter = () => {

const { status, checkAuthToken } = useAuthStore();


useEffect(() => {
  checkAuthToken();
}, [])

if ( status === 'checking' ) {
  return (
    <span className="spinner"></span>
  )
}



  // const authStatus = 'not-authenticated'
  return (
    <Routes>
      {
        // el stado de la autenticacion, sino estoy autenticado
        (status === 'not-authenticated')
          ? (
            <>
              {/* si es una ruta no reconocida */}
              <Route path="/*" element={<Navigate to='/auth/login' />} />
               <Route path="/auth/login" element={<LoginPage />} /> 
              <Route path="/auth/*" element={<LoginPage />} />
              <Route path="/auth/*" element={<RegisterPage />} /> 
            </>
          )
          // cualquier otra ruta q no sea la de arriba va a entrar a esta 
          : (
            // si stoy autenticado
            <>
              <Route path="/" element={<LugaresPage/>} />
              <Route path="/maps" element={<MapsPage />} />
              <Route path="/detalle/:id" element={<DetallesPage />} />
               <Route path="/*" element={<Navigate to='/' />} />
            </>
          )
      }
    </Routes>

  )


}



