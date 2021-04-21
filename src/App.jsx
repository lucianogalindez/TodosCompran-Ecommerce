import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, 
  Route,
  Switch,
} from 'react-router-dom';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import CartContainer from './container/CartContainer/CartContainer';
import HomeContainer from './container/HomeContainer';
import ItemDetail from './container/ItemDetail/ItemDetail';
import LoginContainer from './container/LoginContainer/LoginContainer';

function App(props) {

  const [location, setLocation] = useState('')

  useEffect(() => {
    
    const getLocation = (path) => {
      setLocation(path)
    }

    getLocation(window.location.pathname)

  }, [])


  return (
    <Router>
      
      {
        location !== '/login' && <Navbar/>
      }
    
      <Switch>

        <Route path='/' exact>
          <HomeContainer setLocation={setLocation}/>
        </Route>

        <Route path='/producto/:id'>
          <ItemDetail/>
        </Route>

        <Route path='/login'>
          <LoginContainer setLocation={setLocation}/>
        </Route>

        <Route path='/cart'>
          <CartContainer/>
        </Route>

      </Switch>

      {
        location !== '/login' && <Footer/>
      }
      
    </Router>
  );
}

export default App;
