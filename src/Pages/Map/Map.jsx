import React from 'react';
import { MapContainer, TileLayer,Marker, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import MyPopup from '../../Components/MyPopup/MyPopup';
import './Map.css';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import useGeoLocation from '../../Hooks/useGeoLocation';
import Swal from 'sweetalert2';


const Map = () => {
  const URL = 'http://localhost:3000/api/markers';
  const MAP_CENTER = [41.290131, -2.320729];
  const ZOOM = 15;
  const SCROLL = true;

  const [markers, setMarkers] = useState();
  const mapRef = useRef();
  const location = useGeoLocation(); //custom hook for location 

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setMarkers(data))
  }, [])

  
  const getTemporalIcon = (iconSize) => {
    return L.icon({
      iconUrl: require('../../Assets/img/temporal-waypoint.jpeg'),
      iconSize: iconSize
    })
  }

  const getLocationIcon = (iconSize) => {
    return L.icon({
      iconUrl: require('../../Assets/img/geolocation-marker.png'),
      iconSize: iconSize
    })
  }

  //temporal marker function
  const SaveMarker = () => {
      const map = useMapEvent({
        click: (e) => {
          const {lat, lng} = e.latlng;
            L.marker([lat, lng], {icon: getTemporalIcon(35)}).bindPopup('Posición temporal').addTo(map);
        }
      });
    return null;
  }


  //function for adding new markers
  const addLocationMarker =  () => {
    if (window.confirm("¿Quieres añadir tu ubicacion como un punto nuevo?")){
      if (location.loaded && !location.error ) {
          
        mapRef.current.flyTo(
          [location.coordinates.lat, location.coordinates.lng],
          ZOOM,
          { animate: true }
        );


        Swal.fire({
          title: 'Nuevo Marcador',
          html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre del punto">
                <select id="type">
                  <option value="bebedero">Bebedero</option>
                  <option value="comedero">Comedero</option>
                </select>`,
          confirmButtonText: 'Confirmar',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          focusConfirm: false,
          preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value
            const type = Swal.getPopup().querySelector('#type').value
            if (!name || !type) {
              Swal.showValidationMessage(`Por favor, introduce todos los valores`)
            }
            return { name: name, type: type }
          }
        }).then((result) => {
            console.log(result.value);
        })
        
        
      }   
    }
  }
  

  return (
    <section className='homeMap'>
      <button onClick={addLocationMarker} className='newMarkerBtn px-3 py-2 ml-2 text-white'><AddLocationAltIcon/></button>
      <MapContainer center={MAP_CENTER} zoom={ZOOM} scrollWheelZoom={SCROLL} ref={mapRef}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

          {markers && markers.map(marker => <Marker key={marker.id} position={marker.position}>
              <MyPopup marker={marker}/>
          </Marker>)}

          <SaveMarker/>

          {location.loaded && !location.error && (
                <Marker
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                  icon={getLocationIcon(50)}
                ></Marker>
              )}
            
      </MapContainer>
    </section>
  )
}

export default Map