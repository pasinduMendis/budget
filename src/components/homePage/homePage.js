import { useEffect, useState } from 'react'
import './homePage.css'
import CurrencyNav from '../currencyNav/currecy'
import axios from 'axios'

const HomePage = () => {
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [type, setType] = useState('income')
  const [currType, setCurrType] = useState('LKR')
  const [currencyData, setCurrencyData] = useState({})
  const [lkr, setLkr] = useState('0')
  const [gbp, setGbp] = useState('0')
  const [aud, setAud] = useState('0')
  const [euro, setEuro] = useState('0')
  const [rate, setRate] = useState('1')
  const usd = 1
  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)
  const today = new Date()
  //window.alert(today)

  useEffect(() => {
    axios
      .get(
        'http://apilayer.net/api/live?access_key=a2273fba4d967c8d6e06347f16ac60d1&currencies=LKR,AUD,GBP,EUR&source=USD&format=1'
      )
      .then((res) => {
        setCurrencyData(res.data.quotes)
      })

    setEuro(currencyData.USDEUR)
    setGbp(currencyData.USDGBP)
    setLkr(currencyData.USDLKR)
    setAud(currencyData.USDAUD)

    calcRate()
  }, [currType])

  const calcRate = () => {
    if (currType === 'LKR') {
      setRate(1)
    } else if (currType === 'USD') {
      setRate(lkr)
    } else if (currType === 'AUD') {
      setRate((aud / usd) * lkr)
    } else if (currType === 'EURO') {
      setRate((euro / usd) * lkr)
    } else if (currType === 'GBP') {
      setRate((gbp / usd) * lkr)
    }
  }
  const Submit = () => {
    const obj = {
      company_id: id,
      description: description,
      type: type,
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: parseInt(today.getDate()),
      amount: parseFloat(value) * rate,
    }
    axios.post('http://localhost:4000/data/add', obj).then((res) => {
      window.alert(res.data)
    })
  }

  return (
    <div className='align-items-center pb-5 home'>
      <CurrencyNav onChange={(value) => setCurrType(value)} />

      <div className='col-12'>
        <div className='text-dark mb-5 mt-3 text-center'>
          <img
            className='homelogo'
            src='https://icon-library.com/images/dollar-sign-icon-png/dollar-sign-icon-png-6.jpg'
            alt=''
          />
          <h1>BUDGET SYSTEM</h1>
        </div>
      </div>

      <div className='homePage container mt-5 py-5'>
        <h1 className='text-light pb-5'>ADD UPDATES</h1>
        <form onSubmit={Submit}>
          <div className='d-flex flex-row align-items-center mb-3'>
            <div className='form-outline flex-fill mb-0'>
              <input
                required
                type='text'
                id='form3Example1c'
                className='form-control homeForm'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label className='form-label text-light' htmlFor='form3Example1c'>
                Description
              </label>
            </div>
          </div>
          <div className='d-flex flex-row align-items-center mb-4'>
            <div className='form-outline flex-fill mb-0'>
              <select
                className='form-control homeForm'
                onChange={(e) => {
                  setType(e.target.value)
                }}
              >
                <option value='income'>INCOME</option>
                <option value='expenses'>EXPENSES</option>
              </select>
              <label className='form-label text-light'>Type</label>
            </div>
          </div>
          <div className='d-flex flex-row align-items-center mb-4'>
            <div className='form-outline flex-fill mb-0'>
              <input
                required
                type='number'
                id='form3Example4c'
                className='form-control homeForm'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <label className='form-label text-light'>
                Value ({currType})
              </label>
            </div>
          </div>

          <div className='d-flex mb-lg-4'>
            <button
              type='submit'
              className='btn btn-success border-warning btn-lg'
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HomePage
