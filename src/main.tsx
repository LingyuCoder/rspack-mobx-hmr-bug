import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { observer } from "mobx-react";

const NewApp = observer(App);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NewApp />
  </React.StrictMode>,
)
