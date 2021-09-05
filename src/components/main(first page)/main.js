import './main.css'
import { React } from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div className='main d-flex justify-content-center align-items-center '>
      <div className='btn_group container '>
        <Link
          className='btn btn-xl border-warning btn-dark btn-select'
          to='/login'
        >
          <h2>SIGN IN</h2>
        </Link>
        <Link
          className='btn btn-xl border-warning btn-dark btn-select'
          to='/register'
        >
          <h2> SIGN UP </h2>
        </Link>
      </div>
    </div>
  )
}

export default Main
