import { CheckCircleIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import Header from "../components/Header"


const success = () => {

    const router = useRouter();

    return (
        <div className='bg-gray-100 h-screen'>
            <Header/>
            <main className='max-w-screen-lg mx-auto'>
                <div className='bg-white p-10 flex flex-col'>
                    <div className='flex items-center space-x-2 mb-4'>
                        <CheckCircleIcon className='text-green-500 h-10'/>
                        <h1>Thank you , Your order has been confirmed!</h1>
                    </div>
                    <p>
                        Thank you for shopping with us.We will send a confirmation of tems shipped,
                        if you would have like to check the status of your order(s) please press the link below
                    </p>
                    <button onClick= {()=>router.push('/orders')} className='button mt-8'>Go to orders</button>
                </div>
            </main>
        </div>
    )
}

export default success
