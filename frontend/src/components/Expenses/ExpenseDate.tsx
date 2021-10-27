import classes from './ExpenseDate.module.css'
import moment from 'moment'

interface DatePropTypes {
  date: string
}

const ExpenseDate = (props: DatePropTypes): JSX.Element => {
  const month = moment(props.date).format('MMMM')
  const day = moment(props.date).format('Do')
  const year = moment(props.date).format('YYYY')
  return (
    <div className={classes.expenseDate}>
      <div className={classes.expenseDate__month}>{month}</div>
      <div className={classes.expenseDate__year}>{year}</div>
      <div className={classes.expenseDate__day}>{day}</div>
    </div>
  )
}

export default ExpenseDate
