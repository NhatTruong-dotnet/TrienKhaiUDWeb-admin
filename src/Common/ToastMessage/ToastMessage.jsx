import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const emitMessage = (type = 'success', message = 'default') => {
    toast[type](message)
}

function ToastMessage() {
    return (
        <ToastContainer
            style={{ zIndex: 9999999999999999999999999999999999999999999 }}
            position='bottom-left'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    )
}

export default ToastMessage
