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
import { RxCounter } from './RxCounter'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rxcounter" element={ <RxCounter /> }/>
        <Route path="/pokemon" element={<PokemonS />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
