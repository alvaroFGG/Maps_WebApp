import React from 'react';
import { MapContainer, TileLayer,Marker, useMapEvent, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect, useRef } from 'react';
import MyPopup from '../../Components/MyPopup/MyPopup';
import './Map.css';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import useGeoLocation from '../../Hooks/useGeoLocation';


const Map = () => {
  const URL = 'http://localhost:3000/api/markers';
  const MAP_CENTER = [41.290131, -2.320729];
  const ZOOM = 15;
  const SCROLL = true;

  const [markers, setMarkers] = useState();
  const mapRef = useRef();
  const location = useGeoLocation();

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
            L.marker([lat, lng], {icon: getIcon(35)}).bindPopup('Posición temporal').addTo(map);
        }
      });
    return null;
  }

  //function for adding new markers
  const addLocationMarker = (e) => {

    console.log(mapRef.current);
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM,
        { animate: true }
      );
    } else {
      alert(location.error.message);
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
                ></Marker>
              )}
            
      </MapContainer>
    </section>
  )
}

export default Map