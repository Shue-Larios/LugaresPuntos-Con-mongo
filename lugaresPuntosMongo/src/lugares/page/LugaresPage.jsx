import React, { useEffect } from 'react'
import CustomizedTables from '../components/CustomizedTables'
import { LugaresModal } from '../components/LugaresModal'
import '../components/Buscar.css';

import { Button, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import '../components/Buscar.css';
import { Buscar, NavBar } from '../../components';


export const LugaresPage = () => {





  return (
    <>
      <NavBar />
      <div className="contenedor sombra">
        <h2>Lugares</h2>
        <Buscar />
        <LugaresModal />
      </div>
    </>
  )
}
