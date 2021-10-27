import { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import classes from './NewExpense.module.css'

interface NewExpensePropTypes {
  onAddExpense(expenseData: object): void
}

const NewExpense = (props: NewExpensePropTypes): JSX.Element => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const saveExpenseDataHandler = (enteredExpenseData: object) => {
    const expenseData = {
      ...enteredExpenseData,
    }
    props.onAddExpense(expenseData)
    setIsEditing(false)
  }

  const startEditingHandler = () => {
    setIsEditing(true)
  }

  const stopEditingHandler = () => {
    setIsEditing(false)
  }

  return (
    <div className={classes.newExpense}>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  )
}

export default NewExpense
