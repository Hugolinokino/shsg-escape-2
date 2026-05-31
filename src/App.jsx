import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import DoorPage from './pages/DoorPage.jsx'
import FinalePage from './pages/FinalePage.jsx'
import GMPage from './pages/GMPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tuer/:doorId" element={<DoorPage />} />
        <Route path="/finale" element={<FinalePage />} />
        <Route path="/gm" element={<GMPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
