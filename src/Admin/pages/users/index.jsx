import axios from 'axios'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import styles from './index.module.css'

function Users(props) {
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const res = await axios.get(
                    'https://serverbookstore.herokuapp.com/api/users/allUser'
                )
                setListUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllUser()
    }, [])

    const handleResetPassword = async gmail => {
        try {
            const res = await axios.post(
                `https://serverbookstore.herokuapp.com/api/resetpwd`,
                { gmail }
            )
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.users}>
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
                                    <tr>
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
                                            onClick={() =>
                                                handleResetPassword(gmail)
                                            }
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
