import classes from './ChartBar.module.css'

interface ChartPropTypes {
  maxValue: number
  value: number
  label: string
}

const ChartBar = (props: ChartPropTypes): JSX.Element => {
  let barFillHeight = '0%'

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%'
  }

  return (
    <div className={classes.chartBar}>
      <div className={classes.chartBar__inner}>
        <div
          className={classes.chartBar__fill}
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className={classes.chartBar__label}>{props.label}</div>
    </div>
  )
}

export default ChartBar
