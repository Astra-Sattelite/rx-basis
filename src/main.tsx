import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { PokemonS } from './pokemon/Pokemon'
import { Header } from './Header'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { RxAlarmCloak } from './RxAlarmCloak'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rx_alarm_cloak" element={ <RxAlarmCloak /> }/>
        <Route path="/pokemon" element={<PokemonS />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
