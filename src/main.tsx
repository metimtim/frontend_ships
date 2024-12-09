// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from 'react-redux';
import store from "./redux/store.ts";
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/frontend_ships/serviceWorker.js")
            .then(res => console.log("service worker registered", res))
            .catch(err => console.log("service worker not registered", err))
    })
}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
      <Provider store={store}>
    <App />
      </Provider>
  // {/*</StrictMode>,*/}
)
