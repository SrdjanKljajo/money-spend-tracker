import classes from './ExpensesFilter.module.css'

interface FilterPropsTypes {
  selected: string
  onChangeFilter(e: string): void
}

const ExpensesFilter = (props: FilterPropsTypes) => {
  const dropdownChangeHandler = (e: { target: { value: string } }) => {
    props.onChangeFilter(e.target.value)
  }

  return (
    <div className={classes.expensesFilter}>
      <div className={classes.expensesFilter__control}>
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='2023'>2023</option>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
        </select>
      </div>
    </div>
  )
}

export default ExpensesFilter
