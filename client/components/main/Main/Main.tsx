import React, { FunctionComponent, useContext } from 'react'
import {
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import Carousel from '@components/main/Carousel'
import { useStyles } from './Main.styles'
import ProductCard from '@components/shop/components/ProductCard/ProductCard'
import { ShopContext } from '@providers/ShopProvider'
import { Link } from '@ui/index'

const Main: FunctionComponent = () => {
  const classes = useStyles()
  const { state } = useContext(ShopContext)

  const popular = state.products.sort((a, b) => b.rating - a.rating).slice(0, 5)

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))
  const xsWidth = useMediaQuery(theme.breakpoints.down('xs'))
  const mdWidth = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div className={classes.mainContainer}>
      <Grid container direction={'column'} spacing={6}>
        <Hidden xsDown>
          <Grid item sm={12}>
            <Carousel />
          </Grid>
        </Hidden>
        <Grid
          container
          direction={mdWidth ? 'column' : 'row'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid
            item
            className={classes.poster}
            style={mdWidth ? { marginBottom: 32 } : { marginRight: 32 }}
          >
            <Typography variant={'h1'}>Любимые продукты</Typography>
            <Typography variant={'h2'}>На FoodMarket</Typography>
            <Link href={'/shop'}>
              <Typography variant={'body1'}>Магазин</Typography>
            </Link>
          </Grid>
          <Grid item className={classes.poster}>
            <Typography variant={'h1'}>Бесплатная доставка</Typography>
            <Typography variant={'h2'}>Вашего первого заказа</Typography>
            <Link href={'/about-us'}>
              <Typography variant={'body1'}>Подробнее</Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction={'column'} spacing={3}>
            <Grid item style={{ padding: '20px 40px' }}>
              <Typography variant={'h1'}>Популярное сейчас</Typography>
            </Grid>
            <Grid item style={{ padding: '0 0 20px 0' }}>
              <Grid
                container
                direction={xsWidth ? 'column' : 'row'}
                justify={'space-around'}
                alignItems={'center'}
                spacing={3}
              >
                {popular.map((p) => (
                  <Grid item key={`product_${p.id}`}>
                    <ProductCard hit={p} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify={isSmallWidth ? 'space-around' : 'center'}
            alignItems={'center'}
            direction={isSmallWidth ? 'column' : 'row'}
          >
            <Grid item className={classes.banner} xs={isSmallWidth ? 12 : 3}>
              <div>
                <Typography variant={'h1'}>Новинки</Typography>
                <Link href={'/shop'}>Подробнее</Link>
              </div>
            </Grid>
            <Grid
              item
              className={classes.banner}
              xs={isSmallWidth ? 12 : 3}
              style={isSmallWidth ? { marginTop: 24 } : { marginLeft: 24 }}
            >
              <div>
                <Typography variant={'h1'}>Доставка</Typography>
                <Link href={'/delivery'}>Подробнее</Link>
              </div>
            </Grid>
            <Grid
              item
              className={classes.banner}
              xs={isSmallWidth ? 12 : 3}
              style={isSmallWidth ? { marginTop: 24 } : { marginLeft: 24 }}
            >
              <div>
                <Typography variant={'h1'}>Рецепты</Typography>
                <Link href={'/blog'}>Подробнее</Link>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction={'column'} spacing={3}>
            <Grid item style={{ padding: '20px 40px' }}>
              <Typography variant={'h1'}>Люди о FoodMarket</Typography>
            </Grid>
            <Grid item>
              <Grid container direction={isSmallWidth ? 'column' : 'row'}>
                <Grid
                  item
                  xs={isSmallWidth ? 12 : 6}
                  style={
                    isSmallWidth
                      ? { borderBottom: '1px dashed #212121' }
                      : { borderRight: '1px dashed #212121' }
                  }
                >
                  <Grid
                    container
                    spacing={1}
                    className={classes.review}
                    style={
                      xsWidth
                        ? { flexDirection: 'column', alignItems: 'center' }
                        : { flexDirection: 'row', alignItems: 'flex-start' }
                    }
                  >
                    <img
                      src="/images/main/reviews/1.jpeg"
                      alt="Каролин"
                      className={classes.reviewer}
                      style={
                        xsWidth
                          ? { marginRight: 0, marginBottom: '1.5rem' }
                          : {}
                      }
                    />
                    <div
                      className={classes.contents}
                      style={xsWidth ? { width: '100%' } : {}}
                    >
                      <div className={classes.quote}>
                        <Typography variant={'body2'} paragraph={true}>
                          На самом деле, я впервые покупаю продукты в Интернете.
                          Это намного проще, чем я ожидала. На сайте легко
                          ориентироваться, и выбор довольно широк. Курьеры тоже
                          очень вежливы и своевременны!
                        </Typography>
                      </div>
                      <div className={classes.author}>
                        <Typography variant={'h4'}>Каролин Грин</Typography>
                        <Typography variant={'body1'}>Менеджер</Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={isSmallWidth ? 12 : 6}>
                  <Grid
                    container
                    spacing={1}
                    className={classes.review}
                    style={
                      xsWidth
                        ? { flexDirection: 'column', alignItems: 'center' }
                        : { flexDirection: 'row', alignItems: 'flex-start' }
                    }
                  >
                    <img
                      src="/images/main/reviews/2.jpeg"
                      alt="Лиза"
                      className={classes.reviewer}
                      style={
                        xsWidth
                          ? { marginRight: 0, marginBottom: '1.5rem' }
                          : {}
                      }
                    />
                    <div
                      className={classes.contents}
                      style={xsWidth ? { width: '100%' } : {}}
                    >
                      <div className={classes.quote}>
                        <Typography variant={'body2'} paragraph={true}>
                          С вашим хорошим ассортиментом я теперь могу сэкономить
                          время, делая покупки с моим прикованным к инвалидному
                          креслу отцом. Зачем тесниться с людьми и стоять в
                          очереди за милю, чтобы заплатить за продукты, когда у
                          вас есть FoodMarket?
                        </Typography>
                      </div>
                      <div className={classes.author}>
                        <Typography variant={'h4'}>Лиза Картер</Typography>
                        <Typography variant={'body1'}>Учитель</Typography>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Main
