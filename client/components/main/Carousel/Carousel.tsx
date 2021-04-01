import React, { FunctionComponent, useCallback, useState } from 'react'
import { useStyles } from './Carousel.styles'
import { ArrowRight, ArrowLeft } from '@material-ui/icons'
import { Grid } from '@material-ui/core'
import { Button } from '@ui/index'

interface ISlideProps {
  image: string
  title: any
  subtitle: any
  button: {
    text: string
    url: string
  }
}

const slides: Array<ISlideProps> = [
  {
    image: '/images/main/carousel/slide.jpg',
    title: (classes) => (
      <Grid
        className={classes.title}
        container
        direction={'column'}
        alignItems={'flex-start'}
        spacing={6}
      >
        <Grid item>FoodMarket на</Grid>
        <Grid item>Android</Grid>
        <Grid item>& IOS</Grid>
      </Grid>
    ),
    subtitle: (classes) => (
      <Grid
        className={classes.subtitle}
        container
        direction={'column'}
        alignItems={'flex-start'}
      >
        <Grid item>Faster shopping with a whole new way</Grid>
        <Grid item>to search and navigate.</Grid>
        <Grid item>Shop your last order again</Grid>
        <Grid item>with just one click.</Grid>
      </Grid>
    ),
    button: {
      text: 'Узнать больше',
      url: '/shop',
    },
  },
  {
    image: '/images/main/carousel/slide-2-1.jpg',
    title: (classes) => (
      <Grid
        className={classes.title}
        container
        direction={'column'}
        alignItems={'flex-start'}
        spacing={6}
      >
        <Grid item>Экономьте</Grid>
        <Grid item>до 30%</Grid>
        <Grid item>c FoodMarket</Grid>
      </Grid>
    ),
    subtitle: (classes) => (
      <Grid
        className={classes.subtitle}
        container
        direction={'column'}
        alignItems={'flex-start'}
      >
        <Grid item>From March 9 to May 31, 2021,</Grid>
        <Grid item>you could win one of the 25 $1,000</Grid>
        <Grid item>FoodMarket gift cards each week.</Grid>
      </Grid>
    ),
    button: {
      text: 'Узнать больше',
      url: '/shop',
    },
  },
]

// interface ICarouselProps {
//   autoplay?: boolean
//   duration?: number
// }

const Carousel: FunctionComponent = () => {
  const classes = useStyles()

  const [idx, setIdx] = useState<number>(0)

  const increase = useCallback(
    async () =>
      await setIdx((prevState) =>
        prevState >= slides.length - 1 ? 0 : (idx + 1) % slides.length
      ),
    [idx, setIdx]
  )

  const decrease = useCallback(
    async () =>
      await setIdx((prevState) =>
        prevState <= 0 ? slides.length - 1 : (idx - 1) % slides.length
      ),
    [idx, setIdx]
  )

  // useEffect(() => {
  //   autoplay && setInterval(async () => await increase(), duration || 5200)
  // }, [autoplay, duration, increase])

  return (
    <div className={classes.root}>
      <div
        className={classes.slide}
        style={{ backgroundImage: `url(${slides[idx]?.image})` }}
      >
        {slides[idx].title(classes)}

        {slides[idx].subtitle(classes)}
        <Button href={slides[idx].button.url} className={classes.button}>
          {slides[idx].button.text}
        </Button>
      </div>
      <ArrowLeft onClick={decrease} className={classes.icon} />
      <ArrowRight onClick={increase} className={classes.icon} />
    </div>
  )
}

export default Carousel
