
import Card from "./Card"
import {useState } from "react"
import './Shop.css'
import { useQuery } from "@tanstack/react-query"
import LoadingShop from "./LoadingShop"


export default function Shop(){
    const [search, setSearch] = useState('')

    
    const {data, error, isPending:loading} = useQuery({
            queryKey: ['items'],
            queryFn: async () => {
                const response = await fetch('https://fakestoreapi.com/products',{mode:'cors'})

                if(!response.ok){
                    throw new Error('HTTP error: Status ${response.status}')
                }

                return response.json()  
            }
        }
    )
    let filteredData = null
    if(data){
        filteredData = data.filter((item)=>{

            return (item.title.includes(search.toLocaleLowerCase()) || 
            item.category.includes(search))
        })
        
    }

    return (
        <main>
            
            {loading && <LoadingShop></LoadingShop>}
            {error && 'error'}
            {filteredData &&
            <>
                <input 
                    placeholder='🔍 Search items by description, price or category'
                    name='q'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <section className="articles">
                    {filteredData.map(item=><Card key={item.id} item={item}/>)}
                </section>
                </>
            }
        </main>
    )
}