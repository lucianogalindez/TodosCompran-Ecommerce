import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, 
  Route,
  Switch,
} from 'react-router-dom';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import CartContainer from './container/CartContainer/CartContainer';
import CheckoutContainer from './container/CheckoutContainer/CheckoutContainer';
import HomeContainer from './container/HomeContainer';
import ItemDetail from './container/ItemDetail/ItemDetail';
import LoginContainer from './container/LoginContainer/LoginContainer';
import PlaceOrderScreen from './container/PlaceOrderScreen/PlaceOrderScreen';

function App(props) {

  const [actualLocation, setActualLocation] = useState('')

  useEffect(() => {
    
    const getLocation = (path) => {
      setActualLocation(path)
    }

    getLocation(window.location.pathname)

  }, [])


  return (
    <Router>
      
      {
        actualLocation !== '/login' && <Navbar/>
      }
    
      <Switch>

        <Route path='/' exact>
          <HomeContainer setActualLocation={setActualLocation}/>
        </Route>

        <Route path='/producto/:id'>
          <ItemDetail/>
        </Route>

        <Route 
          path='/login' 
          component={(props) => <LoginContainer {...props} setActualLocation={setActualLocation}/>}
        >
        </Route>

        <Route path='/cart' component={CartContainer}></Route>

        <Route 
          path='/shipping' 
          component={(props) => <CheckoutContainer {...props} setActualLocation={setActualLocation}/>} 
        ></Route>

        <Route path='/placeorder/:id' component={PlaceOrderScreen}></Route>

      </Switch>

      {
        actualLocation !== '/login' && <Footer/>
      }
      
    </Router>
  );
}

export default App;
