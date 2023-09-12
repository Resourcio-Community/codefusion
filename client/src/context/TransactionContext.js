import { createContext, useState } from "react"

export const TransactionContext = createContext()

export const TransactionContextProvider = ({ children }) => {
    const [txnId, setTxnId] = useState(null)

    return (
        <TransactionContext.Provider value={{ txnId, setTxnId }}>
            {children}
        </TransactionContext.Provider>
    )
}