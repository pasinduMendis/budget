import { useState } from 'react'
import './currency.css'
const Currecy = (props) => {
  const [currType, setCurrType] = useState('LKR')
  return (
    <div>
      <select
        className='btn btn-dark border-warning btn-lg px-5 m-3'
        onChange={(e) => {
          props.onChange(e.target.value)
          setCurrType(e.target.value)
          console.log(currType)
        }}
      >
        <option value='LKR'>LKR</option>
        <option value='USD'>USD</option>
        <option value='AUD'>AUD</option>
        <option value='EURO'>EURO</option>
        <option value='GBP'>GBP</option>
      </select>
    </div>
  )
}

export default Currecy
