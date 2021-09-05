import './login.css'
import { React, useState, useEffect } from 'react'
import LoginNav from '../loginNavBar/loginNav'
import axios from 'axios'

import { Redirect } from 'react-router-dom'
//import axios from 'axios'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [passw, setPassw] = useState('')
  const [checkPass, setCheckPass] = useState('')
  const [isAuth, setIsAuth] = useState(true)
  const [urlPage, setUrlPage] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    axios.get('http://localhost:4000/user/check2/' + email).then((res) => {
      // eslint-disable-next-line

      setUrlPage(`/user/${res.data._id}`)
      // eslint-disable-next-line
      setId(res.data._id)
    })
    //window.alert(id)
  }, [email])

  useEffect(() => {
    axios
      .get('http://localhost:4000/user/check/' + email + '/' + passw)
      .then((res) => {
        setCheckPass(res.data)

        //window.alert(res.data)
      })
  }, [passw, email])

  const Submit = () => {
    //window.alert(checkPass)

    if (checkPass === 'done') {
      setIsAuth(false)
    } else {
      window.alert('email and password did not match')
    }
  }
  if (!isAuth) {
    return <Redirect to={urlPage} />
  }

  return (
    <div className='col bodyLog'>
      <div className='Lognav col-sm-12 d-flex justify-content-end'>
        <LoginNav />
      </div>
      <div className='main-wrap'>
        <div className=' row'>
          <div className='col-lg-6 col-md-0 vh-100 login_back'></div>

          <div className='col-lg-6 col-md-12 justify-content-center form mt-3'>
            <img
              className='logo'
              src='https://icon-library.com/images/dollar-sign-icon-png/dollar-sign-icon-png-6.jpg'
              alt=''
            />
            <h1 className='text-warning mb-5 mt-3 text-center'>
              BUDGET SYSTEM
            </h1>
            <h1 className='text-light mb-4 mt-3 text-center'>USER LOGIN</h1>
            <form onSubmit={Submit}>
              <div className='d-flex flex-row align-items-center mb-3'>
                <i className='fas fa-user fa-lg me-3 fa-fw' />
                <div className='form-outline flex-fill mb-0'>
                  <input
                    required
                    type='email'
                    id='form3Example1c'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    className='form-label text-light'
                    htmlFor='form3Example1c'
                  >
                    Email
                  </label>
                </div>
              </div>
              <div className='d-flex flex-row align-items-center mb-4'>
                <i className='fas fa-user fa-lg me-3 fa-fw' />
                <div className='form-outline flex-fill mb-0'>
                  <input
                    required
                    type='password'
                    id='form3Example1c'
                    className='form-control'
                    value={passw}
                    onChange={(e) => setPassw(e.target.value)}
                  />
                  <label
                    className='form-label text-light'
                    htmlFor='form3Example1c'
                  >
                    password
                  </label>
                </div>
              </div>

              <div className='d-flex justify-content-center  mx-4 mb-1 mb-lg-4'>
                <button
                  type='submit'
                  className='btn btn-primary border-warning btn-lg '
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
