import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className='relative'>
            <div
                className="h-32 w-full absolute bottom-0 z-20 bg-gradient-to-t from-gray-100 to-transparent"
            />
           <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
           >
                <div>
                    <img loading='lazy' src="https://links.papareact.com/gi1" />
                </div>
                <div>
                    <img loading='lazy' src="https://links.papareact.com/6ff" />
                </div>
                <div>
                    <img loading='lazy' src="https://links.papareact.com/7ma" />
                </div>
            </Carousel> 
        </div>
    )
}

export default Banner
