import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './App'
import { ClerkProvider } from '@clerk/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl='/'
    >
      <Root />
    </ClerkProvider>
  </StrictMode>,
)
