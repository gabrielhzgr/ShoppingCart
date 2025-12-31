import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import ErrorPage from './ErrorPage.jsx'
import Home from './Home/Home.jsx'
import Shop from './Shop/Shop.jsx'
import Cart from './Cart/Cart.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Home />},
      {path: 'home', element: <Home />},
      {path: 'shop', element: <Shop />},
      {path: 'cart', element: <Cart />},
    ],
    errorElement: <ErrorPage />
  }
]

const router = createBrowserRouter(routes)

const queryClient = new QueryClient()

export default routes

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
)



