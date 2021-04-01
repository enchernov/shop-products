import React, { FunctionComponent } from 'react'
import {
  YMaps,
  Map as YandexMap,
  ZoomControl,
  RouteButton,
  Placemark,
} from 'react-yandex-maps'
import { useStyles } from './Map.styles'

const Map: FunctionComponent = () => {
  const classes = useStyles()
  return (
    <YMaps>
      <div>
        <YandexMap
          defaultState={{ center: [53.36536, 83.683306], zoom: 16 }}
          className={classes.root}
        >
          <ZoomControl options={{ float: 'right' }} />
          <RouteButton options={{ float: 'right' }} />
          <Placemark geometry={[53.36536, 83.683306]} />
        </YandexMap>
      </div>
    </YMaps>
  )
}

export default Map
