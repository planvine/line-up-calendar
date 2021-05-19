import React, { useEffect } from 'react'

// Containers
import { EventDetailContainer, EventListContainer } from 'containers'

// Routing
import { Switch, Route } from 'react-router-dom'

// Actions
import { setApiKey } from 'modules/settingsSlice'

// Utils
import { ThemeProvider } from 'styled-components'
import { ScrollToTop } from 'utils'
import { useAppDispatch, useQuery } from 'app/hooks'

// Styles
import { getCustomTheme } from 'themes'

const AppContainer: React.FC = () => {
  const query = useQuery()
  const mainColor = query.get('mainColor')
  const backgroundColor = query.get('backgroundColor')
  const apiKey = query.get('apiKey')

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (apiKey) {
      dispatch(setApiKey(apiKey))
    }
  }, [apiKey, dispatch])

  return (
    <ThemeProvider theme={getCustomTheme(mainColor, backgroundColor)}>
      <ScrollToTop />
      <Switch>
        <Route path={`/event/:eventId/`}>
          <EventDetailContainer />
        </Route>
        <Route path='/'>
          <EventListContainer />
        </Route>
      </Switch>
    </ThemeProvider>
  )
}
export { AppContainer }
