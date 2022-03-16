import { useState } from 'react'
import styles from './index.module.css'
import { BiBook } from 'react-icons/bi'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { RiUser3Line, RiMessengerLine } from 'react-icons/ri'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const sideBarItems = [
    {
        linkTo: '/bill',
        label: 'Bills',
        IconComponent: FaMoneyBillAlt,
    },
    {
        linkTo: '/users',
        label: 'Users',
        IconComponent: RiUser3Line,
    },
    {
        linkTo: '/book',
        label: 'Books',
        IconComponent: BiBook,
    },
    {
        linkTo: '/messenger',
        label: 'Messengers',
        IconComponent: RiMessengerLine,
    },
]

function Sidebar(props) {
    const [activePage, setActivePage] = useState(localStorage.getItem('active'))

    const navigate = useHistory()
    const handleNavigate = to => {
        navigate.push(to)
    }
    const handleSetActivePage = label => {
        localStorage.setItem('active', label)
        setActivePage(label)
    }
    return (
        <div className={clsx(styles.sideBarContainer, 'shadow')}>
            <div className={styles.logo}>Bostorek</div>
            {sideBarItems.map(({ linkTo, label, IconComponent }) => (
                <SidebarItem
                    key={label}
                    navigate={handleNavigate}
                    linkTo={linkTo}
                    label={label}
                    IconComponent={IconComponent}
                    activePage={activePage}
                    setActivePage={handleSetActivePage}
                />
            ))}
            
        </div>
    )
}

const SidebarItem = ({
    navigate,
    linkTo,
    label,
    IconComponent,
    activePage,
    setActivePage,
}) => {
    return (
        <div
            className={clsx(styles.sidebarItem, {
                [styles.active]: activePage === label,
            })}
            onClick={() => {
                navigate(linkTo)
                setActivePage(label)
            }}
        >
            <IconComponent className={styles.icon} />

            {label}
        </div>
    )
}

export default Sidebar
