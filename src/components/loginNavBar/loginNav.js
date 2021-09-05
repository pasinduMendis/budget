import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router-dom'
import './loginNav.css'

const useStyles = makeStyles({
  root: {
    width: 500,
    backgroundColor: 'teal',
  },
})

export default function SimpleBottomNavigation() {
  const classes = useStyles()
  const [value, setValue] = React.useState(3)
  const history = useHistory()

  useEffect(() => {
    if (value === 0) {
      history.push('/login')
    }
    if (value === 1) {
      history.push('/register')
    }
  }, [value, history])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: 'white' }}
        label='SIGN IN'
        icon={<AccountCircleIcon />}
      />
      <BottomNavigationAction
        style={{ color: 'white' }}
        label='SIGN UP'
        icon={<PersonAddIcon />}
      />
    </BottomNavigation>
  )
}
