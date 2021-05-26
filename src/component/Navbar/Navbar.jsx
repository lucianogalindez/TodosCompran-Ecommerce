import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import CartWidget from '../CartWidget/CartWidget'
import './Navbar.css'

const Navbar = () => {

    const { user, signOut } = useContext(UserContext)

    return (

        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#e3f2fd'}}>
            <div className="container-fluid d-flex justify-content-between">
                
                <div className="navbar-brand">
                    <Link to='/' className='d-flex align-items-center' style={{textDecoration: 'none'}} id='navbar__link'>
                        <img src='/images/logo.png' alt='logo' height='40' className='mx-1'/>
                        <span style={{color: 'black'}}>TodosCompran</span>
                    </Link>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end w-100">
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorias
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><span className="dropdown-item">Televisores</span></li>
                                <li><span className="dropdown-item">Computadoras</span></li>
                                <li><span className="dropdown-item">Juegos</span></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to='/orders' style={{textDecoration: 'none'}}><span className="nav-link">Ordenes</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/cart'><span className="nav-link"><CartWidget/></span></Link>
                        </li>
                        <li className="nav-item">
                            {
                                user.active ? (
                                    <span 
                                        className="nav-link" 
                                        aria-current="page" 
                                        onClick={signOut}
                                        style={{cursor: 'pointer'}}
                                    >
                                        Salir
                                    </span>
                                ) : (
                                    <Link to='/login' className='text-decoration-none'>
                                        <span className="nav-link" aria-current="page">Ingresar</span>
                                    </Link>
                                )
                            }
                        </li>
                        
                    </ul>
                
                </div>
            </div>
       </nav>
    )
}

export default Navbar
