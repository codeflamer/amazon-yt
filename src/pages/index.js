import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Productfeed from "../components/Productfeed";

export default function Home({products}) {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header/>

      <main className=" max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner/>


        {/* Product Feed */}
        <Productfeed products={products}/>
      </main>
      
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const products = await fetch('https://fakestoreapi.com/products')
                    .then(res=>res.json())
  // Pass data to the page via props
  return { props: { products } }
}
