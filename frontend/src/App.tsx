import { useState, useEffect } from 'react'
import useDarkMode, { DarkModeToggler } from 'use-dark-mode-hook'
import Expenses from './components/Expenses/Expenses'
import NewExpense from './components/Expenses/NewExpense/NewExpense'
import ExpensePropTypes from './types/interfaces'

const App = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode({
    initialValue: false,
    darkModeClass: 'dark',
    lightModeClass: 'light',
    element: 'body',
  })

  const [expenses, setExpenses] = useState<ExpensePropTypes[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(false)

  const fetchExpenses = async (): Promise<void> => {
    setLoading(true)
    setError(false)
    try {
      const response = await fetch(
        //'https://exs-tracker.herokuapp.com/api/v1/expense'
        'http://localhost:5000/api/v1/expense'
      )

      if (!response.ok) {
        throw new Error('Request failed. Url not found!')
      }

      const data: ExpensePropTypes[] = await response.json()

      setExpenses(data)
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const addExpenseHandler = (expense: ExpensePropTypes) => {
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses]
    })
  }

  return (
    <>
      <DarkModeToggler
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        buttonClassName='some-classes'
      />
      <NewExpense onAddExpense={addExpenseHandler} />
      {!error ? (
        <Expenses expenses={expenses} loading={loading} />
      ) : (
        <h3 className='errMsg'>{error}</h3>
      )}
    </>
  )
}

export default App
