import { SideBar, Chat } from '@components'
import style from './home.module.scss'

export const HomePage = () => {
  return (
    <div className={style.wrapper}>
      <SideBar />
      <Chat />
    </div>
  )
}
