import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LoginContainer.css'

const LoginContainer = ({setLocation}) => {

    useEffect(() => {
        setLocation(window.location.pathname)
    }, [setLocation])

    return (
        <div className='loginContainer'>
            <div className='container'>
                <div className='row rowLogin'>
                    <div className='col-md-6'>
                        <div className='card cardLogin'>
                            <form className='box'>

                                <Link to='/' className='d-flex flex-column align-items-center mb-4 text-decoration-none'>
                                    <img src='/images/logo.png' alt='logo' height='40' className='mx-1'/>
                                    <span style={{color: 'black'}}>TodosCompran</span>
                                </Link>

                                <h1>LOGIN</h1>

                                <p className='text-muted'>
                                    Ingresa con tu mail y contraseña
                                </p>

                                <input type='email' name='email' placeholder='Ingrese su email'/>
                        
                                <input type='password' name='password' placeholder='Ingrese su contraseña'/>

                                <input type='submit' value='Ingresar'/>

                                <p className='text-muted mb-1'>
                                    ¿ No tienes una cuenta ? 
                                </p>

                                <Link to='/register' className='text-decoration-none text-primary'>
                                    Registrate Aca
                                </Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginContainer
