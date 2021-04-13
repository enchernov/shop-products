import React, { FunctionComponent } from 'react'
import {
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { useStyles } from './About.styles'
import { useStyles as useCarouselStyles } from '@components/main/Carousel/Carousel.styles'
import { Breadcrumbs, Button, Divider } from '@ui/index'

const About: FunctionComponent = () => {
  const classes = useStyles()
  const carouselClasses = useCarouselStyles()

  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Grid
        container
        direction={'column'}
        justify={'flex-start'}
        className={classes.headline}
        spacing={1}
      >
        <Grid item>
          <Breadcrumbs />
        </Grid>
        <Grid item>
          <Typography variant={'h1'}>О нас</Typography>
        </Grid>
      </Grid>
      <Divider type={'wide'} />
      <div className={classes.mainContainer}>
        <Grid container direction={'column'} spacing={6}>
          <Hidden xsDown>
            <Grid item xs={12}>
              <div className={carouselClasses.root}>
                <div
                  className={carouselClasses.slide}
                  style={{ backgroundImage: `url(/images/about-us/main.jpg)` }}
                >
                  <div className={carouselClasses.contents}>
                    <p className={carouselClasses.title}>
                      Покупать онлайн легко
                    </p>
                    <p className={carouselClasses.subtitle}>
                      We know how to pick the freshest produce with the perfect
                      ripeness.
                    </p>
                    <Button href={'/shop'} className={carouselClasses.button}>
                      Магазин
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
          </Hidden>
          <Grid item xs={12}>
            <Grid container direction={'column'} spacing={3}>
              <Grid item>
                <Typography
                  variant={'h1'}
                  paragraph={true}
                  align={'center'}
                  className={classes.heading}
                >
                  О МAГАЗИНЕ FOODMARKET
                </Typography>
                <Typography
                  variant={'body2'}
                  paragraph={true}
                  align={'center'}
                  className={classes.subHeading}
                >
                  We feature a great selection of high-quality merchandise,
                  friendly service and, of course, Every Day Low Prices. We also
                  have another goal: to bring you the best shopping experience
                  on the Internet.
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  justify={'space-between'}
                  alignItems={'center'}
                  direction={isSmallWidth ? 'column' : 'row'}
                >
                  <Grid
                    item
                    className={classes.contactContanier}
                    xs={isSmallWidth ? 12 : 4}
                  >
                    <Grid container direction={'column'} spacing={2}>
                      <Grid item>
                        <img
                          src="/images/about-us/1.jpg"
                          alt="Лучшие цены и предложения"
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant={'h2'}>
                          Лучшие цены и предложения
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={'body2'} paragraph={true}>
                          Cheaper prices than your local supermarket, great
                          cashback offers to top it off.
                        </Typography>
                        <Typography variant={'body2'} paragraph={true}>
                          Local: 1-555-0167-828
                        </Typography>
                        <Typography variant={'body2'} paragraph={true}>
                          Fax: 1-555-0167-828
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className={classes.contactContanier}
                    xs={isSmallWidth ? 12 : 4}
                  >
                    <Grid container direction={'column'} spacing={2}>
                      <Grid item>
                        <img
                          src="/images/about-us/2.jpg"
                          alt="Широкий ассортимент"
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant={'h2'}>
                          Широкий ассортимент
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={'body2'} paragraph={true}>
                          Choose from 5000+ products across food, personal care,
                          household & other categories.
                        </Typography>
                        <Typography variant={'body2'} paragraph={true}>
                          Local: 1-555-0167-828
                        </Typography>
                        <Typography variant={'body2'} paragraph={true}>
                          Fax: 1-555-0167-828
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className={classes.contactContanier}
                    xs={isSmallWidth ? 12 : 4}
                  >
                    <Grid container direction={'column'} spacing={2}>
                      <Grid item>
                        <img
                          src="/images/about-us/3.jpg"
                          alt="Простой возврат"
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant={'h2'}>Простой возврат</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={'body2'} paragraph={true}>
                          Not satisfied with a product? Return it at the
                          doorstep & get a refund within hours.
                        </Typography>
                        <Typography variant={'body2'} paragraph={true}>
                          Local: 1-555-0167-828
                        </Typography>
                        <Typography variant={'body2'} paragraph={true}>
                          Fax: 1-555-0167-828
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Hidden xsDown>
            <Grid item xs={12}>
              <div className={classes.root}>
                <div
                  className={classes.slide}
                  style={{ backgroundImage: `url(/images/about-us/app.jpeg)` }}
                >
                  <div className={classes.contents}>
                    <Typography
                      variant={'h2'}
                      className={classes.title}
                      paragraph={true}
                    >
                      Food Market iPhone & Android App
                    </Typography>
                    <Typography
                      variant={'body2'}
                      className={classes.subtitle}
                      paragraph={true}
                    >
                      Faster shopping with a whole new way to search and
                      navigate. Shop your last order again with just one click.
                      Check out easily — just one step!
                    </Typography>
                    <Button href={'/shop'} className={classes.button}>
                      Загрузить
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </>
  )
}

export default About
