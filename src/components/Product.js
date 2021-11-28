import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image"
import { useState } from "react";
import Currency from 'react-currency-formatter';

const MAX_RATING=5;
const MIN_RATING=1;

const Product = ({id,item,description,price,title,category,image}) => {
    const [rating] = useState(Math.floor(Math.random() *(MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    const [hasPrime] = useState(Math.random() < 0.5);

    return (
        <div className="relative bg-white m-4 p-10 flex flex-col z-30">
            <p className="absolute text-xs text-gray-400 top-2 italic right-10">{category}</p>
            <Image
                src={image}
                width={200}
                height={200}
                objectFit="contain"
            />
            <h4 className="my-3 font-extrabold md:text-lg">{title}</h4>
            <div className="flex space-x-1">
            {
                Array(rating).fill().map(()=>(
                    <StarIcon className='h-5 text-yellow-500'/>
                ))
            }
            </div>
            <p className='text-xs my-2 line-clamp-2'>
                {description}
            </p>
            <div className='mb-5'>
            <Currency
                currency="RUB"
                quantity={price}
            />
            </div>
            {hasPrime && 
                <div className="flex items-center space-x-2 -mt-5">
                    <img className='w-12' src='https://links.papareact.com/fdw'/>
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            }
            <button className=' mt-auto button'>Add To Basket</button>
        </div>
    )
}

export default Product
