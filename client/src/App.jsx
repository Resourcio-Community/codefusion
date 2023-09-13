import { Route, Switch, Redirect } from 'react-router-dom'
import './app.css'
import Payment from './pages/payment'
import Registration from './pages/registration'
import { useContext } from 'react'
import { Context } from './context/Context'

export default function App() {

  const { auth } = useContext(Context)
  

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Registration />
        </Route>
        <Route exact path='/payment'>
          {auth ? <Payment /> : <Redirect to='/' />}
          <Payment />
        </Route>
      </Switch>
    </>
  )
}