
// Tabla principal

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useLugarStore } from '../../hook';
// import { onUpdateLugar } from '../../store';
// import { LugaresModal } from './LugaresModal';
import Swal from 'sweetalert2';
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';


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
//   { id: 1, nombre: "Filipinas", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 241 },
//   { id: 2, nombre: "Brasil", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 225 },
//   { id: 3, nombre: "Colombia", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 216 },
//   { id: 4, nombre: "Nigeria", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 216 },
//   { id: 5, nombre: "Argentina", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 207 },
//   { id: 6, nombre: "Indonesia", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 195 },
//   { id: 7, nombre: "Emiratos Árabes Unidos", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 191 },
//   { id: 8, nombre: "México", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 190 },
//   { id: 9, nombre: "Sudáfrica", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 190 },
//   { id: 10, nombre: "Egipto", disponible:'no disponible', puntos:'2', tipo:'casa', rango: 186 },
// ];


// const handleChange = e => {
//   const { name, value } = e.target;
//   setPersonaSeleccionada((prevState) => ({
//     ...prevState,
//     [name]: value
//   }));
// }

// const editar = () => {
//   var dataNueva = data;
//   dataNueva.map(persona => {
//     if (persona.id === personaSeleccionada.id) {
//       persona.descripcion = personaSeleccionada.descripcion;
//       persona.nombre = personaSeleccionada.nombre;
//     }
//   });
//   setData(dataNueva);
//   setModalEditar(false);
// }

// const eliminar = () => {
//   setData(data.filter(persona => persona.id !== personaSeleccionada.id));
//   setModalEliminar(false);
// }


// const insertar =()=>{
//   var valorInsertar=personaSeleccionada;
//   valorInsertar.id=data[data.length-1].id+1;
//   var dataNueva = data;
//   dataNueva.push(valorInsertar);
//   setData(dataNueva);
//   setModalInsertar(false);
// }




export default function CustomizedTables({ datoBuscar, tipoBuscar }) {

    // const { inputValue } = Buscar();

  const navigate = useNavigate();

  // const dispatch =useDispatch();
  const { lugares,startLoadingLugar, setActiveLugar, deleteLugar, setEditLugar, startCloseModal } = useLugarStore();

  /////////////////// EL CODIGO QUE YO TENGO///////////////////
  const [count, setCount] = useState(5);

  // para el buscador
  const [data, setData] = useState([]);
  const [term, setTerm] = useState('');


  const dataMostrar = lugares.slice(0, count); // solo hace mostrar 3

  useEffect(() => {
    startLoadingLugar();
  
  }, [lugares]);

  //  const { nombre, tipo } = data; revisar el 347 por cualquier cosa

  //  Creando una nueva
  // handleClickNew = () =>{
  //   // si no tiene id es xk estoy creando una nueva
  // }

  const onEditar = (row) => {
    navigate(`${row}`, {
    });
    //  console.log(lugares);
    // var dataNueva = lugares;
    lugares.map(lugar => {
      if (lugar._id !== row) {
        return
        // console.log('son iguales');
      } else {
        setActiveLugar(lugar)
        setEditLugar();
      }
    });
    // console.log({ click: event });
    //  console.log(lugares);
    // dispatch(onUpdateLugar( lugares));
    // console.log(dataMostrar);
  }

  const handleEliminar = (row) => {
    navigate(`${row}`, {
    });
    lugares.map(lugar => {
      if (lugar._id !== row) {
        return
        // console.log('son iguales');
      } else {
        setActiveLugar(lugar)
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
        deleteLugar(row);
        navigate(`/`, {
        });
        Swal.fire(
          '¡Eliminado!',
          'Su registro ha sido eliminado.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        navigate(`/`, {
        });
        startCloseModal()
      }

    })
  }

  /////////////////////////

  const handleDetalle = (row) => {
    lugares.map(lugar => {
      if (lugar._id !== row) {
        return
        // console.log('son iguales');
      } else {
        setActiveLugar(lugar);
        setEditLugar();
        navigate(`/detalle/${row}`, {
          replace: true
        });
      }
    });
  }


  function searchingTerm() {
    if (tipoBuscar === 'Todos') {
      return function (row) {
        return dataMostrar
      }
    }
    if (tipoBuscar === '' ) {
      return function (row) {
        return row.nombre.includes(datoBuscar)
      }
    } else {
      return function (row) {
        return row.tipo.includes(tipoBuscar)
      }
    }



  }

  return (
    <>
      {/* <Buscar /> */}
      {/* <div className='grid place-items-center'> */}
      <div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Disponible</StyledTableCell>
                <StyledTableCell align="center">Rango</StyledTableCell>
                {/* <StyledTableCell align="center">Puntos de referencia</StyledTableCell> */}
                <StyledTableCell align="center">Tipo</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataMostrar.filter(searchingTerm(term)).map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.nombre}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.disponible}</StyledTableCell>
                  <StyledTableCell align="center">{row.rango}</StyledTableCell>
                  {/* <StyledTableCell align="center">{row.puntos}</StyledTableCell> */}
                  <StyledTableCell align="center">{row.tipo}</StyledTableCell>
                  <StyledTableCell align="center">

                    <Button color="inherit" title="Detalles del lugar" onClick={() => handleDetalle(row._id)} >
                      <Visibility />
                    </Button>

                    <Button color="inherit" title="Edita el lugar" onClick={() => onEditar(row._id)}>
                      <Edit />
                    </Button>

                    <Button color="inherit" title="Elimina el lugar" onClick={() => handleEliminar(row._id)} >
                      <DeleteForever />
                    </Button>


                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button onClick={() => setCount(count + 5)} >Cargar mas</Button>

      </div>
      {/* </div> */}

    </>

  );
}
