import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
    
  return (
    
    <header className='h-28 w-100 text-center' >
      <h1 className='text-4xl title pt-3'>La Herradura</h1>
      <ul className='flex justify-center gap-4 mt-6 text-white'>
        <li className='menu__option menu__option--1'>Instrucciones</li>
        <li className='menu__option '><Link to='/management'>Mantenimiento</Link></li>
      </ul>
    </header>
  )
}

export default Nav