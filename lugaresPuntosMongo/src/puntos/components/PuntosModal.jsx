// import { Box, Typography } from '@mui/material';
// import { style } from '@mui/system';
// import Modal from 'react-modal';
// import './Buscar.css';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useLugarStore } from '../../hook';
import { useDispatch, useSelector } from 'react-redux';
import { lugaresSlice } from '../../store';
import { usePuntosStore } from '../../hook/usePuntosStore';
import { useParams } from 'react-router-dom';


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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


// const customStyles = {
//     content: {
//       top: '50%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//     },
//   };

//   Modal.setAppElement('#root');


const initialForm = {
    // _id: '1',
    codigo: "",
    latitud: '',
    longitud: '',
    idLugar: '',
    // si ocupo agregar campos al modal
}



export const PuntosModal = () => {
    
    const { id } = useParams();
    const { lugares, setActiveLugar, activeLugar, setEditLugar } = useLugarStore();

    const { puntos } = usePuntosStore();

    let cantPuntos = puntos.filter(punto => punto.idLugar == id)

    // console.log(cantPuntos.length);


    //  console.log(lugares);
    const { activePunto, startSavingPunto, startCloseModal, editpuntos } = usePuntosStore();


    // const dispatch = useDispatch();

    // para la info del modal
    const [formValues, setformValues] = useState(initialForm);
    const [valuePuntos, setValuePuntos] = useState(lugares);

   
    


    // para el modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        //   como hay un punto en la que es null
        if (activePunto !== null && editpuntos !== null) {
            setformValues({ ...activePunto })
            handleOpen();
        }
    }, [activePunto])




    // estado adicional por si el titulo esta malo
    const [formSubmitted, setformSubmitted] = useState(false)



    // cuando el formulario se bloquea y no deja escribir hacemos esto
    const onInputChange = ({ target }) => {

        // este es el cambio del formulario en useState
        setformValues({
            // para solo sobrescribir el q tenga el valor del target
            ...formValues,
            [target.name]: target.value
        })
    }

    // para manejar el posteo del formulario
    const onSubmit = async (event) => {

        formValues.idLugar = activeLugar?._id,

            // console.log(formValues.idLugar);

            // detenemos la propagacion del formulario
            event.preventDefault();
        // console.log(formValues);
        // aca cuando se intento hacer el posteo del formulario
        setformSubmitted(true);
        // para no permitir que la fecha final sea menor a la inicial

        //  si en el titulo no escribo nada evita q se mande el formulario
        if (formValues.codigo.length <= 0 ||
            formValues.latitud.length <= 0
            ||
            formValues.longitud.length <= 0

        ) return Toast.fire({
            // showCancelButton: true,
            //showConfirmButton: true, // para mostrar un boton por si es necesario sino usar las otras alertas
            icon: 'error',
            title: 'Debe llenar los campos',
            // para poner la alerta enfrente del modal form-modal es el id del modal
            target: document.getElementById('form-modal')
        });


        // caso contrario si todo esta bien
        //  console.log(formValues);
        startSavingPunto(formValues)
        

        // TODO
        // await startSavingEvent(formValues)
        // cerrar modal
        handleClose();
        setformValues(initialForm);
        // // Remover errores en pantalla
        // setformSubmitted(false);
        // form-modal.reset();

        //    console.log(formValues);
    }

    const onClose = () => {
        handleClose();
        // setformValues({ ...formValues })
        startCloseModal();
        setformValues(initialForm);
    }

    // function convertir(){   
    //     const datos = document.getElementById('lista')?.value.split(',');
    //     console.log(datos);
    // }



    return (

        <>

            <div>
                <a onClick={handleOpen} className="btn-flotante">
                    <Add />
                </a>


                <Modal
                    onBackdropClick={onClose} // evita q se cierre el modal con dar clic fuera d el      
                    open={open}
                    onClose={onClose}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
                >
                    <form onSubmit={onSubmit} id='form-modal'>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Puntos
                            </Typography>

                            <Typography component={'span'} id="modal-modal-description">
                                <br />
                                <TextField name='codigo' label='Codigo' type='number' fullWidth
                                    value={
                                        formValues.codigo
                                    }
                                    onChange={onInputChange}
                                />
                            </Typography>

                            <Typography component={'span'} id="modal-modal-description">
                                &nbsp;
                                <TextField
                                    name='latitud' label='Latitud' type='number' fullWidth
                                    value={formValues.latitud}
                                    onChange={onInputChange}
                                />
                            </Typography>
                            <Typography component={'span'} id="modal-modal-description">
                                &nbsp;
                                <TextField name='longitud' label='Longitud' type='number' fullWidth
                                    value={formValues.longitud}
                                    onChange={onInputChange} />
                            </Typography>




                            <div align='right'>
                                <Button color='primary' type='submit' >Guardar

                                </Button>

                                <Button color='error' onClick={onClose} >
                                    Cancelar

                                </Button>

                            </div>
                        </Box>


                    </form>
                </Modal>





            </div>

        </>

    )
}

