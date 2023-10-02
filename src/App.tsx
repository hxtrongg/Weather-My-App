import './assets/style/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Weather from './components/Weather'
import WeatherV1 from './components/WeatherV1'
import WeatherV2 from './components/WeatherV2'
import NoPage from './components/NoPage'
import Layout from './Layouts/layouts'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='Weather' element={<Weather />} />
            <Route path='WeatherV1' element={<WeatherV1 />} />
            <Route path='WeatherV2' element={<WeatherV2 />} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
