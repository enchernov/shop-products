import React, { FunctionComponent, useContext } from 'react'
import { Select, MenuItem, FormControl } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { ShopContext } from '@providers/ShopProvider'
import { setSorting } from '@actions/shop'

import { useStyles } from './SortingSelector.styles'

const SortingSelector: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(ShopContext)

  const handleChange = (event) => {
    dispatch(setSorting(event.target.value))
  }

  const minimalSelectClasses = useStyles()

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon
        className={props.className + ' ' + minimalSelectClasses.icon}
      />
    )
  }

  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    // anchorOrigin: {
    //   vertical: 'bottom',
    //   horizontal: 'left',
    // },
    // transformOrigin: {
    //   vertical: 'top',
    //   horizontal: 'left',
    // },
    getContentAnchorEl: null,
  }

  return (
    <FormControl>
      <Select
        disableUnderline
        classes={{ root: classes.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        value={state.sorting}
        onChange={handleChange}
      >
        <MenuItem value={'newest'} className={classes.menuItem}>
          Новинки &#128142;
        </MenuItem>
        <MenuItem value={'lowToHigh'} className={classes.menuItem}>
          По цене &#128070;
        </MenuItem>
        <MenuItem value={'highToLow'} className={classes.menuItem}>
          По цене &#128071;
        </MenuItem>
        <MenuItem value={'rating'} className={classes.menuItem}>
          По рейтингу &#10024;
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default React.memo(SortingSelector)
