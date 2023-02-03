
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { ControlPoint, DeleteForever, Edit, Reply } from '@mui/icons-material';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useLugarStore } from '../../hook';
// import { onUpdateLugar } from '../../store';
// import { LugaresModal } from './LugaresModal';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavBar } from '../../components';
import { PuntosModal } from '../../puntos/components/PuntosModal';
import { onSetActivePunto, onSetEditPunto } from '../../store/puntos/puntosSlice';
import { usePuntosStore } from '../../hook/usePuntosStore';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


// const dataLugares = [
//   { _id: 1, nombre: "Filipinas", disponible: 'no disponible', puntos: '2', tipo: 'casa', rango: 241 },
//   { _id: 2, nombre: "Brasil", disponible: 'no disponible', puntos: '2', tipo: 'casa', rango: 225 },
//   { _id: 3, nombre: "Colombia", disponible: 'no disponible', puntos: '2', tipo: 'casa', rango: 216 },
//   { _id: 4, nombre: "Nigeria", disponible: 'no disponible', puntos: '2', tipo: 'casa', rango: 216 },
//   { _id: 5, nombre: "Argentina", disponible: 'no disponible', puntos: '2', tipo: 'casa', rango: 207 },
// ];



export const DetallesPage = () => {

  const navigate = useNavigate();
  const { startLoadingPunto } = usePuntosStore();




  const { startCloseModal } = useLugarStore();

  const { activeLugar, editLugares } = useSelector(state => state.lugares);

  const { puntos, setActivePunto, setEditPunto, deletePunto } = usePuntosStore();

  // para traer los puntos
  useEffect(() => {
    startLoadingPunto();
  }, [puntos]);


  const onEditar = (row) => {
    //  console.log(lugares);
    // var dataNueva = lugares;
    puntos.map(punto => {
      if (punto._id !== row) {
        return
      } else {
        setActivePunto(punto)
        setEditPunto();
      }
    });
    // console.log({ click: event });
    //  console.log(lugares);
    // dispatch(onUpdateLugar( lugares));
    // console.log(dataMostrar);
  }

  const handleEliminar = (row) => {
    puntos.map(punto => {
      if (punto._id !== row) {
        return
        // console.log('son iguales');
      } else {
        setActivePunto(punto)
      }
    });

    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // aca ya el codigo para borrar
        deletePunto(row)
        Swal.fire(
          '¡Eliminado!',
          'Su registro ha sido eliminado.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        startCloseModal()
      }

    })
  }




  // useParams para leer parametros desd la URL
  const { id } = useParams();


  // si no hay id en el evento activo me manda a la pagina principal
  useEffect(() => {
    if (id != activeLugar?._id) {
      navigate('/auth/', {
        replace: true
      });
    }
  }, [])


  const handleAtras = () => {
    startCloseModal()
    navigate('/');
  }

  // condicional para mostrar puntos en la tabla
  // useEffect(() => {
  //   if (id != activeLugar?._id) {
  //     navigate('/auth/', {
  //       replace: true
  //     });
  //   }
  // }, [])


  // para mostrar datos condicionales
  // useEffect(() => { 
  //   puntos.map(punto => {
  //     // console.log('puntos', punto.idLugar);
  //     // console.log('id url', id);
  //     if (punto.idLugar == id) {
  //    puntoData = puntos.filter( punto => punto.idLugar === id );  
  //   //  console.log(puntoData);  
  //     } else {
  //       // console.log('diferentes');   
  //     }
  //   });
  // }, [ puntos ])


  // let cantPuntos = puntos.filter(punto => punto.idLugar == id)

  //  console.log(cantPuntos.length);

  // const { inputValue } = Buscar();





  return (


    <>
      <NavBar />
      <div className="contenedor sombra">

        <div className='titlePrincipal'>
          <div className="back">
            <Button color="inherit" title="Atras" onClick={handleAtras}>
              <Reply />
            </Button>


          </div>
          <div className="tittle">
            <h2>Detalles</h2>
          </div>
        </div>


        <div className="centro">

          <div className="varios">
            <h4> Nombre: {activeLugar?.nombre} </h4>
            <h4> Tipo: {activeLugar?.tipo} </h4>
            <h4> Estado: {activeLugar?.disponible} </h4>
            <h4> Rango: {activeLugar?.rango} </h4>
          </div>


          <div className="detalles">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Codigo</StyledTableCell>
                    <StyledTableCell align="center">Latitud</StyledTableCell>
                    <StyledTableCell align="center">Longitud</StyledTableCell>
                    <StyledTableCell align="center">Acciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {puntos.filter(punto => punto.idLugar == id).map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell align="center">{row.codigo}</StyledTableCell>
                      <StyledTableCell align="center">{row.latitud}</StyledTableCell>
                      <StyledTableCell align="center">{row.longitud}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button color="inherit" title="Edita el punto" onClick={() => onEditar(row._id)}>
                          <Edit />
                        </Button>

                        <Button color="inherit" title="Elimina el punto" onClick={() => handleEliminar(row._id)} >
                          <DeleteForever />
                        </Button>
                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>



      </div>

      <PuntosModal />

    </>
  )
}
