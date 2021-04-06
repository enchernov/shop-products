import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import { useStyles } from './ProductSearchBox.styles'
import { IconButton } from '@ui/index'

const ProductSearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  const classes = useStyles()
  const handleChange = (event) => {
    refine(event.currentTarget.value)
  }
  return (
    <form
      noValidate
      action=""
      role="search"
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <input
        className={classes.root}
        type="search"
        placeholder={'Поиск продуктов'}
        value={currentRefinement}
        onChange={handleChange}
      />
      {!currentRefinement.length && (
        <IconButton icon={'search'} className={classes.icon} />
      )}
    </form>
  )
})

export default ProductSearchBox
