import React from 'react'
import {RouterProvider} from 'react-router'
import { router} from './App.Routes'
import { AuthProvider } from './feature/auth/auth.context'
import "./feature/shared/global.scss"

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
