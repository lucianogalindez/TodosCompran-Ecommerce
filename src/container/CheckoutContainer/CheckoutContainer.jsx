import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../context/UserContext'
import { TiendaContext } from '../../context/TiendaContext'
import { db } from '../../firebase'

const CheckoutContainer = (props) => {

    const history = useHistory()

    const [name, setName] = useState('')
    const [direccion, setDireccion] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [postal, setPostal] = useState('')
    const [pais, setPais] = useState('')
    const [orderLoading, setOrderLoading] = useState(false) 

    const [error, setError] = useState('')

    const {user} = useContext(UserContext)
    const {cart} = useContext(TiendaContext)


    useEffect(() => {
        props.setActualLocation(window.location.pathname)

        user.active === false && history.push('/login?redirect=shipping')

    }, [props, user, history])

    const createOrder = async () => {
        try {

            const order = {
                email: user.email,
                name,
                direccion,
                ciudad,
                postal,
                pais,
                cart,
                totalPrice: cart.reduce((a,c) => a+c.qty*c.price, 0)
            }

            setOrderLoading(true)

            const newOrder = await db.collection('users').doc(user.email).collection('orders').add(order)
            
            setOrderLoading(false)

            history.push(`/placeorder/${newOrder.id}`)

        }catch(error){

            setOrderLoading(false)
            console.log(error)
        }
    }

    const handlerOrder = (e) => {

        e.preventDefault()

        setError('')
        
        if (name.trim() === '') {
            setError('name')
            return false
        }

        if (direccion.trim() === '') {
            setError('address')
            return false
        }

        if (ciudad.trim() === '') {
            setError('city')
            return false
        }

        if (postal.trim() === '') {
            setError('cp')
            return false
        }

        if (pais.trim() === '') {
            setError('country')
            return false
        }

        createOrder()

    }

    return (
        <div className='container mt-4'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-8'>
                    <form 
                        className='d-flex flex-column align-items-center'
                        onSubmit={handlerOrder}
                    >
                        <h4 className='text-muted'>DATOS DE ENVIO</h4>
                
                        <input 
                            type='text'
                            placeholder='Nombre Completo'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{borderColor: error === 'name' && 'red'}}
                        />
                        {error === 'name' && <span className='text-danger mb-1'>Ingrese un nombre válido</span>}

                        <input 
                            type='text'
                            placeholder='Dirección'
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                            style={{borderColor: error === 'address' && 'red'}}
                        />
                        {error === 'address' && <span className='text-danger mb-1'>Ingrese una dirección válida</span>}

                        <input 
                            type='text'
                            placeholder='Ciudad'
                            value={ciudad}
                            onChange={e => setCiudad(e.target.value)}
                            style={{borderColor: error === 'city' && 'red'}}
                        />
                        {error === 'city' && <span className='text-danger mb-1'>Ingrese una ciudad válida</span>}

                        <input 
                            type='text'
                            placeholder='Codigo Postal'
                            value={postal}
                            onChange={e => setPostal(e.target.value)}
                            style={{borderColor: error === 'cp' && 'red'}}
                        />
                        {error === 'cp' && <span className='text-danger mb-1'>Ingrese un CP válido</span>}

                        <input 
                            type='text'
                            placeholder='País'
                            value={pais}
                            onChange={e => setPais(e.target.value)}
                            style={{borderColor: error === 'country' && 'red'}}
                        />
                        {error === 'country' && <span className='text-danger mb-1'>Ingrese un país válido</span>}

                        {
                            orderLoading ?
                            (
                                <div className="fa-3x text-center my-2">
                                    <i className="fas fa-spinner fa-pulse text-primary"></i>
                                </div>
                            ) : (
                                <input type='submit' value='Continuar'/>
                            )
                        }
                                                
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CheckoutContainer

