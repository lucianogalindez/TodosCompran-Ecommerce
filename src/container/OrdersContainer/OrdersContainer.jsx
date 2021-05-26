import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../context/UserContext'
import { db } from '../../firebase'

const OrdersContainer = () => {

    const [orders, setOrders] = useState([])

    const {user} = useContext(UserContext)
    const history = useHistory()

    /*http://localhost:3000${history.location.pathname} */

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + '...' : string
    }

    useEffect(() => {

        const getOrders = async () => {
            const data = await db.collection('users')
                .doc(user.email)
                .collection('orders')
                .get()

            const orderDB = data.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setOrders(orderDB)

        }

        getOrders()

    }, [user.email])

    const redirect = (id) => {
        history.push(`/placeorder/${id}`)
    }

    console.log(orders)

    return (
        <div className='container my-5'>

            <div className='row justify-content-center'>

                <div className='col-md-6'>
                    <h3 className='text-center text-muted'>
                        Tus Ordenes, {user.name}
                    </h3>

                    {
                        orders.map(order => (
                            <div className='card my-3 p-3' onClick={() => redirect(order.id)} key={order.id} style={{borderRadius: '20px', cursor: 'pointer'}}>
                                <h5 className='card-title small mb-3'>Orden N° {order.id}</h5>

                                    {
                                        order.cart.map(item => (
                                            <div key={item.name} className='m-1 d-flex justify-content-between align-items-center'>
                                                <img src={item.image} alt='' height={40}/>
                                                <p className='m-0'>{truncate(item.name, 15)}</p>
                                                <span>Qty: {item.qty}</span>
                                            </div>
                                        ))
                                    }

                                <hr/>
                                
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0 mt-1 d-flex border-4 fw-normal'>Estado: <span className='text-uppercase ms-1 fw-bold'>{order.status}</span></p>
                                    <p className='mb-0 mt-1 d-flex border-4 text-muted fw-bold'>$ {order.totalPrice}</p>
                                </div>

                            </div>
                        ))
                    }
                    
                </div>

            </div>
            
        </div>
    )
}

export default OrdersContainer
