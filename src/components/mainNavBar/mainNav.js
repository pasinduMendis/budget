import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import HomePage from '../homePage/homePage'
//import Login from '../login/login'
import { useHistory } from 'react-router'
import CreateRepaort from '../createReport/createRepaort'

const MainNav = () => {
  const [value, setValue] = React.useState(0)
  const history = useHistory()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const bodyPage = (a) => {
    if (a === 0) {
      return <HomePage />
    } else if (a === 1) {
      return <CreateRepaort />
    } else if (a === 2) {
      history.push('/login')
    }
  }
  return (
    <div>
      <Paper
        square
        className='bg-dark d-flex justify-content-end border-warning'
      >
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
        >
          <Tab label='ADD UPDATES' className='text-light btn btn-primary' />
          <Tab label='VIEW REPORT' className='text-light btn btn-primary' />
          <Tab label='LOGOUT' className='btn btn-danger text-light' />
        </Tabs>
      </Paper>
      <div>{bodyPage(value)}</div>
    </div>
  )
}

export default MainNav
