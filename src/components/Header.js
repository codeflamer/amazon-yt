import Image from 'next/image';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid'
import { ShoppingCartIcon } from '@heroicons/react/outline'
import { useSession, signIn, signOut } from "next-auth/client"
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

const Header = () => {
    const [session] = useSession();
    const router = useRouter()
    const items = useSelector(selectItems);

    return (
        <header>
            {/* Top section */}
            <div className="flex items-center  py-2 bg-amazon_blue p-2">
                {/* Logo */}
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image
                        onClick={()=>router.push('/')}
                        width={150}
                        height={40}
                        src='https://links.papareact.com/f90'
                        objectFit="contain"
                        className="cursor-pointer"
                    />
                </div>
                {/* middle section */}
                <div className='hidden sm:flex flex-grow items-center h-10 bg-yellow-400 rounded-md cursor-pointer'>
                    <input type="text"
                        className='flex flex-grow h-full focus:outline-none rounded-l-md px-4'
                    />
                    <SearchIcon className="h-12 p-4"/>
                </div>
                {/* Right section */}
                <div className='text-white mx-2 flex items-center space-x-4 text-xs whitespace-nowrap'>
                    <div onClick={session ? signOut : signIn} className='link'>
                        <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
                        <p className='font-extrabold md:text-sm'>Accounts & Lists</p>
                    </div>
                    <div onClick={()=>router.push('/orders')} className='link'>
                        <p>Returns</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>
                    <div onClick={()=>router.push('/checkout')} className='relative flex items-center link'>
                        <p className='absolute top-0 right-0 md:right-11 bg-yellow-400 w-4 h-4 text-center rounded-full'>
                            {items.length}
                        </p>
                        <ShoppingCartIcon className='h-10'/>
                        <p className='hidden md:flex font-extrabold md:text-sm mt-2'>Baskets</p>
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div className="bg-amazon_blue-light text-white flex p-2 text-sm space-x-2 items-center pl-6">
                <p className='link flex items-center'>
                    <MenuIcon className='h-6 mr-1'/>
                    All
                </p>
                <p className='link'>Prime Video</p>
                <p className='link'>Amazon Business</p>
                <p className='link'>Today's Deals</p>
                <p className='hidden link lg:flex'>Electronics</p>
                <p className='hidden link lg:flex'>Food & Category</p>
                <p className='hidden link lg:flex'>Prime</p>
                <p className='hidden link lg:flex'>Buy Now</p>
                <p className='hidden link lg:flex'>Shopper Toolkit</p>
                <p className='hidden link lg:flex'>Health & Personal Care</p> 
            </div>
        </header>
    )
}

export default Header
