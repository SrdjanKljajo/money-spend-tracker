import ReactDOM from 'react-dom'
import Button from './Button'
import Card from './Card'
import classes from './ErrorModal.module.css'

interface ErrorModalPropsType {
  onConfirm(e: React.MouseEvent<HTMLButtonElement>): void
  title: string
  message: string
}

interface BackdropPropsType {
  onConfirm(e: React.MouseEvent<HTMLElement>): void
}

const Backdrop = (props: BackdropPropsType): JSX.Element => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = (props: ErrorModalPropsType): JSX.Element => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button type='button' onClick={props.onConfirm}>
          Ok
        </Button>
      </footer>
    </Card>
  )
}

const ErrorModal = (props: ErrorModalPropsType): JSX.Element => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </>
  )
}

export default ErrorModal
