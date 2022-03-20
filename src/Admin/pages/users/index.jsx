import axios from 'axios'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import DynamicModal from '../../../Common/DynamicModal/DynamicModal'
import emitMessage from '../../../Common/ToastMessage/ToastMessage'

function Users(props) {
    const [listUser, setListUser] = useState([])
    const [showLoadingModal, setShowLoadingModal] = useState(false)
    const [deleteGmail, setDeleteGmail] = useState(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const getAllUser = async () => {
        try {
            setShowLoadingModal(true)
            const res = await axios.get(
                'https://serverbookstore.herokuapp.com/api/users/allUser'
            )
            setListUser(res.data)
            setShowLoadingModal(false)
        } catch (error) {
            console.log(error)
            setShowLoadingModal(false)
            emitMessage('error', error)
        }
    }
    useEffect(() => {
        getAllUser()
    }, [])

    const handleResetPassword = async gmail => {
        try {
            const res = await axios.post(
                `https://serverbookstore.herokuapp.com/api/resetpwd`,
                { gmail }
            )
            emitMessage('success', res.data.message)
        } catch (error) {
            console.log(error)
            emitMessage('error', error)
        }
    }

    const handleOnCloseConfirmDialog = async isAccept => {
        if (isAccept) {
            try {
                await handleResetPassword(deleteGmail)
            } catch (error) {
                emitMessage('error', error)
            }
        }
        setShowConfirmDialog(false)
        setDeleteGmail(null)
    }
    return (
        <div className={styles.users}>
            <DynamicModal showModal={showLoadingModal} loading />
            <DynamicModal
                showModal={showConfirmDialog}
                confirmDialogConfig={{
                    title: 'Reset Password',
                    content: ` Mật khẩu mới sẽ được gửi đến gmail: ${deleteGmail} `,
                    acceptText: 'Đồng ý',
                    cancelText: 'Hủy',
                    onDone: handleOnCloseConfirmDialog,
                }}
            />
            <header className={styles.header}>Users</header>
            <div className='card' style={{ color: ' #566a7f', marginTop: 30 }}>
                <h5 className='card-header'>User Table</h5>
                <div className='table-responsive text-nowrap'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Gmail</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Member</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='table-border-bottom-0'>
                            {listUser.map(
                                ({ gmail, username, phone, isVipMember }) => (
                                    <tr key={gmail}>
                                        <td>
                                            <i className='fab fa-angular fa-lg text-danger me-3'></i>
                                            <strong>{gmail}</strong>
                                        </td>
                                        <td>{username}</td>
                                        <td>{phone}</td>
                                        <td>
                                            <div
                                                className={clsx(styles.badge, {
                                                    [styles.vipMember]:
                                                        isVipMember,
                                                })}
                                            >
                                                {isVipMember ? 'Vip' : 'Normal'}
                                            </div>
                                        </td>
                                        <td
                                            className={styles.link}
                                            onClick={() => {
                                                setShowConfirmDialog(true)
                                                setDeleteGmail(gmail)
                                            }}
                                        >
                                            Reset password
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users
