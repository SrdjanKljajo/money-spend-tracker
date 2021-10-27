import Chart from '../Chart/Chart'
import moment from 'moment'

interface ChartPropsTypes {
  expenses: { date: string; amount: number }[]
}

const ExpensesChart = (props: ChartPropsTypes): JSX.Element => {
  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ]

  for (const expense of props.expenses) {
    const expenseMonth: any = moment(expense.date).format('M')
    chartDataPoints[expenseMonth - 1].value += expense.amount
  }

  return <Chart dataPoints={chartDataPoints} />
}

export default ExpensesChart
