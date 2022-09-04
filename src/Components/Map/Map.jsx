import { marker } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer,Marker, Popup  } from 'react-leaflet';
import markers from '../../markers';

const Map = () => {
  console.log(markers);
  return (
    
    <MapContainer center={[41.290131, -2.320729]} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

         {markers.map(marker => <Marker key={marker.id} position={marker.position}>
            <Popup>
              {marker.name}
            </Popup>
         </Marker>)}
          
    </MapContainer>
  )
}

export default Map