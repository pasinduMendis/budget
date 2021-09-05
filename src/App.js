import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login/login.js'
import Register from './components/register/register.js'
//import LoginNav from './components/loginNavBar/loginNav.js'
import Main from './components/main(first page)/main.js'
//import HomePage from './components/homePage/homePage.js'
import MainNav from './components/mainNavBar/mainNav'
import CreateRepaort from './components/createReport/createRepaort'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState('')
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route path='/' component={Main} exact />
          <Route path='/login'>
            <Login onChange={(value) => setUser(value)}></Login>
          </Route>
          <Route path='/register' component={Register} />
          {/*  <Route path='/home/:id' component={HomePage} /> */}
          <Route path='/user/:id' component={MainNav} />
          {/*  */}
          <Route path='/report/:id' component={CreateRepaort} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
