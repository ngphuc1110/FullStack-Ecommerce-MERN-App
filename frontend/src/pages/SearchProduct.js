import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalProductSearch from '../components/VerticalProductSearch'


const SearchProduct = () => {
    const navigate = useNavigate()
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("query:", query?.search)
    if (!query?.search) {
        navigate("/category-product")
    }

    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url + query?.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)
    }

    useEffect(() => {
        fetchProduct()
    }, [query])
    return (
        <div className='mx-auto container p-4 min-h-[583px]'>
            {
                loading && (
                    <p className='text-center text-lg '>Loading ...</p>
                )
            }
            <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p>

            {
                data.length === 0 && !loading && (
                    <p className='bg-white text-lg text-center p-4 '>No Product Match!</p>
                )
            }

            {
                data.length !== 0 && !loading && (
                    <VerticalProductSearch loading={loading} data={data} />
                )
            }
        </div>
    )
}

export default SearchProduct