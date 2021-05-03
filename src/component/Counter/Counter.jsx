import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { TiendaContext } from '../../context/TiendaContext'
import './Counter.css'

const Counter = ({product, setInCart, inCart}) => {

    const [qty, setQty] = useState('')

    const {addToCart} = useContext(TiendaContext)

    const addItem = () => {
        if (qty < product.stock) {
            setQty(Number(qty) + 1)
        }
    }

    const removeItem = () => {

        if(qty > 0) {
            setQty(Number(qty) - 1)
        }

    }

    const toCart = () => {
        const order = {...product, qty: qty}

        console.log(order)
        
        addToCart(order)
        setInCart(true)
    }

    return (
        <div className='counter my-4'>
            
            <div className='counter__cart d-flex flex-column align-items-center'>

                <div className='w-100 d-flex align-items-center'>

                    <div className='counter__item d-flex justify-content-between' style={{backgroundColor: 'white'}}>

                        <i className="far fa-minus-square plus" onClick={() => removeItem()}></i>

                        <input 
                            className='counter__input'
                            type='number'
                            placeholder='0'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                        ></input>
                        
                        <i className="far fa-plus-square plus" onClick={() => addItem()}></i>  
                        
                    </div>
                    <div className='ms-3'>
                        Stock: {product.stock}
                    </div>

                </div>

                <div className='cart mt-4 align-items-center w-100'>
                    {
                        inCart ?
                        (
                            <>
                            <Link to='/cart'>
                                <button
                                    className='buttonCart w-100 m-0 mb-2'/* 'btn btn-primary text-uppercase mr-2 my-2 px-4 w-100 boton' */
                                >
                                    Finalizar Compra
                                </button>
                            </Link>
                            <Link to='/'>
                                <button
                                    className='buttonCartDelete w-100 m-0 mb-2'/* 'btn btn-secondary text-uppercase mr-2 px-4 w-100 boton' */
                                >
                                    Continuar Comprando
                                </button>
                            </Link>
                            </>
                        ) : (
                            <button 
                                className='buttonCart w-100 m-0'/* 'btn btn-primary text-uppercase mr-2 my-2 px-4 w-100 boton' */ 
                                disabled={(qty > product.stock) || qty <= 0}
                                onClick={() => toCart()}
                            >
                                Agregar a Carrito
                            </button>
                        )
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Counter
