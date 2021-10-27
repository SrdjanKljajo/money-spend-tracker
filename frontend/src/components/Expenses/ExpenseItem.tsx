import React, { useState } from 'react'
import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'
import classes from './ExpenseItem.module.css'
import ErrorModal from '../UI/ErrorModal'
import Loader from '../UI/Loader'

interface ItemPropTypes {
  title: string
  date: string
  amount: number
}

const ExpenseItem = (props: ItemPropTypes): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    return setError({
      title: 'Error',
      message: 'You are not authorized for this action',
    })
  }

  const errorHandler: () => void = () => {
    setError(false)
    setLoading(false)
  }

  return (
    <li>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {loading && <Loader />}
      <Card className={classes.expenseItem}>
        <ExpenseDate date={props.date} />
        <div className={classes.expenseItem__description}>
          <h2>{props.title}</h2>
          <div>
            <div className={classes.delEditIcons}>
              <span
                className={classes.delIcon}
                title='delete expense'
                onClick={handleClick}
              >
                <a href='#0'>
                  <i className='fas fa-trash'></i>
                </a>
              </span>
              <span
                className={classes.editIcon}
                title='edit expense'
                onClick={handleClick}
              >
                <a href='#0'>
                  <i className='fas fa-edit'></i>
                </a>
              </span>
            </div>
            <div className={classes.expenseItem__price}>€ {props.amount}</div>
          </div>
        </div>
      </Card>
    </li>
  )
}

export default ExpenseItem
