import { StarIcon } from "@heroicons/react/solid";
import Currency from 'react-currency-formatter';
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({id,item,description,price,title,category,image,hasPrime,rating}) => {
    const dispatch = useDispatch();

    const removeBasket = ()=>{
        dispatch(removeFromBasket({id}))
    }

    return (
        <div className='grid grid-cols-5'>
            <div>
                <Image src={image}  width={200} height={200} alt={title} objectFit='contain'/>
            </div>
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className="flex space-x-2">
                    {
                        Array(rating).fill().map(()=>(
                            <StarIcon class='h-5 text-yellow-500'/>
                        ))
                    }
                </div>
                <p className='line-clamp-2 text-xs my-2'>{description}</p>
                <Currency
                    quantity={price}
                    currency="RUB"
                />
                {hasPrime && 
                    <div className="flex items-center space-x-2">
                        <img className='w-12' src='https://links.papareact.com/fdw'/>
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                }
            </div>
            
            <div className='flex flex-col justify-self-end my-auto space-y-3'>
                <button onClick={removeBasket} className='button mt-auto px-2'>Remove from Basket</button>
            </div>
            
        </div>
    )
}

export default CheckoutProduct
