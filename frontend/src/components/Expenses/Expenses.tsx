import { useState } from 'react'
import classes from './Expenses.module.css'
import Card from '../UI/Card'
import ExpensesList from './ExpensesList'
import Loader from '../UI/Loader'
import ExpensesChart from './ExpensesChart'
import ExpensesFilter from './ExpensesFilter'
import moment from 'moment'

interface ExpensePropTypes {
  expenses: any[]
  loading: boolean
}

const Expenses = (props: ExpensePropTypes): JSX.Element => {
  const [filteredYear, setFilteredYear] = useState<string>('2021')

  const filterChangeHandler = (selectedYear: string) => {
    setFilteredYear(selectedYear)
  }

  const filteredExpenses = props.expenses.filter(expense => {
    return moment(expense.date).format('YYYY') === filteredYear
  })

  if (props.loading) {
    return <Loader />
  }

  return (
    <Card className={classes.expenses}>
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList expenses={filteredExpenses} />
    </Card>
  )
}

export default Expenses
