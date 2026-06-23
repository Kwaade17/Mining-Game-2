import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { playerState } from "./assets/playerState";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App playerState={playerState} />
  </StrictMode>,
)
