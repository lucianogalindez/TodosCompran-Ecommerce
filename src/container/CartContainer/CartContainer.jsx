import React, { useContext } from 'react'
import { TiendaContext } from '../../context/TiendaContext'
import { UserContext } from '../../context/UserContext'
import { Link, useHistory } from 'react-router-dom'

import './CartContainer.css'

const CartContainer = () => {

    const history = useHistory()

    const {cart, removeItem} = useContext(TiendaContext)
    const {user} = useContext(UserContext)

    console.log(user.active)

    const checkoutHandler = () => {
        console.log('hola')
        history.push('/login?redirect=shipping')
    }

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + '...' : string
    }

    if (user.active === null) {
        return (
            <div className="fa-3x text-center">
                <i className="fas fa-spinner fa-pulse text-primary"></i>
            </div>
        )
    } else {

        return (
            <div className='container my-5 cartContainer'>
                <div className='row d-flex justify-content-center'>

                    <div className='col-lg-7 mb-4 mx-3'>
                        <div>
                            {
                                cart.map(item => (
                                    <div key={item.id} className='d-flex flex-column mb-5'>
                                        <div className='d-flex flex-wrap align-items-center justify-content-evenly p-1 mb-1'>
                                            <Link to={`/producto/${item.id}`}><img src={item.image} alt='' height='70'/></Link>
                                            <h5 className='small'>
                                                {
                                                    truncate(item.name, 15)
                                                }   
                                            </h5>
                                            <h6 className='text-danger mx-1'>{item.qty} x ${item.price}</h6>
                                        </div>

                                        <button className='buttonCartDelete mx-auto mt-2 w-100 text-center' style={{maxWidth: '30rem'}} onClick={() => removeItem(item)}>Eliminar</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='col-lg-4 mt-2'>
                        <div className='card p-3 bg-light d-flex flex-column' style={{borderRadius: '10px'}}>

                            <div className='text-center d-flex align-items-center flex-wrap'>
                                <h5 className='me-2 mb-0'>
                                    SubTotal ({cart.reduce((a,c) => a+1*c.qty, 0)} items) :
                                </h5>
                                <h5 className='text-primary mb-0'>
                                    $ {cart.reduce((a,c) => a+c.qty*c.price, 0)}
                                </h5>
                            </div>
                    

                            <button 
                                disabled={cart.length === 0} 
                                className='buttonCart mx-0 mt-3 w-100'
                                onClick={checkoutHandler}
                            >Realizar Compra</button>
                            
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CartContainer
