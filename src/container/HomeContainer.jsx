import React, { useEffect } from 'react'
import Carousel from '../component/Carousel/Carousel'
import ItemList from '../component/ItemList/ItemList'

import './HomeContainer.css'

const HomeContainer = ({setLocation}) => {

    useEffect(() => {
        setLocation(window.location.pathname)
    })

    return (
        <div className='d-flex mt-1 justify-content-center flex-column'>
            
            <Carousel/>

            <div className='container container-home'>

            <h2 className='text-center text-muted display-6 mt-4 mb-3'>
                ¿Qué estas buscando?
            </h2>
            <ItemList/>

            </div>

        </div>
    )
}

export default HomeContainer
