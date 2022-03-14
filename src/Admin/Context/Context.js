import { createContext, useState } from 'react'
import axios from 'axios'

export const Context = createContext()

function Provider({ children }) {
    const [newMessageCome, setNewMessageCome] = useState(false)
    const fetchData = async (message) => {
        try {
             setNewMessageCome(!newMessageCome)
            
            }
         catch (error) {
            console.log(error)
        }
    }

    const value = {
        newMessageCome,
        fetchData,
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Provider
