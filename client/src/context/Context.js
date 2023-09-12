import { createContext, useState } from "react"

export const Context = createContext()

export const ContextProvider = ({ children }) => {
    const [txnId, setTxnId] = useState(null)
    const [user, setUser] = useState({
        name: '',
        email: '',
        contact: '',
        college: ''
    })

    return (
        <Context.Provider value={{ txnId, setTxnId, user, setUser }}>
            {children}
        </Context.Provider>
    )
}