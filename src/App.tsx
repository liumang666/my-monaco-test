// import { useState } from "react"
// import Home from '@/pages/home'
// import About from '@/pages/about'
import './App.less'
import { RouterProvider } from 'react-router/dom'
import router from '@/routes'

function App() {
  return <RouterProvider router={router} />
}

export default App
