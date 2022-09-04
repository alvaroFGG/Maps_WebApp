import './Nav.css';

const Nav = () => {
    
  return (
    
    <header className='h-28 text-center header' >
      <h1 className='text-4xl title pt-3'>La Herradura</h1>
      <ul className='flex justify-center gap-4 mt-6 text-white'>
        <li className='menu__option menu__option--1'>Instrucciones</li>
        <li className='menu__option '>Mantenimiento</li>
      </ul>
    </header>
  )
}

export default Nav