
import { AppBar, Box, Button, IconButton, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { Logout } from "@mui/icons-material";
import { useAuthStore } from "../hook/useAuthStore";

export const NavBar = () => {

     const { startLogout, user } = useAuthStore();

    const logout = () => {
        Swal.fire({
            title: 'Estas seguro',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0062cc',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            // si da confirmar entoncs q salga
            if (result.isConfirmed) {
                startLogout();
            }
        })
    }



    return (
        <>
     
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              >
          menu
            </IconButton> */}
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Lugares y Puntos
            </Typography>
            <Button color="inherit" onClick={ logout } >Cerrar sesion
            &nbsp;
            <Logout />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
                </>
    )
}


