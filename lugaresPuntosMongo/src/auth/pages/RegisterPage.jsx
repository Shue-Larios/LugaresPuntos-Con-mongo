
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
    repetPassword: "",
}





export const RegisterPage = () => {

    const { startRegister, errorMessage} = useAuthStore();


    // el estado del formulario
    // el estado inicial del formulario es loginFormFields
    const { email, password, repetPassword, onInputChange, isFormValid } = useForm(loginFormFields);

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


    // la funcion de mandar el formulario de registro
    const registerSubmit = (event) => {
        event.preventDefault();

        // si estan vacios los campos
        if (!email || !password || !repetPassword) {
            return Toast.fire({
                // showCancelButton: true,
                //showConfirmButton: true, // para mostrar un boton por si es necesario sino usar las otras alertas
                icon: 'error',
                title: 'Debe llenar los campos'
            })
        }

        // si las contraseñas son diferentes
        if (password !== repetPassword) {
            return Toast.fire({
                // showCancelButton: true,
                //showConfirmButton: true, // para mostrar un boton por si es necesario sino usar las otras alertas
                icon: 'error',
                title: 'Contraseñas no coinciden'
            })
        }
        // // aca ya hizo el guardado en la base
     startRegister({ email , password });


        // para ver los datos recibidos del formulario NO BORRAR
        // console.log({ email, password, repetPassword });
    }


    
   // para estar pendiente de los cambios en el errorMessage
  // para mostrar una alerta en pantalla
  useEffect(() => {
    if (errorMessage !== undefined) {
      Toast.fire('Error en la Autenticacion', errorMessage, 'error')
    }
  }, [errorMessage])


    return (

        <div className='principal'>

            <div className="centrar">
                <div className="titulo">
                    ¡Regístrate ahora!
                </div>
                <form onSubmit={registerSubmit} >

                    <p>Complete Los Campos Para Registrarse.</p>

                    {/* <div className="text border py-2 px-3">
                        <input
                            type="text"
                            className="block w-full"
                            placeholder="Correo"
                            name='registerEmail'
                            value={registerEmail}
                            onChange={onInputChange}
                        />
                    </div>  */}


                    <TextField name='email'
                        value={email}
                        onChange={onInputChange} label='Correo' type='text' fullWidth />


                    &nbsp;
                    <TextField name='password'
                        value={password}
                        onChange={onInputChange} label='Contraseña' type={shown ? 'text' : 'password'} fullWidth />

                    &nbsp;
                    <TextField name='repetPassword'
                        value={repetPassword}
                        onChange={onInputChange} label='Repita La Contraseña' type={shown ? 'text' : 'password'} fullWidth />

                    {/* <div className="text border py-2 px-3">
                        <input
                            type={shown ? 'text' : 'password'}
                            className="block w-full"

                            placeholder="Ingrese La Contraseña"
                            name='registerPassword'
                            value={registerPassword}
                            onChange={onInputChange}
                        />
                    </div> */}
                    {/* <div className="text border py-2 px-3">
                        <input
                            type={shown ? 'text' : 'password'}
                            className="block w-full"

                            placeholder="Repita La Contraseña"
                            name='registerPassword2'
                            value={registerPassword2}
                            onChange={onInputChange}
                        />
                    </div>  */}

                    <div className="mostrar">
                        <input type="checkbox" id="check" onClick={interruptorMostrado} />
                        <label className=""> Mostrar Contraseña</label>
                    </div>

                    <div className="d-grid gap-2">
                        <input
                            type="submit"
                            className="btnSubmit"
                            value="Registrarme"
                        />
                        <p>¿Ya tienes cuenta?  <NavLink className='link' to="/auth/login"> Inicia sesión. </NavLink> </p>

                    </div>
                </form>
            </div>
        </div>

    )
}




