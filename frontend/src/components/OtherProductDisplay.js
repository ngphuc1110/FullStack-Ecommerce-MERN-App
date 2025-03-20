import React, { useContext, useEffect, useState } from 'react'
import fetchBrandWiseProduct from '../helper/fetchBrandWiseProduct'
import currencyFormat from '../helper/currencyFormat'
import { Link, useNavigate } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../context';
import scrollTop from '../helper/scrollTop';
import SummaryApi from '../common';
import ProductScorer from './ProductScorer';
import { FaStar } from 'react-icons/fa';

const OtherProductDisplay = ({ heading, productId }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const navigate = useNavigate()

    const { fetchUserAddToCart } = useContext(Context)
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                brandName: "",
                chipSet: "",
                gpu: "",
                ram: "",
                storage: "",
                screen: "",
                os: "",
                weight: "",
                battery: ""
            })
        })

        const dataResponse = await response.json()

        const productsWithScores = dataResponse?.data.map((product) => {
            const score = ProductScorer(product);
            return {
                ...product,
                score: score,
            };
        });

        const targetProduct = productsWithScores.find(product => product._id === productId);
        if (targetProduct) {
            const targetScore = targetProduct.score;

            // const filteredProducts = productsWithScores.filter(product =>
            //     product.score >= targetScore - 1 && product.score <= targetScore + 1 && product._id !== productId
            // );

            const filteredProducts = productsWithScores
                .filter(product =>
                    product.score >= targetScore - 1 &&
                    product.score <= targetScore + 1 &&
                    product._id !== productId
                )
                .map(product => ({
                    ...product,
                    scoreDifference: roundTo(product.score - targetScore),
                }));

            setLoading(false)
            setData(filteredProducts)
        }
    }

    const roundTo = (num) => {
        const factor = Math.pow(10, 2);
        return Math.round(num * factor) / factor;
    };

    useEffect(() => {
        fetchData()
    }, [productId])



    return (
        <div className='container mx-auto px-6 my-4 relative'>
            <h2 className='text-2xl font-semibold py-2 '>{heading}</h2>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(270px,330px))] justify-center md:gap-6 overflow-x-scroll scrollbar-none transition-all gap-4' >


                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[320px] md:min-w-[350px] max-w-[320px] md:max-w-[350px] bg-white rounded-sm shadow '>
                                    <div className='bg-slate-200 h-60 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse'>

                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-semibold text-sm md:text-sm text-ellipsis line-clamp-1 text-black text-center bg-slate-200 animate-pulse p-1'>{product?.productName}</h2>
                                        <div className='flex justify-between mx-5'>
                                            <div className='py-2'>
                                                <p className='text-slate-400 line-through p-1 bg-slate-200 w-24 rounded-full animate-pulse'></p>
                                                <p className='text-slate-400 line-through p-1 bg-white w-10 rounded-full'></p>
                                                <p className='text-blue-700 font-medium p-1 bg-slate-200 w-24 rounded-full animate-pulse'></p>
                                            </div>
                                            <button className=' text-white rounded-full px-5 text-sm py-1 bg-slate-200 w-24 animate-pulse'></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <div className='w-full min-w-[320px] md:min-w-[350px] max-w-[320px] md:max-w-[350px] bg-white rounded-sm shadow ' onClick={scrollTop}>
                                    <Link to={"/product/" + product?._id} className='bg-slate-200 h-60 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full mix-blend-multiply hover:scale-105 transition-all' />
                                    </Link>
                                    <div className='p-4 grid gap-3'>
                                        <Link to={"/product/" + product?._id} className='font-semibold text-sm md:text-sm text-ellipsis line-clamp-2 text-black text-center min-h-10'>{product?.productName}</Link>
                                        <div className='ml-auto rounded-full text-sm bg-red-500 p-2 mr-2 text-white flex justify-center items-center gap-1'>
                                            <p >{product?.scoreDifference} </p>
                                            <FaStar />
                                        </div>
                                        <div className='flex justify-between mx-5'>
                                            <div className='py-2'>
                                                <p className='text-slate-400 line-through'>{currencyFormat(product?.price)}</p>
                                                <p className='text-blue-700 font-medium'>{currencyFormat(product?.sellingPrice)}</p>
                                            </div>
                                            <button className='bg-red-500 hover:bg-red-700 text-white rounded-full px-5 text-sm py-1 ' onClick={(e) => handleAddToCart(e, product?._id)}>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )

                }
            </div>

        </div>
    )
}

export default OtherProductDisplay