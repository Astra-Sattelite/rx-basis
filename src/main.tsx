import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Pokemon } from './Pokemon'
import { Header } from './Header'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
