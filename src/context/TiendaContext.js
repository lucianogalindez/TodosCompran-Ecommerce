import {createContext, useEffect, useState} from 'react'

export const TiendaContext = createContext()

export const TiendaProvider = ({children}) => {

    const [cart, setCart] = useState(
        localStorage.getItem('cart') !== null ?
        JSON.parse(localStorage.getItem('cart')) :
        []
    )

    useEffect(() => {

            localStorage.setItem('cart', JSON.stringify(cart))

    }, [cart])

    const addToCart = (product) => {

        const existItem = cart.find(x => x.id === product.id)

        if(existItem) {
            setCart(cart.map(x => x.id === existItem.id ? product : x))
            console.log(cart)
        }else{
            setCart([...cart, product])
        }

    }

    const removeItem = (product) => {

        setCart(cart.filter(item => item.id !== product.id))

    }


    return <TiendaContext.Provider value={{cart, addToCart, removeItem}}>
        {children}
    </TiendaContext.Provider>
}