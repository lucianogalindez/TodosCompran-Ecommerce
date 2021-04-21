import React, { useContext } from 'react'
import { TiendaContext } from '../../context/TiendaContext'

import './CartContainer.css'

const CartContainer = () => {

    const {cart, removeItem} = useContext(TiendaContext)

    console.log(cart)

    return (
        <div className='container my-4 cartContainer'>
            <div className='row d-flex justify-content-center'>

                <div className='col-lg-7 mb-4 mx-3'>
                    <div>
                        {
                            cart.map(item => (
                                <div key={item.id} className='d-flex flex-column mb-5'>
                                    <div className='d-flex flex-wrap align-items-center justify-content-evenly p-1 mb-1'>
                                        <img src={item.image} alt='' height='80'/>
                                        <h5 className='small'>{item.name}</h5>
                                        <h6 className='text-danger mx-1'>{item.qty} x ${item.price}</h6>
                                    </div>

                                    <button className='btn-sm btn-outline-secondary mt-2 w-100 text-center boton deleteBtn' onClick={() => removeItem(item)}>Eliminar</button>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='col-lg-4 mt-2'>
                    <div className='card p-3 bg-light d-flex flex-column'>

                        <div className='text-center d-flex align-items-center flex-wrap'>
                            <h5 className='me-2 mb-0'>
                                SubTotal ({cart.reduce((a,c) => a+1*c.qty, 0)} items) :
                            </h5>
                            <h5 className='text-primary mb-0'>
                                $ {cart.reduce((a,c) => a+c.qty*c.price, 0)}
                            </h5>
                        </div>
                

                        <button className='btn btn-primary w-100 mt-3'>Realizar Compra</button>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartContainer
