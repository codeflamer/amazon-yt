import moment from "moment";
import { getSession, useSession } from "next-auth/client";
import db from "../../firebase";
import Header from "../components/Header"
import Order from "../components/Order";

const orders = ({orders}) => {
    const [session] = useSession();
    // console.log(session?.user.email);
    return (
        <div>
            <Header/>
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b border-yellow-400 pb-4">Your Orders</h1>
                {session ? 
                <h2>{orders.length} order(s)</h2>
                : 
                <h2>
                    Please signIn to see your orders
                </h2>
                }
                <div className="mt-5 space-y-4">
                    {orders?.map(({id,amount,amountShipping,items,timestamp,images})=>(
                        <Order 
                            id={id}
                            key={id}
                            amount={amount}
                            amountShipping={amountShipping}
                            items={items}
                            timestamp={timestamp}
                            images={images}
                        />
                    ))}
                </div>
            </main>
           
        </div>
    )
}

export default orders

export async function getServerSideProps(context){
    // console.log(context);
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    //get the user logged in credentials
    const session = await getSession(context);

    if (!session){
        return {
            props:{}
        };
    }
    console.log(session.user.email);
    //firebase db
    const stripeOrder = await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp','desc').get();

    //stripe orders
    const orders = await Promise.all(stripeOrder.docs.map(async (order) => ({
        id:order.id,
        amount:order.data().amount,
        amountShipping:order.data().amount_shipped,
        images:order.data().images,
        timestamp:moment(order.data().timestamp.toDate()).unix(),
        items:(
            await stripe.checkout.sessions.listLineItems(order.id,{
                limit:100
            })
        ).data,
    })))

    console.log(orders);
    return {
        props:{
            orders,
            session
        }
    };
}