import { memo, useEffect, useRef } from 'react'
import style from './chatMessages.module.scss'

export const ChatMessages = memo(({ messages }) => {
  const bottomEl = useRef(null)

  const scrollToBottom = () => bottomEl.current.scrollIntoView()

  useEffect(() => scrollToBottom(), [messages])

  return (
    <div className={style.chat}>
      <div className={style.chat__box}>
        {messages?.map(m => (
          <div
            key={m.idMessage}
            className={m.incoming ? style.left : style.right}
          >
            <div className={m.incoming ? style.left__item : style.right__item}>
              <span>{m.textMessage}</span>
            </div>
          </div>
        ))}
        <div ref={bottomEl}></div>
      </div>
    </div>
  )
})
