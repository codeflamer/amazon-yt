import moment from "moment"
import Currency from "react-currency-formatter"

const Order = ({id,amount,amountShipping,items,timestamp,images}) => {
    return (
        <div className="relative border rounded-md">
            <div className="flex items-center space-x-10 bg-gray-100 text-sm text-gray-600 p-5">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
                </div>
                <div>
                    <p className="font-bold text-xs">TOTAL</p>
                    <p>
                        <Currency quantity={amount} currency="GBP" /> - Next Day Delivery {" "}
                        <Currency quantity={amountShipping} currency="GBP" />
                    </p>
                </div>
                
                <p className='text-sm whitespace-nowrap text-blue-500 flex-1 self-end text-right'>{items.length} items</p>
                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap" >ORDER #{id}</p>
            </div>
            <div>
                <div className="flex p-5 space-x-5 overflow-x-auto">
                    {images.map((image,id)=>(
                        <img key={id} src={image} alt='' className='h-20 sm:h-32 cursor-pointer'/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
