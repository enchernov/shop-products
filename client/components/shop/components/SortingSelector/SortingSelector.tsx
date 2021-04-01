import React, { FunctionComponent, useContext } from 'react'
import { Select, MenuItem, FormControl } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { connectSortBy } from 'react-instantsearch-dom'

import { ShopContext } from '@providers/ShopProvider'
import { setSorting } from '@actions/shop'

import { useStyles } from './SortingSelector.styles'
interface ISortingSelectorProps {
  defaultRefinement: string
  items: Array<{ value: string; label: string }>
}
const SortingSelector: FunctionComponent<ISortingSelectorProps> = connectSortBy(
  ({ items, refine }) => {
    const classes = useStyles()
    const { state, dispatch } = useContext(ShopContext)

    const handleChange = (event) => {
      dispatch(setSorting(event.target.value))
      refine(event.target.value)
    }

    // useEffect(() => {
    //   if (!items.some((i) => i.isRefined)) {
    //     refine(state.sorting)
    //   }
    // }, [items, refine, state.sorting])

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
      // getContentAnchorEl: null,
    }

    return (
      <FormControl>
        <Select
          classes={{ root: classes.select }}
          disableUnderline
          MenuProps={menuProps}
          IconComponent={iconComponent}
          value={state.sorting}
          onChange={handleChange}
        >
          {items.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              className={classes.menuItem}
            >
              {item.label}
            </MenuItem>
          ))}
          {/*<MenuItem value={'newest'} className={classes.menuItem}>*/}
          {/*  Новинки &#128142;*/}
          {/*</MenuItem>*/}
          {/*<MenuItem value={'lowToHigh'} className={classes.menuItem}>*/}
          {/*  По цене &#128070;*/}
          {/*</MenuItem>*/}
          {/*<MenuItem value={'highToLow'} className={classes.menuItem}>*/}
          {/*  По цене &#128071;*/}
          {/*</MenuItem>*/}
          {/*<MenuItem value={'rating'} className={classes.menuItem}>*/}
          {/*  По рейтингу &#10024;*/}
          {/*</MenuItem>*/}
        </Select>
      </FormControl>
    )
  }
)

export default SortingSelector
