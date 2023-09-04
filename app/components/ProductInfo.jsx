"use client"
import { useState, useEffect } from "react"
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

export function ProductInfo({ product }) {
    //  const { decQty, incQty, qty, onAdd, setShowCart, totalPrice } = useStateContext();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const initialRatings = [0, 0, 0, 0, 0];
    const [ratings, setRatings] = useState(initialRatings);



    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    useEffect(() => {
        const savedRatings = localStorage.getItem('userRatings');
        if (savedRatings) {
            setRatings(JSON.parse(savedRatings));
        }
    }, []);



    const handleStarClick = (index) => {
        const newRatings = [...ratings];
        newRatings[index] = newRatings[index] === 0 ? 1 : 0;
        setRatings(newRatings);
        localStorage.setItem('userRatings', JSON.stringify(newRatings));
    };

    function addToCart() {
        const isInCart = !!cartDetails?.[product._id]
        const item = {
            ...product,
            product_data: {
                size: selectedSize,
            },
        }
        isInCart ? incrementItem(item._id) : addItem(item)


    }

    const handleBuyNow = () => {
        window.location.href = '/checkout';

    }


    return (
        <div className="px-4 sm:mt-16 sm:px-0 lg:mt-0 max-w-lg">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Brand:</h1>
                <p className="text-2xl font-bold tracking-tight">{product.brand}</p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

            <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight">
                    ₦{product.price}
                </p>
            </div>


            <div className="mt-7 flex gap-5">
                <p className="flex items-center gap-6 border border-gray-100 w-36 justify-center px-1  ">
                    <span className="text-2xl cursor-pointer">
                        <AiOutlineMinus />
                    </span>
                    <span className="text-2xl">1</span>

                    <span className="text-2xl cursor-pointer">
                        <AiOutlinePlus />
                    </span>
                </p>

                <button
                    // onClick={addToCart}
                    type="button"
                    className=" bg-gray-600 py-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 w-1/2"
                >
                    ADD TO CART
                </button>
            </div>

            <div className="mt-7 flex gap-6">
                <button
                    // onClick={addToCart}
                    type="button"
                    className="w-11/12 bg-gray-600 py-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    BUY NOW
                </button>
            </div>


            <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="text-base">
                    {showFullDescription ? (
                        <div className="flex flex-col">
                            {/* Full description */}
                            <span>{product.description}</span>

                            {/* "Less" button */}
                            <button onClick={toggleDescription} className="text-blue-500 hover:underline cursor-pointer w-8">
                                Less
                            </button>
                        </div>
                    ) : (
                        <div>
                            {product.description.length > 100 ? (
                                <>
                                    <span>
                                        {product.description.slice(0, 100)}...
                                    </span>
                                    {/* "Read More" button */}
                                    <button onClick={toggleDescription} className="text-blue-500 hover:underline">
                                        Read More
                                    </button>
                                </>
                            ) : (
                                product.description
                            )}
                        </div>
                    )}
                </div>
            </div>


            <div className="flex items-center gap-1 mt-4">
                <div>
                    <h1 className="text-2xl font-bold">Rating:</h1>
                </div>
                <div className="flex text-xl items-center pt-2 cursor-pointer">
                    {ratings.map((rating, index) => (
                        <div key={index} onClick={() => handleStarClick(index)}>
                            {rating === 0 ? <AiOutlineStar /> : <AiFillStar className="text-gray-500" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
