import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrderScreen.css'
import {useHistory, useParams} from 'react-router-dom'
import { db } from '../../firebase'
import { UserContext } from '../../context/UserContext'

const PlaceOrderScreen = () => {

    const history = useHistory()
    const [order, setOrder] = useState('')

    const {user} = useContext(UserContext)
    const {id} = useParams()

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + '...' : string
    }

    useEffect(() => {

        const getOrder = async() => {

            user.active === false && history.push('/login')

            try {
                if(user.active){
                    const dbOrder = await db
                    .collection('users')
                    .doc(user.email)
                    .collection('orders')
                    .doc(id)
                    .get()

                    setOrder({
                        id: dbOrder.id,
                        ...dbOrder.data()
                    })
                }
                
            }catch(error){
                console.log(error)
            }

        }

        getOrder()

    }, [user, id, history])


    if(user.active === null || order === '') {
        return (
            <div className="fa-3x text-center mt-5" style={{minHeight: '70vh'}}>
                <i className="fas fa-spinner fa-pulse text-primary"></i>
            </div>
        )
    }else{
        return (
            <div className='container mt-3 container-placeorder'>
    
                <div className='row d-flex'>
    
                    <div className='col-md-8'>
    
                        <div className='card p-3 mt-3 bg-light'>
                            <h5 className='card-title text-capitalize mb-3'>
                                Datos de envio
                            </h5>
                            <div>
                                <p className='mb-1 fw-bold'>
                                    Nombre: <span className='fw-normal'>{order.name}</span>
                                </p>
                                <p className='mb-1 fw-bold'>
                                    Domicilio: <span className='fw-normal'>{order.direccion}, {order.ciudad}, {order.pais}</span>
                                </p>
                            </div>
                        </div>
    
                        <div className='card p-3 mt-3 bg-light'>
                            <h5 className='card-title text-capitalize mb-3'>
                                Medio de pago
                            </h5>
                            <p className='mb-1 fw-bold'>
                                Metodo: <span className='fw-normal'>Mercado Pago</span>
                            </p>
                        </div>
    
                        <div className='card p-3 mt-3 bg-light'>
                            <h5 className='card-title text-capitalize mb-3'>
                                Detalles de la orden
                            </h5>
                            <div>
                                {
                                    order.cart.map(item => (
                                        <div key={item.id} className='d-flex justify-content-between align-items-center flex-wrap mt-1'>
                                            <img src={item.image} alt={item.title} height={50}/>
                                            <span>{truncate(item.name, 15)}</span>
                                            <span>Qty: {item.qty}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
    
                    </div>
    
                    <div className='col-md-4'>
                        <div className='card mt-3 bg-light p-3'>
                            <div className='d-flex justify-content-between'>
                                <span className='fw-bold'>Subtotal</span>
                                <span>$ {order.totalPrice}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <span className='fw-bold'>Descuento</span>
                                <span>
                                    {
                                        order.totalPrice > 100000 ?
                                        `$ ${parseInt(order.totalPrice * 0.05)}` :
                                        '-'
                                    }
                                </span>
                            </div>
                            <hr/>
                            <div className='d-flex justify-content-between'>
                                <span className='fw-bold'>Total</span>
                                <span>
                                    {
                                        order.totalPrice > 100000 ?
                                        `$ ${order.totalPrice - parseInt(order.totalPrice * 0.05)}` :
                                        `$ ${order.totalPrice}`
                                    }
                                </span>
                            </div>
                            <div>
                                <button className='buttonCart w-100 m-0 mt-4'>PAGAR</button>
                            </div>
                        </div>
                    </div> 
    
                </div>
    
            </div>
        )
    }

    
}

export default PlaceOrderScreen
