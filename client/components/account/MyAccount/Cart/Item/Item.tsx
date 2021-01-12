import React, { FunctionComponent } from 'react'
import { ICategoryProps, IProductProps } from '@interfaces/shop'
import { Grid, Paper, Typography } from '@material-ui/core'
import { useStyles } from './Item.styles'
import { Link } from '@ui/index'

const Item: FunctionComponent = ({
  name,
  image,
  categories,
  price,
  rating,
  id,
}: IProductProps) => {
  const classes = useStyles()
  return (
    <Paper square={true} className={classes.root}>
      <Grid container justify={'space-between'}>
        <Grid item>
          <img src={image.url} alt={name} className={classes.image} />
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Grid
                container
                justify={'flex-start'}
                alignItems={'center'}
                spacing={1}
              >
                {categories.map((category: ICategoryProps, index: number) => (
                  <Grid item key={index}>
                    <Link
                      href={`/category/${category.link}`}
                      className={classes.link}
                    >
                      {category.name}
                    </Link>
                    {index !== categories.length - 1 && ','}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Link href={`/products/${id}`} className={classes.name}>
                <Typography variant={'h2'}>{name}</Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Item
