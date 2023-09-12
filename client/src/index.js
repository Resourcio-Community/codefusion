import { createRoot } from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ContextProvider } from "./context/Context"

const root = createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
)
