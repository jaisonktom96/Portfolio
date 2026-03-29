import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { LandingPage } from './pages/LandingPage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="work/:slug" element={<CaseStudyPage />} />
      </Route>
    </Routes>
  )
}
