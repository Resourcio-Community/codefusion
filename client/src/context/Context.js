import { createContext, useState } from "react"

export const Context = createContext()

export const ContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        contact: '',
        college: ''
    })

    return (
        <Context.Provider value={{ user, setUser, auth, setAuth }}>
            {children}
        </Context.Provider>
    )
}