import classes from './Card.module.css'

interface CardPropsType {
  children: React.ReactNode
  className: string
}

const Card = (props: CardPropsType): JSX.Element => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  )
}

export default Card
