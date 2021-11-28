import Product from "./Product"

const Productfeed = ({products}) => {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  md:-mt-52'>
            {
                products.slice(0,4).map(({id,item,description,price,title,category,image}) =>(
                    <Product key={id} item={item} description={description} price={price} title={title} category={category} image={image}/>
                ))
            }
            <img className="md:col-span-full"
                src='https://links.papareact.com/dyz' 
                alt=''/>
            <div className="md:col-span-2">
            {
                products.slice(4,5).map(({id,item,description,price,title,category,image}) =>(
                    <Product key={id} item={item} description={description} price={price} title={title} category={category} image={image}/>
                ))
            }
            </div>

            {
                products.slice(5,products.length).map(({id,item,description,price,title,category,image}) =>(
                    <Product key={id} item={item} description={description} price={price} title={title} category={category} image={image}/>
                ))
            }

        </div>
    )
}

export default Productfeed
