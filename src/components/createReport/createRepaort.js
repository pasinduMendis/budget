import { useRef } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ExpensesTable from './ExpensesTable'
import IncomTable from './IncomTable'
import CurrencyNav from '../currencyNav/currecy'
import './createReport.css'
//import { PDFExport, savePDF } from '@progress/kendo-react-pdf'

const CreateRepaort = () => {
  const [currType, setCurrType] = useState('LKR')
  const [year, setYear] = useState('2021')
  const [month, setMonth] = useState('1')
  const [data, setdata] = useState([])
  // const [totalExp, setTotalExp] = useState(0)
  //const [totalInc, setTotalInc] = useState(0)
  const [currencyData, setCurrencyData] = useState({})
  const [lkr, setLkr] = useState('0')
  const [gbp, setGbp] = useState('0')
  const [aud, setAud] = useState('0')
  const [euro, setEuro] = useState('0')
  const [rate, setRate] = useState('1')
  const usd = 1

  // const Export = useRef(null)

  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)
  //window.alert(id)
  //const today = new Date()
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

  useEffect(() => {
    axios
      .get('http://localhost:4000/data/check/' + id + '/' + year + '/' + month)
      .then((res) => {
        setdata(res.data)
      })
      .catch(function (err) {
        console.log(err)
      })
  }, [year, month])

  /*   setTotalExp(total('expenses'))
  setTotalInc() */

  const tabRowExpenses = () => {
    return data.map(function (object, i) {
      return <ExpensesTable obj={object} rate={rate} key={i} />
    })
  }

  const tabRowIncom = () => {
    return data.map(function (object, i) {
      return <IncomTable obj={object} rate={rate} key={i} />
    })
  }

  const total = (a) => {
    var total = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === a) {
        total = total + data[i].amount
      }
      //window.alert(total)
    }
    return total * rate
  }

  const calcRate = () => {
    if (currType === 'LKR') {
      setRate(1)
    } else if (currType === 'USD') {
      setRate((usd * 1) / lkr)
    } else if (currType === 'AUD') {
      setRate((aud * 1) / lkr)
    } else if (currType === 'EURO') {
      setRate((euro * 1) / lkr)
    } else if (currType === 'GBP') {
      setRate((gbp * 1) / lkr)
    }
  }

  return (
    <div className='align-items-center pb-5 report'>
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

      <div className='row mx-5 py-5 px-5 border border-dark'>
        <div className='col-4 mb-3'>
          <input
            required
            type='text'
            id='form3Example1c'
            className='form-control homeForm'
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <label className='form-label text-dark'>
            <h5>YEAR</h5>
          </label>
        </div>

        <div className='col-4 mb-3'>
          <select
            className='btn btn-light homeForm'
            onChange={(e) => {
              setMonth(e.target.value)
            }}
          >
            <option value='1'>JANUARY</option>
            <option value='2'>FEBRUARY</option>
            <option value='3'>MARCH</option>
            <option value='4'>APRIL</option>
            <option value='5'>MAY</option>
            <option value='6'>JUNE</option>
            <option value='7'>JULY</option>
            <option value='8'>AUGUST</option>
            <option value='9'>SEPTEMBER</option>
            <option value='10'>OCTOMBER</option>
            <option value='11'>NOVEMVER</option>
            <option value='12'>DECEMBER</option>
          </select>
          <label className='form-label text-dark col-12'>
            <h5>MONTH</h5>
          </label>
        </div>

        <div className='col-xl-6 col-lg-12 border border-dark'>
          <table className='table table-striped mt-5'>
            <thead>
              <tr>
                <th className='text-dark'>INCOME</th>
              </tr>

              <tr>
                <th className='text-dark'>DATE</th>
                <th className='text-dark'>DESCRIPTION</th>
                <th className='text-dark'>AMOUNT({currType})</th>
              </tr>
            </thead>
            <tbody>{tabRowIncom()}</tbody>
          </table>
          <h4>
            Total Income = {total('income')} {currType}
          </h4>
        </div>
        <div className='col-xl-6 col-lg-12 border border-dark'>
          <table className='table table-striped mt-5'>
            <thead>
              <tr>
                <th className='text-dark'>EXPENSES</th>
              </tr>

              <tr>
                <th className='text-dark'>DATE</th>
                <th className='text-dark'>DESCRIPTION</th>
                <th className='text-dark'>AMOUNT({currType})</th>
              </tr>
            </thead>
            <tbody>{tabRowExpenses()}</tbody>
          </table>
          <h4>
            Total Expenses = {total('expenses')} {currType}
          </h4>
        </div>
        <div className='bg-dark text-light p-5 my-3 border border-warning'>
          <h4 className='col-12'>
            Total Income = {total('income')} {currType}
          </h4>
          <h4 className='col-12'>
            Total Expenses = {total('expenses')} {currType}
          </h4>
          <h4 className='col-12'>
            Balance = {total('income') - total('expenses')} {currType}
          </h4>
        </div>
      </div>

      {/*  <button
        className='btn btn-success btn-lg'
        onClick={Export.current.save()}
      >
        generate PDF report
      </button> */}
    </div>
  )
}

export default CreateRepaort
