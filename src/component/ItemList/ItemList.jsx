import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'

import './ItemList.css'

const ItemList = () => {

    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
    
        const getProducts = async () => {

            setLoading(true)

            const data = await db.collection('products').get()

            setLoading(false)

            const results = data.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setProducts(results)

        }

        getProducts()

        /* setProducts([
            {
                id: 1,
                title: 'Notebook Asus',
                price: 129999,
                image: '/images/products/notebook.jpeg'
            },
            {
                id: 2,
                title: 'Pantalla Curva',
                price: 8999,
                image: '/images/products/tvcurvo.jpg'
            },
            {
                id: 3,
                title: 'Spiderman PS5',
                price: 8999,
                image: '/images/products/tablet.jpg'
            },
            {
                id: 4,
                title: 'Pantalla Curva',
                price: 8999,
                image: '/images/products/spiderman.jpg'
            }
        ]) */

    }, [])



    
    if(!loading) {
    return (
        <div className='row row-cols-1 row-cols-md-3 row-cols-sm-2 g-4 mb-5'>

            {
                products.map(item => (
                    
                    <div className='col mt-4' key={item.id}>
                        <Link to={`/producto/${item.id}`} className='text-dark text-decoration-none '>
                            <div className='card cardItem'>
                                <img src={item.image} alt={item.name} height='200' className='card-img-top' style={{objectFit: 'contain'}}/>

                                <div className='card-body' style={{backgroundColor: '#F5F5F5'}}>
                                    <h5 className='card-title text-muted'>{item.name}</h5>
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <p className='font-weight-bold'>$ {item.price}</p>
                                            <span className='small h5'>Stock: {item.stock}</span>
                                        </div>
                                        <button type='button' className='buttonCart'/* 'btn btn-primary btn-sm btn-cart' */>
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        </Link>
                    </div>
                    
                ))
            }
            
        </div>
    )
    } else {
        return (
            <div className="fa-3x text-center">
                <i className="fas fa-spinner fa-pulse text-primary"></i>
            </div>
        )
    }
}

export default ItemList
