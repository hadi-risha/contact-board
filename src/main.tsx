import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ContactsProvider } from './state/ContactsContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContactsProvider>
      <App />
    </ContactsProvider>
  </StrictMode>,
)
