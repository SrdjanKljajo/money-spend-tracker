import classes from './Chart.module.css'
import ChartBar from './ChartBar'

interface ChartPropTypes {
  dataPoints: { label: string; value: number }[]
}

const Chart = (props: ChartPropTypes): JSX.Element => {
  const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value)
  const totalMaximum = Math.max(...dataPointValues)

  return (
    <div className={classes.chart}>
      {props.dataPoints.map(dataPoint => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  )
}

export default Chart
