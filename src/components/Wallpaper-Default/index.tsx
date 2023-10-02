import themeApp from '../../assets/image/iphone15.png'
import styles from './wallpaper.module.css'
import { Outlet } from 'react-router-dom'

const Wallpaper = () => {
  return (
    <div className={styles.weather}>
      <Outlet />
      <div className={styles.theme}>
        <img src={themeApp} alt='ThemeApp' />
      </div>
      <div className={styles.menu}></div>
    </div>
  )
}

export default Wallpaper
