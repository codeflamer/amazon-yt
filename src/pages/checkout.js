import Head from "next/head";
import Header from "../components/Header";
import Image from 'next/image'
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/client";
import Currency from 'react-currency-formatter';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const [session] = useSession();
    // console.log(!session)
    
    const checkoutToStripe = async() =>{
        const stripe = await stripePromise;

        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items:items,
            email:session.user.email
          })

        const result = await stripe.redirectToCheckout({
            sessionId:checkoutSession.data.id
        })

        if (result.error){
            alert(result.error.message)
        }
    }

    return (
        <div className="bg-gray-100">
            <Head>
                <title>Checkout</title>
            </Head>
            <Header/>
            
            <main className="lg:flex border-2 max-w-screen-2xl mx-auto">
                <div className="flex-grow m-5 shadow-sm">
                    {/* Left section */}
                    <Image
                        src='https://links.papareact.com/ikj'
                        width={1020}
                        height={250}
                        alt=''
                        objectFit="contain"
                    />
                    <div className='flex flex-col space-y-10 bg-white p-5 shadow-md'>
                        <h1 className='text-3xl border-b pb-5'>
                            {items.length === 0 ? 'Your Shopping Basket is Empty' :'Shopping Basket' }
                        </h1>

                        {
                            items.map((item,i)=>(
                                <CheckoutProduct 
                                    key={i}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    rating={item.rating}
                                    description={item.description}
                                    category={item.category}
                                    image={item.image}
                                    hasPrime={item.hasPrime}
                                />
                            ))
                        }
                    </div>
                </div>

                
                    {/* right Section */}
                    {items.length > 0 && (
                        <div className="flex flex-col bg-white p-10 shadow-md">
                            <h2 className='whitespace-nowrap'>
                                SubTotal({items.length} items):{" "} 
                                <span className="font-bold">
                                    <Currency quantity={total} currency='RUB'/>
                                </span>
                            </h2>
                            <button 
                                onClick={checkoutToStripe}
                                disabled={!session} 
                                className={`button mt-2 px-2 ${!session && 'text-gray-300 from-gray-300 to-gray-500 border-gray-300 cursor-not-allowed'}`}>
                                {session ? 'Proceed To Checkout' : 'signIn'}
                            </button>
                        </div>
                    )}
            </main>
        </div>
    )
}

export default Checkout
