import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { HashRouter } from "react-router"
import { App } from "./app/App"
import { store } from "./app/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
)
