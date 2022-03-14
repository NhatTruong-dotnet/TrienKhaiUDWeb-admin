import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

function Modal({ children }) {
    return ReactDOM.createPortal(
        <div className={styles.modal}>{children}</div>,
        modalRoot
    )
}

export default Modal
