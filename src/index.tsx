// react
import React from 'react'
import ReactDOM from 'react-dom/client'
// router
import { HashRouter, Routes, Route } from 'react-router-dom'
// style
import './style/index.css'
// layout components
import Header from './components/layout/Header'
// components
import Home from './Home'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Header />
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)