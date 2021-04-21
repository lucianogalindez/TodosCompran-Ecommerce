import React, { useEffect, useState } from 'react'
import './ItemDetail.css'

import {useParams} from 'react-router-dom'
import { db } from '../../firebase'
import Counter from '../../component/Counter/Counter'

const ItemDetail = () => {

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [inCart, setInCart] = useState(false)

    const {id} = useParams()

    console.log(id)

    useEffect(() => {

        const getProduct = async () => {
            setLoading(true)
            const data = await db.collection('products').doc(id).get()
            setLoading(false)

            const res = {
                id: data.id,
                ...data.data()
            }

            setProduct(res)

        }

        getProduct()

        /* setProduct(
            {
                id: 3,
                title: 'Pantalla Curva',
                description: 'Juego de ultima generacion basado en la historia de uno de los superheroes mas famosos del globo. Disfruta de su ultima aparicion, disfruta de Spiderman',
                price: 8999,
                image: '/images/products/tvcurvo.jpg',
                stock: 15
            }
        ) */

    }, [id])

    if(loading) {
        return (
            <div className="fa-3x text-center mt-5" style={{minHeight: '70vh'}}>
                <i className="fas fa-spinner fa-pulse text-primary"></i>
            </div>
        )
    } else if (product) {
        return (
            <div className='fondo pt-5 pb-5'>
                <div className='container container-itemDetail'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-12'>
                            <div className='card card-itemDetail'>
                                <div className='row d-flex flex-wrap'>
                                    <div className='col-md-6 d-flex align-items-center' style={{marginTop: '-1rem'}}>
                                        <div className='images p-3 w-100'>
                                            <div className='text-center'>
                                            <img src={product.image} alt='' width='100%'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6 d-flex'>
                                        <div className='product p-4 w-100'>
                                            <div className='mt-4 mb-3'>
                                                <h5 className='text-uppercase h2'>{product?.name}</h5>
                                                <div className='price d-flex flex-row align-items-center'>
                                                    <span className='act-price'>$ {product.price}</span>
                                                </div>
                                                <p className='about'>
                                                    {product.description}
                                                </p>

                                                <div>
                                                    <Counter product={product} setInCart={setInCart} inCart={inCart}/>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div> 
               
        )
    } else {

        return (
            <div className='text-center'>
                <h4>No se ha encontrado ningun producto</h4>
            </div>
        )
    }

    
}

export default ItemDetail

