const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async(req,res) => {
    const { items , email } = req.body;
    console.log(items);
    const transformedData = items.map((item) =>({
        price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              images:[item.image]
            },
            unit_amount: item.price*100,
          },
          quantity: 1,
          description: item.description
    }))

    const session = await stripe.checkout.sessions.create({
        line_items: transformedData,
        shipping_rates: ['shr_1K7Sc5FuL9KodL5t09ENDnPc'],
        shipping_address_collection:{
            allowed_countries:['GB', 'US', 'CA']
        },
        payment_method_types:['card'],
        mode: 'payment',
        success_url:`${process.env.HOST}/success`,
        cancel_url:`${process.env.HOST}/checkout`,
        metadata:{
            email,
            images:JSON.stringify(items.map(item => item.image))
        }
    })

    res.status(200).json({id:session.id})
}