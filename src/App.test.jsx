import { vi, describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider} from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from "@testing-library/user-event";
import App from './App.jsx';
import Home from './Home/Home.jsx';
import Shop from './Shop/Shop.jsx';
import Cart from './Cart/Cart.jsx';
import ErrorPage from './ErrorPage.jsx';

//TODO: Mock fetch function window. fetch = vi.fn()
//to test adding Shop articles to Cart

describe('Test app',()=>{
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
        let router = createMemoryRouter(routes)
        const queryClient = new QueryClient()

    it('Renders app initially at home', () => {
        render(
        <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getByTestId('photo')).toBeInTheDocument()

        expect(screen.getByText('Welcome to myshop!')).toBeInTheDocument()
        expect(screen.getByText('More')).toBeInTheDocument()
        expect(screen.getByTestId('slider')).toBeInTheDocument()
        
    });

    it('Changes routes correctly',async ()=>{
        render(
        <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        );

        const user = userEvent.setup()

        const shopLink = screen.getByText(/Shop/)
        await user.click(shopLink)
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument()
        const loadingShop = screen.getByTestId('loading-shop')
        expect(loadingShop).toBeInTheDocument()
        //screen.debug()

        const cartLink = screen.getByText(/Cart/)
        await user.click(cartLink)
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getByText('No items added yet')).toBeInTheDocument()
        //screen.debug()
        
        const homeLink = screen.getByText(/Home/)
        await user.click(homeLink)
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getByText('Welcome to myshop!')).toBeInTheDocument()
        //screen.debug()
    })

    describe('Shop page',()=>{
        it('Shows loading page',()=>{
            render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
                </QueryClientProvider>
            );

        const user = userEvent.setup()
        })
        
        
    })

})