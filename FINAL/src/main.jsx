import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { PodcastProvider } from './context/PodcastContext'
import './index.css'
import App from './App.jsx'

// Entry point for the React app. Sets up global providers and routing.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
      BrowserRouter enables client-side routing for the app.
      PodcastProvider supplies podcast data and state via React Context.
      ErrorBoundary catches and displays errors in the component tree.
      App contains the main routing logic, including:
        - The home route ('/') for the podcast list and controls
        - The podcast detail route ('/podcast/:id/:slug') for individual podcast details
        - PodcastDetail is loaded lazily for performance, and fetches podcast info based on the route params
    */}
    <BrowserRouter>
      <PodcastProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </PodcastProvider>
    </BrowserRouter>
  </StrictMode>,
)
