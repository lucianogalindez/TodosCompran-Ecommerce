import React, { useContext, useEffect } from 'react'
import Carousel from '../component/Carousel/Carousel'
import ItemList from '../component/ItemList/ItemList'
import { UserContext } from '../context/UserContext'

import './HomeContainer.css'

const HomeContainer = ({setActualLocation}) => {

    const {user} = useContext(UserContext)

    useEffect(() => {
        setActualLocation(window.location.pathname)
    })

    return (
        <div className='d-flex mt-1 justify-content-center flex-column'>
            
            <Carousel/>

            <div className='container container-home'>

                {
                    user.active && <h6 className='mt-4 text-muted'>Bienvenido/a de vuelta, {user.name}</h6>
                }    

                <h2 className='text-center text-muted display-6 mt-4 mb-3'>
                    ¿Qué estas buscando?
                </h2>
                <ItemList/>

            </div>

        </div>
    )
}

export default HomeContainer
