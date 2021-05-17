import React from 'react'
import { connectMenu } from 'react-instantsearch-dom'
import { Grid, Typography } from '@material-ui/core'
import { CategoryOutlined } from '@material-ui/icons'
import { Divider, IconButton, Link } from '@ui/index'
import { useStyles } from '@components/shop/Shop/Shop.styles'
import clsx from 'clsx'

const Menu = connectMenu(({ items, refine, createURL }) => {
  const classes = useStyles()
  const showX = items.some((x) => x.isRefined)
  return (
    <Grid container direction={'column'} spacing={3}>
      <Grid item>
        <Grid container justify={'space-between'} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h3'}>Категории</Typography>
          </Grid>
          {showX ? (
            <Grid item>
              <IconButton icon={'cross'} onClick={() => refine('')} />
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      {items.map((item, index: number) => (
        <Grid
          item
          key={item.value}
          className={classes.categoryRoot}
          style={{ animationDelay: `${index / 10}s` }}
        >
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item>
              <CategoryOutlined
                className={clsx(
                  classes.categoryIcon,
                  item.isRefined ? classes.activeIcon : null
                )}
              />
            </Grid>
            <Grid item>
              <Link
                href={createURL(item.value)}
                className={clsx(
                  classes.categoryLink,
                  item.isRefined ? classes.activeLink : null
                )}
                onClick={(event) => {
                  event.preventDefault()
                  refine(item.value)
                }}
              >
                {item.label}
              </Link>
            </Grid>
          </Grid>
          <Divider className={classes.categoryDivider} />
        </Grid>
      ))}
    </Grid>
  )
})
export default Menu
