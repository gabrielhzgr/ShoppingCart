import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Cart from './Components/Cart.jsx'
import Home from './Components/Home.jsx'
import Shop from './Components/Shop.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, path: 'home', element: <Home />},
      {path: 'shop', element: <Shop />},
      {path: 'cart', element: <Cart />}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
