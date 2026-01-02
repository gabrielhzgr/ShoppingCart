import { vi, describe, it, expect, beforeEach } from 'vitest'
import { findByText, queryByText, render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider} from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from "@testing-library/user-event";
import App from './App.jsx';
import Home from './Home/Home.jsx';
import Shop from './Shop/Shop.jsx';
import Cart from './Cart/Cart.jsx';
import ErrorPage from './ErrorPage.jsx';
import { input } from '@testing-library/user-event/dist/cjs/event/input.js';


let queryClient
const mockedItems = [
        {"id": 0,
        "title": "Article 1",
        "price": 10,
        "description": "string",
        "category": "jewelry",
        "image": "http://example.com"
        },
        {
        "id": 1,
        "title": "Article 2",
        "price": 20,
        "description": "string",
        "category": "clothing",
        "image": "http://example.com"
        }
]
beforeEach(()=>{
    queryClient = new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false
                    }
                }
        })
})



window.fetch = vi.fn(()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(new Response(JSON.stringify(mockedItems),{status:200}))
        },50)
    })
})

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
        

    it('Renders app initially at home', () => {
        const queryClient = new QueryClient()
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
        const queryClient = new QueryClient()
        render(
        <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        );

        const user = userEvent.setup()

        const shopLink = screen.getByText(/Shop/)
        await user.click(shopLink)
        expect(screen.getByRole('navigation')).toBeInTheDocument()
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

        
        
        
        it('Shows loading page',async ()=>{
            render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
            );
        
        const user = userEvent.setup()
        
        const shopLink = screen.getByText(/Shop/)
        await user.click(shopLink)
        const loadingShop = await screen.findByTestId('loading-shop')
        expect(loadingShop).toBeInTheDocument()
        //screen.debug()
        })

        it('Shows shop page with items',async()=>{

            render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
            );

            const user = userEvent.setup()
            const shopLink = screen.getByText(/Shop/)
            await user.click(shopLink)
            const article1 = await screen.findByText('Article 1')
            expect(article1).toBeInTheDocument()
        })

        it('Stops you from adding an item with 0 selected',async ()=>{
            render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
            );

            const user = userEvent.setup()
            const shopLink = screen.getByText(/Shop/)
            await user.click(shopLink)
            const article1 = await screen.findByRole('article',{name:'Article 1'})
            expect(article1).toBeInTheDocument()
            const button = within(article1).getByText(/Add to cart/i)
            await user.click(button)
            const cartLink = screen.getByText(/Cart/)
            await user.click(cartLink)
            expect(screen.getByText(/No items added yet/)).toBeInTheDocument()
        })

        it('Allows you to type only valid number of items',async ()=>{
            render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
            );

            const user = userEvent.setup()
            const shopLink = screen.getByText(/Shop/)
            await user.click(shopLink)

            const article1 = await screen.findByRole('article',{name:'Article 1'})
            expect(article1).toBeInTheDocument()
            const input = within(article1).getByRole('textbox')
            await user.type(input,'10.5')
            expect(input.value).toBe('105')
            await user.clear(input)
            expect(input.value).toBe('0')
            await user.type(input,'-10.4')
            expect(input.value).toBe('104')
            await user.clear(input)
            await user.type(input,'abc')
            expect(input.value).toBe('0')
        })

        it("Changes quantity of items' inputs", async ()=>{
            render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
            );

            const user = userEvent.setup()
            const shopLink = screen.getByText(/Shop/)
            await user.click(shopLink)
            
            const article1 = await screen.findByRole('article',{name:'Article 1'})
            const input = within(article1).getByRole('textbox')
            const lessArticle1 = within(article1).getByText('-')
            const moreArticle1 = within(article1).getByText('+')
            await user.type(input,'50')
            await user.click(lessArticle1)
            await user.click(lessArticle1)
            expect(input.value).toBe('48')
            await user.click(moreArticle1)
            await user.click(moreArticle1)
            await user.click(moreArticle1)
            expect(input.value).toBe('51')
            
            


        })

        it('Filter items by title or category',async ()=>{
            render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
            );

            const user = userEvent.setup()
            const shopLink = screen.getByText(/Shop/)
            await user.click(shopLink)

            const article1 = await screen.findByText('Article 1')
            expect(article1).toBeInTheDocument()
            const input = screen.getByPlaceholderText(/Search items by/)
            await user.type(input,'jewelry') 
            expect(screen.queryByText('Article 2')).not.toBeInTheDocument()

            await user.clear(input)
            await user.type(input, 'clothing')
            expect(screen.queryByText('Article 1')).not.toBeInTheDocument()
            expect(screen.getByText('Article 2')).toBeInTheDocument()

            await user.clear(input)
            await user.type(input, 'Article 1')
            expect(screen.getByText('Article 1')).toBeInTheDocument()
            expect(screen.queryByText('Article 2')).not.toBeInTheDocument()

            //screen.debug()    
        })
        
        it('Adds items to Cart', async ()=>{
            render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
            )

            const user = userEvent.setup()
            const shopLink = screen.getByText(/Shop/)
            await user.click(shopLink)

            const article1 = await screen.findByRole('article',{name:'Article 1'})
            expect(article1).toBeInTheDocument()
            const input = within(article1).getByRole('textbox')
            const addToCart1 = within(article1).getByText(/Add to cart/i)
            await user.type(input,'100')
            await user.click(addToCart1)

            const article2 = await screen.findByRole('article',{name:'Article 2'})
            expect(article2).toBeInTheDocument()
            const input2 = within(article2).getByRole('textbox')
            const addToCart2 = within(article2).getByText(/Add to cart/i)
            await user.type(input2,'200')
            await user.click(addToCart2)
            expect(screen.getByRole('link',{name: /Cart\(2\)/})).toBeInTheDocument()
            
            const cartLink = screen.getByText(/Cart/)
            await user.click(cartLink)

            expect(screen.getByRole('heading',{name: 'Selected: 100'})).toBeInTheDocument()
            expect(screen.getByRole('heading',{name: 'Price each: $10.00'})).toBeInTheDocument()
            expect(screen.getByRole('heading',{name: 'Total: $1000.00'})).toBeInTheDocument()

            expect(screen.getByRole('heading',{name: 'Selected: 200'})).toBeInTheDocument()
            expect(screen.getByRole('heading',{name: 'Price each: $20.00'})).toBeInTheDocument()
            expect(screen.getByRole('heading',{name: 'Total: $4000.00'})).toBeInTheDocument()

            
            const cartArt1 = screen.getByRole('article',{name:'Article 1'})
            await user.click(within(cartArt1).getByText('add'))
            expect(screen.getByRole('heading',{name: 'Selected: 101'})).toBeInTheDocument()
            expect(screen.getByRole('heading',{name: 'Price each: $10.00'})).toBeInTheDocument()
            expect(screen.getByRole('heading',{name: 'Total: $1010.00'})).toBeInTheDocument()

            const cartArt2 = screen.getByRole('article',{name:'Article 2'})
            await user.click(within(cartArt2).getByText('remove'))
            expect(screen.getByRole('heading',{name: 'Selected: 199'})).toBeInTheDocument()
            expect(screen.getByRole('heading',{name: 'Price each: $20.00'})).toBeInTheDocument()
            expect(screen.getByRole('heading',{name: 'Total: $3980.00'})).toBeInTheDocument()
        })

        
        
    })

})