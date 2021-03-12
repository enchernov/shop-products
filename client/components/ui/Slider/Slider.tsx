import React, { FunctionComponent } from 'react'
import { Slider as MuiSlider, SliderProps } from '@material-ui/core'
import clsx from 'clsx'

import { useStyles } from './Slider.styles'

const defaultProps: Partial<SliderProps> = {
  min: 0,
  max: 1000,
}

type DefaultProps = Readonly<typeof defaultProps>

type SliderPropsType = DefaultProps

const Slider: FunctionComponent<SliderPropsType> = ({ min, max, ...props }) => {
  const classes = useStyles()

  return (
    <MuiSlider
      className={clsx(classes.slider, props?.className)}
      classes={{
        valueLabel: classes.label,
      }}
      min={min}
      max={max}
      {...props}
    />
  )
}

Slider.defaultProps = defaultProps

export default Slider
