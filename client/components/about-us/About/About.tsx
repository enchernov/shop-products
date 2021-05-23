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
                      Мы знаем, как выбрать самые свежие продукты с идеальной
                      зрелостью
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
                  У нас большой выбор высококачественных товаров, дружелюбное
                  обслуживание и, конечно же, низкие цены каждый день. Цель
                  FoodMarket – предоставить вам лучший опыт покупок в Интернете.
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
                    className={classes.contactContainer}
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
                          Более низкие цены, чем в вашем местном супермаркете,
                          отличный кэшбэк предлагается в довершение всего.
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
                    className={classes.contactContainer}
                    xs={isSmallWidth ? 12 : 4}
                    style={{ animationDelay: `0.1s` }}
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
                          Выберите из более чем 5000 продуктов питания, личной
                          гигиены, домашнего хозяйства и других категорий.
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
                    className={classes.contactContainer}
                    xs={isSmallWidth ? 12 : 4}
                    style={{ animationDelay: `0.2s` }}
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
                          Не удовлетворены продуктом? Верните его на пороге и
                          получите возврат в течение нескольких часов.
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
                      Быстрые покупки с совершенно новым поиском и навигацией.
                      Заказывайте еду в мобильном приложении FoodMarket.
                      Проверьте это легко — всего один шаг!
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
