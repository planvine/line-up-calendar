import React from 'react'

// Containers
import { AppContainer } from 'containers'

// Routing
import { BrowserRouter as Router } from 'react-router-dom'

// Utils
import { IntlProvider } from 'react-intl'

// Styles
import './index.css'

const App: React.FC = () => {
  return (
    <IntlProvider locale='en-GB'>
      <Router>
        <AppContainer />
      </Router>
    </IntlProvider>
  )
}

export default App
