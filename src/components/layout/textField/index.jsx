import style from './textField.module.scss'

export const TextField = ({ value, onChange, type, name, placeholder, disabled }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      name={name}
      placeholder={`Введите ${placeholder}`}
      className={style.input}
      disabled={disabled}
    />
  )
}
