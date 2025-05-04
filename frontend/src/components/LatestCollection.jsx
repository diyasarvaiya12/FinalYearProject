import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  // Function to slide left
  const scrollLeft = () => {
    const container = sliderRef.current;
    if (container.scrollLeft === 0) {
      container.scrollTo({
        left: container.scrollWidth,
        behavior: "instant",
      });
    }
    container.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  // Function to slide right
  const scrollRight = () => {
    const container = sliderRef.current;
    if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
      container.scrollTo({
        left: 0,
        behavior: "instant",
      });
    }
    container.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="my-10 relative">
      <div className="text-center py-8 text-3xl">
      <h2 className='text-5xl font-serif text-[#053342] '>~Latest Collection~</h2>
        {/* <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p> */}
      </div>

      {/* Slider Container */}
      <div className="relative bg-[#FDF6E6] p-4 rounded-lg">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#053342] text-white px-4 py-2 rounded-full shadow-lg text-lg"
        >
          &#8592; {/* Left Arrow */}
        </button>

        {/* Product List */}
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll scroll-smooth gap-4 px-10 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden"
        >
          {latestProducts.map((item, index) => (
            <div key={index} className="min-w-[200px]">
              <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#053342] text-white px-4 py-2 rounded-full shadow-lg text-lg"
        >
          &#8594; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default LatestCollection;
