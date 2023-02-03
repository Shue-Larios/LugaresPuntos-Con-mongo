
import { Button, Grid, ListItem } from '@mui/material';
import { useState } from 'react'; // importamos el useState
import '../lugares/components/Buscar.css';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import CustomizedTables from '../lugares/components/CustomizedTables';
 

import { NavLink } from "react-router-dom"



export const Buscar = () => {

    // el valor inicial del inputvalue es vacio
    const [inputValue, setInputValue] = useState('');
 
    const [typeOp, setTypeOp] = useState('');


    // aca destructuramos el target para poder acceder al evento de value
    const onInputChange = ({ target }) => {
        // accedemos al evento del value para poder escribir en el input
        setInputValue(target.value);
    }

   
    const captureType = (e) => {
        setInputValue(''); //limpia el buscador de nombre
        setTypeOp(e.target.value);
    }

    const reiniciar = (e) => {
        setInputValue('');
        document.getElementById("firstSelect").getElementsByTagName('option')[0].selected = 'Todos'
        setTypeOp(e.target.value);
    }
    
 
// console.log(inputValue);
    return (
        <>
            <form >
                <input className='inputBuscar'
                onClick={ reiniciar }
                    // esta es como normalmente solo que formateado el codigo
                    type="text"
                    placeholder="Buscar por nombre"
                    // aca le digo q el input tipo text tiene el mismo valor que el inputValue
                    value={inputValue}
                    // aca le decimo al evento que funcion ejecutar
                    onChange={onInputChange}
                />
            </form>

            <div className='centro'>
                <div>
                    <form as="select" onChange={captureType}>
                    <select className='select campo' id="firstSelect">
                        <option value='Todos' >Tipo de Lugar</option>
                        <option value="Colonia">Colonia</option>
                        <option value="Inst. Gubernamental">Instituciones Gubernamentales</option>
                        <option value="Centro Educativo">Centro Educativas</option>
                        <option value="Centro Comercial">Centros Comerciales</option>
                    </select>
                    </form>
                    {/* <ListItem >
                        <Button type='submit' variant="contained" title="Buscar">Buscar</Button>
                    </ListItem > */}
                   
                   <div className='contenedor-botones'>
                    <ListItem >
                        <Button variant="contained" title="Limpia los buscadores" onClick={reiniciar} >
                            Reiniciar
                        </Button>
                    </ListItem >
                    <ListItem >
                        <Button variant="contained" title="Google Maps">
                            <NavLink className='linkMaps' to="/maps">Google Maps </NavLink>
                        </Button>
                    </ListItem >
                    </div>
                </div>

            </div>
            {/* <Tipo/> */}
            <CustomizedTables datoBuscar={inputValue} tipoBuscar={typeOp} />
        </>

    )
}
