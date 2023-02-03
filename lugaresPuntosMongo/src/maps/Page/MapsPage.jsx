import { Reply } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { usePuntosStore } from "../../hook/usePuntosStore";
import Maps from "../components/Maps"


export const MapsPage = () => {

  const navigate = useNavigate();

  const { startLoadingPunto } = usePuntosStore();

  // para traer los puntos
  useEffect(() => {
    startLoadingPunto();
  }, []);

  const handleAtras = () => {
    navigate('/');
  }




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
            <h2>Google Maps</h2>

          </div>
        </div>




        <Maps />

      </div>




    </>
  )
}
