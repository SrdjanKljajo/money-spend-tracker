import ExpensePropTypes from '../../types/interfaces'
import ExpenseItem from './ExpenseItem'
import classes from './ExpensesList.module.css'

const ExpensesList = (props: ExpensePropTypes): JSX.Element => {
  if (props.expenses.length === 0) {
    return (
      <h2 className={classes.expensesList__fallback}>Found no expenses.</h2>
    )
  }
  return (
    <ul className={classes.expensesList}>
      {props.expenses.map(expense => (
        <ExpenseItem
          key={expense._id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  )
}

export default ExpensesList
