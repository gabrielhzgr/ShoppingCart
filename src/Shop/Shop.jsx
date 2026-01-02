
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
            let title = item.title.toLowerCase()
            let category = item.category.toLowerCase()
            let description = item.description.toLowerCase()
            let mySearch = search.toLowerCase()
            return (title.includes(mySearch) || 
            category.includes(mySearch)||
            description.includes(mySearch)) 
        }) 
    }

    function resetFilters(){
        setSearch("")

    }


    return (
        <main>
            
            {loading && <LoadingShop></LoadingShop>}
            {error && 'error'}
            {filteredData &&
            <>
                
                <div className="search">
                    <input 
                    placeholder='🔍 Search items by description or category'
                    name='q'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className="search-items"
                />
                    <button className="reset" onClick={resetFilters}>Clear search</button>

                </div>
                <section className="articles">
                    {filteredData.map(item=><Card key={item.id} item={item}/>)}
                </section>
                </>
            }
        </main>
    )
}