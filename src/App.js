import './App.css';
import { MapContainer, TileLayer,Marker, Popup  } from 'react-leaflet';

function App() {
  return (
    <div className="App">
        <MapContainer center={[41.290131, -2.320729]} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        <Marker position={[41.290131, -2.320729]}>
          <Popup>
            Centro del pueblo
          </Popup>
        </Marker>
          
        </MapContainer>
    </div>
  );
}

export default App;
