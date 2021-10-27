import { useState, useRef, MouseEventHandler } from 'react'
import Button from '../../UI/Button'
import ErrorModal from '../../UI/ErrorModal'
import Loader from '../../UI/Loader'
import classes from './ExpenseForm.module.css'

interface FormPropTypes {
  onCancel: MouseEventHandler<HTMLButtonElement>
  onSaveExpenseData(expenseData: object): void
}

const ExpenseForm = (props: FormPropTypes): JSX.Element => {
  //combine useRef() and useState() for values in inputs

  const enteredTitle = useRef<HTMLInputElement>(null)
  const enteredAmount = useRef<HTMLInputElement>(null)
  const enteredDate = useRef<HTMLInputElement>(null)

  // const [userInput, setUserInput] = useState({
  //   title: '',
  //   amount: '',
  //   date: '',
  // })
  //const { title, amount, date } = userInput

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const [message, setMessage] = useState<string>('')

  // Ako state zavisi od prethodnog state, ovo je garantovan način da je u upotrebi poslednji state (funkcija sa prevState)! Ako ne zavisi, može i klasična varijanta
  // const changeHandler = name => e => {
  //   setUserInput(prevState => {
  //     return { ...prevState, [name]: e.target.value }
  //   })
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const title = enteredTitle.current!.value
    const amount = enteredAmount.current!.value
    const date = enteredDate.current!.value
    setLoading(true)
    if (
      title.trim().length === 0 ||
      amount.trim().length === 0 ||
      date.trim().length === 0
    ) {
      return setError({
        title: 'Error',
        message: 'All inputs must be entered',
      })
    }

    if (+amount < 1) {
      return setError({
        title: 'Invalid input',
        message: 'Amount must be a positive number',
      })
    }

    const expenseData = {
      title,
      amount: +amount,
      date: new Date(date),
    }

    setMessage('New expense add')

    setTimeout(() => {
      props.onSaveExpenseData(expenseData)
    }, 3000)
  }

  const errorHandler = () => {
    setError(null)
    setLoading(false)
    setMessage('')
  }

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className={classes.newExpense__controls}>
          <div className={classes.newExpense__control}>
            <label>Title</label>
            <input
              type='text'
              //minLength='2'
              //maxLength='40'
              ref={enteredTitle}
              placeholder='Enter title of expense'
              //value={title}
              //onChange={changeHandler('title')}
            />
          </div>
          <div className={classes.newExpense__control}>
            <label>Amount</label>
            <input
              type='number'
              ref={enteredAmount}
              placeholder='Enter value of expense in €'
              min='1'
              max='1000000'
              //value={amount}
              //onChange={changeHandler('amount')}
            />
          </div>
          <div className={classes.newExpense__control}>
            <label>Date</label>
            <input
              type='date'
              ref={enteredDate}
              min='2020-01-01'
              max='2023-12-31'
              //value={date}
              //onChange={changeHandler('date')}
            />
          </div>
        </div>
        <div className={classes.newExpense__actions}>
          <Button type='button' onClick={props.onCancel}>
            Cancel
          </Button>
          <button type='submit'>Add Expense</button>
        </div>
      </form>
      <h2 className={classes.addExpenseMsg}>{message}</h2>
    </>
  )
}

export default ExpenseForm
