import iconApp from '../../assets/image/icon-weather.png'
import Wallpaper from '../Wallpaper-Default'
import styles from './weather.module.css'
import { Link } from 'react-router-dom'

const Weather = () => {
  return (
    <>
      <Wallpaper />
      <div className={styles.icon}>
        <Link to='/weatherv1'>
          <img src={iconApp} alt='Weather' />
          <h3>Thời tiết</h3>
        </Link>
      </div>
    </>
  )
}

export default Weather
