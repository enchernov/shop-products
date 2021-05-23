import React, { FunctionComponent, useCallback, useState } from 'react'
import { useStyles } from './Carousel.styles'
import { ArrowRight, ArrowLeft } from '@material-ui/icons'
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
    image: '/images/main/carousel/slide-2-1.jpg',
    title: (classes) => (
      <p className={classes.title}>FoodMarket на Android & IOS</p>
    ),
    subtitle: (classes) => (
      <p className={classes.subtitle}>
        Быстрые покупки с совершенно новым поиском и навигацией. Заказывайте еду
        в мобильном приложении FoodMarket
      </p>
    ),
    button: {
      text: 'Загрузить',
      url: '/shop',
    },
  },
  {
    image: '/images/main/carousel/slide.jpg',
    title: (classes) => (
      <p className={classes.title}>Экономьте до 30% c FoodMarket</p>
    ),
    subtitle: (classes) => (
      <p className={classes.subtitle}>
        С 9 марта по 31 мая 2021 года вы можете выиграть одну из 25 подарочных
        карт FoodMarket на 21 000 ₽ каждую неделю
      </p>
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
        style={{
          backgroundImage: `url(${slides[idx]?.image})`,
          backgroundPosition: 'left',
        }}
      >
        <div className={classes.contents}>
          {slides[idx].title(classes)}
          {slides[idx].subtitle(classes)}
          <Button href={slides[idx].button.url} className={classes.button}>
            {slides[idx].button.text}
          </Button>
        </div>
      </div>
      <ArrowLeft onClick={decrease} className={classes.icon} />
      <ArrowRight onClick={increase} className={classes.icon} />
    </div>
  )
}

export default Carousel
