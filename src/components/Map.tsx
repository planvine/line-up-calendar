import React, { useState, useEffect } from 'react'

// Components
import ReactMapGL, { Marker } from 'react-map-gl'
import { Icon } from 'components'

// Utils
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components'

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || ''

interface Props {
  lat: number
  lng: number
}

const IconWrapper = styled.div`
  fill: ${props => props.theme.colors.accentColor};
`
const Map: React.FC<Props> = ({ lat, lng }) => {
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 15,
  })

  useEffect(() => {
    setViewport({
      latitude: lat,
      longitude: lng,
      zoom: 15,
    })
  }, [lat, lng, setViewport])

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      width='100%'
      height='350px'
      scrollZoom={false}
    >
      <Marker latitude={lat} longitude={lng}>
        <IconWrapper>
          <Icon size={'3x'} icon='map-marker-alt' />
        </IconWrapper>
      </Marker>
    </ReactMapGL>
  )
}

export { Map }
