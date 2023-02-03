
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hook';
import './Pages.css';

// estado inicial del formulario
const loginFormFields = {
  email: "",
  password: "",
}


export const LoginPage = () => {

  const { startLogin, errorMessage} = useAuthStore();




  // el estado del formulario
  // el estado inicial del formulario es loginFormFields
  const { email, password, onInputChange } = useForm(loginFormFields);

  // ver contraseña
  const [shown, setShown] = useState();
  const interruptorMostrado = () => setShown(!shown);


  ///////////////////////////
  //  diseño para las alertas
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  ///////////////////////////


  // la funcion de mandar el formulario de login
  const loginSubmit = (event) => {
    // previene la recarga del formulario
    event.preventDefault();
    // si estan vacios los campos
    if (!email || !password) {
      return Toast.fire({
        // showCancelButton: true,
        //showConfirmButton: true, // para mostrar un boton por si es necesario sino usar las otras alertas
        icon: 'error',
        title: 'Debe llenar los campos' 
      })
    }
    // para ver los datos recibidos del formulario NO BORRAR
    startLogin({ email, password });
  }

   // para estar pendiente de los cambios en el errorMessage
  // para mostrar una alerta en pantalla
  useEffect(() => {
    if (errorMessage !== undefined) {
      Toast.fire('Error en la Autenticacion', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <>
      <div className="principal">
        <div className="centrar">
          <div className="titulo">
            Bienvenido
          </div>
          <form onSubmit={loginSubmit} >
            <p>Por favor, complete sus credenciales para iniciar sesión.</p>

            <TextField name='email'
              value={email}
              onChange={onInputChange} label='Correo' type='text' fullWidth />


            &nbsp;
            <TextField name='password'
              value={password}
              onChange={onInputChange} label='Contraseña' type={shown ? 'text' : 'password'} fullWidth />



            {/* <div className="text border py-2 px-3">
            <input
              // si es vdd lo pone tipo text
              type={shown ? 'text' : 'password'}
              className="inputAuth"
              placeholder="Contraseña"
              name='loginPassword'
              value={loginPassword}
              onChange={onInputChange}
            />
          </div> */}


            <div className="mostrar">
              <input type="checkbox" id="check" onClick={interruptorMostrado} />
              <label className=""> Mostrar Contraseña</label>
            </div>


            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Ingresar"
              />
              <p>¿No tienes una cuenta?  <NavLink className='link' to="/auth/register"> Regístrate ahora. </NavLink> </p>
            </div>
          </form>
        </div>
      </div>
    </>

  )





}



