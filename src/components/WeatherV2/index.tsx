import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Wallpaper from '../Wallpaper-Default'
import styles from './weatherV2.module.css'

interface Day {
  date: string
  day: {
    mintemp_c: number
    maxtemp_c: number
    condition: {
      text: string
      icon: string
    }
  }
}

const WeatherV2 = () => {
  const [weatherData, setWeatherData] = useState<Day[]>([])
  const [cityName, setCityName] = useState<string>('Đà Nẵng') // Mặc định là Đà Nẵng

  useEffect(() => {
    axios
      .get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: 'c9a0ca46550648b29ce125849232709',
          q: cityName, // Sử dụng cityName thay vì cố định 'Danang'
          days: 6,
          aqi: 'no',
          alerts: 'no',
          lang: 'vi'
        }
      })
      .then((response) => {
        const data = response.data.forecast.forecastday.slice(1, 6)
        setWeatherData(data)
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu thời tiết:', error)
      })
  }, [cityName])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value)
  }

  return (
    <div>
      <Wallpaper />
      <div className={styles.weatherV2}>
        <p>
          <Link to='/weatherv1'>
            <FiArrowLeft />
          </Link>
        </p>
        <h1>Dự báo 5 ngày</h1>
        <input
          type='text'
          placeholder='Nhập tên thành phố và nhấn enter'
          value={cityName}
          onChange={handleInputChange}
        />

        <div className={styles.content}>
          <ul>
            {weatherData.map((day, index) => (
              <li key={index}>
                <div className={styles.item_left}>
                  <h2>Thứ {index + 2}</h2>
                  <p>{day.date}</p>
                  <p>{day.day.condition.text}</p>
                </div>
                <div className={styles.item_right}>
                  <img src={day.day.condition.icon} alt='Thời tiết' />
                  <p>
                    {/* Min: {day.day.mintemp_c} °C Max: */}
                    {day.day.maxtemp_c} °C
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.menu}></div>
        </div>
      </div>
    </div>
  )
}

export default WeatherV2
