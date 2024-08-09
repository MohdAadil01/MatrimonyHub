import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import {makeStyles} from '@material-ui/core/styles'
    const useStyles = makeStyles({
        root: {
            width: '50%',
            display: 'flex',
            margin:'2px 30px', 
            flexDirection: 'column',
            justifyItems: 'center',
            gap: 6
            
          },
          toggle: {
            fontFamily: `'Raleway', sans-serif`,
            fontSize: '.8rem',
            border: '1px solid black',
            borderRadius: '10px',
            color:'black',
            '&.MuiToggleButtonGroup-groupedHorizontal:not(:last-child)': {
              borderRadius: '10px',
            },
            '&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)': {
              borderRadius: '10px',
              border: '1px solid black',
            },
            '&.Mui-selected': {
              borderRadius: '10px',
              background: '#000',
              color: '#fff',
            },
            '&.MuiToggleButton-root': {
              '&:hover': {
                background: '#000',
                color: '#fff',
              },
            },
          },
        });
function FilterListToogle({options, value, selectToggle}) {
    const classes = useStyles()
  return (
    <ToggleButtonGroup value={value} onChange={selectToggle} className={classes.root} exclusive>
    
    {options.map(({serviceType, id, value})=><ToggleButton className={classes.toggle} key={id} value={value}>{serviceType} </ToggleButton>)}
    
    </ToggleButtonGroup>
  )
}

export default FilterListToogle