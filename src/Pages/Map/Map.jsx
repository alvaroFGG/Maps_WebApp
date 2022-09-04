import React from 'react';
import { MapContainer, TileLayer,Marker, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import MyPopup from '../../Components/MyPopup/MyPopup';


const Map = () => {
  const URL = 'http://localhost:3000/api/markers';
  const MAP_CENTER = [41.290131, -2.320729];
  const ZOOM = 15;
  const SCROLL = true;
  const CONFIRM_PHRASE = "¿Quieres añadir un punto en esta localizacion?";
  // const PROMPT_PHRASE = "Introduce un nombre para el punto:";

  const [markers, setMarkers] = useState();

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => setMarkers(data))
  }, [])

  
  const getIcon = (iconSize) => {
    return L.icon({
      iconUrl: require('../../Assets/img/temporal-waypoint.jpeg'),
      iconSize: iconSize
    })
  }

  //temporal marker function
  const SaveMarker = () => {
      const map = useMapEvent({
        click: (e) => {
          const {lat, lng} = e.latlng;
          if (window.confirm(CONFIRM_PHRASE)){
            L.marker([lat, lng], {icon: getIcon(35)}).bindPopup('Posición temporal').addTo(map);
          }
        }
      });
    return null;
  }
  

  return (
    
    <MapContainer center={MAP_CENTER} zoom={ZOOM} scrollWheelZoom={SCROLL}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

         {markers && markers.map(marker => <Marker key={marker.id} position={marker.position}>
            <MyPopup marker={marker}/>
         </Marker>)}

         <SaveMarker/>
          
    </MapContainer>
  )
}

export default Map