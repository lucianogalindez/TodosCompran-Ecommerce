import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrderScreen.css'
import {useHistory, useParams} from 'react-router-dom'
import { db } from '../../firebase'
import { UserContext } from '../../context/UserContext'

const PlaceOrderScreen = () => {

    const history = useHistory()

    const [order, setOrder] = useState('')
    const [urlMP, setUrlMP] = useState('')
    const [status, setStatus] = useState('')

    const {user} = useContext(UserContext)
    const {id} = useParams()

    if (history.location.search) {
        console.log(history.location.search.split('&')[3].split('=')[1])
    }

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + '...' : string
    }

    useEffect(() => {

        history.location.search && setStatus(history.location.search.split('&')[3].split('=')[1])

        const pagarMP = (products) => {
            
            /* https://www.mercadopago.com.ar/developers/es/reference/preferences/_checkout_preferences/post */
            return fetch('https://api.mercadopago.com/checkout/preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer TEST-959807999894080-090620-44560d8f0723d4a8d1895a07ceb383db-2875546`
                },
                body: JSON.stringify({
                    items: products 
                        /* [{
                            title: "Dummy Item",
                            description: "Multicolor Item",
                            quantity: 1,
                            currency_id: "ARS",
                            unit_price: 10.0
                        }] */,
                    back_urls: {
                        success: `http://localhost:3000${history.location.pathname}`,
                        pending: `http://localhost:3000${history.location.pathname}`
                    }
                })
            })
        }

        const createPayment = (products) => {

            console.log(products)

            pagarMP(products)
                .then(result => result.json())
                .then(result => setUrlMP(result.init_point))
        }

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

                    if(dbOrder.data().status === 'NOT PAID') {

                        let products = [{
                            title: "Productos",
                            quantity: 1,
                            currency_id: "$",
                            unit_price: dbOrder.data().totalPrice
                        }]
                        
                        createPayment(products)

                    }
                }
                
            }catch(error){
                console.log(error)
            }

        }

        const updateOrder = async() => {
            try {
                await db.collection('users')
                .doc(user.email)
                .collection('orders')
                .doc(id)
                .update({
                    status: status
                })
            } catch(error) {
                console.log(error.message)
            }
        }

        getOrder()

        status && updateOrder()

    }, [user, id, history, status])


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
                            <p className='mb-1 fw-bold'>
                                Estado: <span className='fw-bold text-uppercase'>{order.status}</span>
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
                            {
                                order.status === 'NOT PAID' && 
                                (
                                    <div>
                                        <a href={urlMP} className='btn btn-info w-100 m-0 mt-4'>PAGAR</a>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div> 
    
                </div>
    
            </div>
        )
    }

    
}

export default PlaceOrderScreen
