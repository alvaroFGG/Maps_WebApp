import React from 'react'
import { Popup } from 'react-leaflet'

const MyPopup = ({ marker }) => {
  return (
    <Popup>
      <h4 style={{ textTransform: "capitalize", textAlign: "center" }} className = "text-xl">{ marker.name }</h4>
      <p style={{ textAlign: "center" }}>Tipo: { marker.type }</p>
      <div className='flex'>
        <button className="h-10 px-1 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">Editar</button>
        <button className="h-10 px-1 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800">Eliminar</button>
      </div>
    </Popup>
  )
}

export default MyPopup