import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Wallpaper from '../Wallpaper-Default'
import styles from './weatherV1.module.css'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

interface CurrentWeather {
  temp_c: number
  condition: {
    text: string
    icon: string
  }
}

interface HourlyWeather {
  time_epoch: number
  temp_c: number
  date: number
  condition: {
    text: string
    icon: string
  }
}

const WeatherV1: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null)
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[] | null>(null)

  useEffect(() => {
    axios
      .get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: 'c9a0ca46550648b29ce125849232709',
          q: 'Danang',
          aqi: 'no',
          lang: 'vi'
        }
      })
      .then((response) => {
        const data = response.data
        setCurrentWeather(data.current)
      })
      .catch((error) => {
        console.error('Lỗi khi tìm nạp data', error)
      })

    axios
      .get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: 'c9a0ca46550648b29ce125849232709',
          q: 'Danang',
          days: 1,
          aqi: 'no',
          alerts: 'no',
          lang: 'vi'
        }
      })
      .then((response) => {
        const data = response.data
        setHourlyWeather(data.forecast.forecastday[0].hour)
      })
      .catch((error) => {
        console.error('Lỗi khi tìm nạp data:', error)
      })
  }, [])

  return (
    <div>
      <Wallpaper />
      <div className={styles.weatherV1}>
        <p>
          <Link to='/weather'>
            {' '}
            <FiArrowLeft />
          </Link>
        </p>

        <h1>Đà Nẵng</h1>
        {currentWeather && (
          <div className={styles.v1_desciption}>
            <img src={currentWeather.condition.icon} alt='Thời tiết' />
            <h3>{currentWeather.temp_c} °C</h3>
            <p>{currentWeather.condition.text}</p>
          </div>
        )}

        {hourlyWeather && (
          <div className={styles.Daily}>
            <h2>
              Today <p>{new Date(hourlyWeather[0].time_epoch * 1000).toLocaleDateString()}</p>
            </h2>

            <div className={styles.hr}></div>

            {hourlyWeather.length > 0 ? (
              <Slider
                slidesToShow={4}
                slidesToScroll={4}
                infinite={true}
                autoplay={false}
                autoplaySpeed={5000}
                className={styles.slider}
                arrows={false}
              >
                {hourlyWeather.map((hour) => (
                  <div className={styles.slide} key={hour.time_epoch}>
                    {new Date(hour.time_epoch * 1000).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                    <img src={hour.condition.icon} alt='Thời tiết' />
                    <p>{hour.temp_c} °C</p>
                  </div>
                ))}
              </Slider>
            ) : (
              <p>Không có dữ liệu thời tiết</p>
            )}
            <button>
              <Link to='/weatherv2'> Dự báo thời tiết 5 ngày</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherV1
