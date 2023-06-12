import style from './styledButton.module.scss'

export const StyledButton = ({ disabled, onClick, children }) => {
  return (
    <button
      className={disabled ? style.btn__disabled : style.btn}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
