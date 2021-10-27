import classes from './Loader.module.css'

const Loader = (): JSX.Element => {
  return (
    <div className={classes.blocks}>
      <div className={`${classes.block} ${classes.orange}`}></div>
      <div className={`${classes.block} ${classes.blue}`}></div>
    </div>
  )
}

export default Loader
