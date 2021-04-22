import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import './LoginContainer.css'

const LoginContainer = ({setLocation}) => {

    const {registerUser, loginUser, user, loadingUser} = useContext(UserContext)

    const [isUser, setIsUser] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const history = useHistory()

    useEffect(() => {
        setLocation(window.location.pathname)

        if (user.active) {
            history.push('/')
        }

    }, [setLocation, history, user.active])

    const login = (e) => {
        e.preventDefault()

        setError('')

        if (email.trim() === '') {
            setError('El email no es valido')
            return false
        }

        if (password.trim() === '') {
            setError('La contraseña no es valida')
            return false
        }

        loginUser(email, password)

        setEmail('')
        setPassword('')

    }

    const register = (e) => {
        e.preventDefault()

        setError('')

        if (name.trim() === '') {
            setError('El nombre es necesario')
            return false
        }

        if (email.trim() === '') {
            setError('El email no es valido')
            return false
        }

        if (password.trim() === '') {
            setError('La contraseña no es valida')
            return false
        }

        registerUser(name, email, password)

        setName('')
        setEmail('')
        setPassword('')
    }

    if (user.active === false && loadingUser !== true) {

        return (
            <div className='loginContainer'>
                <div className='container'>
                    <div className='row rowLogin'>
                        <div className='col-md-6'>
                            <div className='card cardLogin'>
                                <form className='box' onSubmit={isUser ? login : register}>

                                    <Link to='/' className='d-flex flex-column align-items-center mb-4 text-decoration-none'>
                                        <img src='/images/logo.png' alt='logo' height='40' className='mx-1'/>
                                        <span style={{color: 'black'}}>TodosCompran</span>
                                    </Link>

                                    {
                                        isUser ? (
                                            <h1>INGRESAR</h1>
                                        ) : (
                                            <h1>CREAR CUENTA</h1>
                                        )
                                    }

                                    <p className='text-muted'>
                                        {
                                            isUser ? 'Ingresa con tu mail y contraseña' : 'Completa los datos' 
                                        }
                                    </p>

                                    {
                                        !isUser && 
                                            <input 
                                                type='text' 
                                                name='name' 
                                                placeholder='Nombre y Apellido'
                                                onChange={e => setName(e.target.value)}
                                                value={name}    
                                            />
                                    }

                                    <input 
                                        type='email' 
                                        name='email' 
                                        placeholder='Ingrese su email'
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}    
                                    />
                            
                                    <input 
                                        type='password' 
                                        name='password' 
                                        placeholder='Ingrese su contraseña'
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    
                                    {
                                        error && <span className='text-danger small'>{error}</span>
                                    }

                                    <input type='submit' value={ isUser ? 'Ingresar' : 'Registrarme' }/>

                                    <p className='text-muted mb-1'>
                                        {
                                            isUser ? '¿ No tienes una cuenta ?' : '¿ Ya tienes una cuenta ?'
                                        }
                                    </p>

                                    <button  
                                        type='button'
                                        className='btn btn-outline-secondary mt-2' 
                                        onClick={() => setIsUser(prev => !prev)}
                                    >
                                        {
                                            isUser ? 'Crear Cuenta' : 'Ingresar'
                                        }
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="fa-3x text-center d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
                <i className="fas fa-spinner fa-pulse text-primary mb-3"></i>
                <h4>Cargando...</h4>
            </div>
        )
    }
}

export default LoginContainer
