import classes from './Button.module.css'

interface ButtonProps {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void
  type: 'submit' | 'button'
  children: React.ReactNode
}

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <button
      className={classes.button}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
