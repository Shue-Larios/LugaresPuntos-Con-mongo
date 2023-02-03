import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Fullscreen } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { getEnvVariables } from '../../helpers/getEnvVariables';

const { GOOGLE_API_KEY } = getEnvVariables();

const containerStyle = {
    width: Fullscreen,
    height: '400px'
};

const center = {
    lat: 14.1,
    lng: -87.20167
};

// para practicar coordenadas
{/*  position={{ lat: 15.5, lng: -88.25 }} />
position={{ lat: 13.30028, lng: -87.19083 }} />
position={{ lat: 15.6833, lng: -86.0 }} /> 
position={{ lat: 15.6833, lng: -85.0 }} /> 
position={{ lat: 13.6833, lng: -88.0 }} />  */}

 
function Maps() {
    // traer los puntos del state
    const { puntos } = useSelector(state => state.puntos);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_API_KEY

    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            // onLoad={onLoad}
            zoom={7}
            onUnmount={onUnmount}
        >



            {puntos.map((marker) => (
                <Marker key={marker._id}
                    // La función parseFloat() analiza un argumento (si es necesario, lo convierte en una cadena) y devuelve un número de coma flotante
                    position={{ lat: parseFloat(marker.latitud), lng: parseFloat(marker.longitud) }} />
            ))}




            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(Maps)