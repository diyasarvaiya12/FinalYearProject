import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const about = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
      <h2 className='text-5xl font-serif text-[#053342] '>~About Us~</h2>
      </div>    

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.neha} alt="founder" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-800 mb-4'>
              <h2 className='text-6xl font-serif text-[#053342] mb-4'>We Have The Nails knowledge</h2>
              <p>We’ve mastered the art of perfect nails. From essential care to stunning designs, we combine skill, precision, and creativity to deliver results you’ll love. Let us transform your nails and elevate your style—because you deserve the best.Our passion for perfection shines in every detail, ensuring your nails are a true reflection of your unique style. Step into a world where beauty meets artistry, and let your nails tell a story of elegance and sophistication.</p>
              <p>Our products and techniques ensure long-lasting beauty and confidence. Step into our world, where every detail is crafted to perfection just for you.</p>
              <h2 className='text-7xl font-serif text-[#053342] '>Neha Bhimani</h2>
              <h5 className='text-3xl mt-0 text-[#B0754B]'>Founder :-  The Nails Story</h5>

          </div>
      </div>

      <div className=' text-xl py-4'>
      <h2 className='text-5xl font-serif text-[#053342]'>~Why Choose Us~</h2>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16  py-8 sm:py-20 flex flex-col gap-5'>
            <b>Expert Craftsmanship:</b>
            <p className=' text-gray-600'>Our skilled professionals deliver flawless designs, ensuring precision and creativity in every detail.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Premium Products:</b>
            <p className=' text-gray-600'>We use high-quality materials and innovative techniques for beautiful, long-lasting results.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Personalized Experience</b>
            <p className=' text-gray-600'>Enjoy services tailored to your unique preferences, making every visit truly special.</p>
          </div>
      </div>
      <div className='flex flex-col md:flex-row items-center justify-center bg-[#FDF6E6] py-16 gap-10'>
        {/* Text Section */}
        <div className='text-left md:w-2/5 px-6'>
          <h2 className='text-5xl font-serif text-[#053342] mb-4'>Take Your Nails To The Next Level</h2>
          <p className='text-gray-600 leading-relaxed'>
            Choose us for unmatched quality and a personalized service experience that prioritizes your needs and preferences. Our unwavering commitment to delivering beauty and care you can trust ensures that every visit leaves you feeling confident and pampered. With a perfect blend of expertise, cutting-edge innovation, and meticulous attention to detail, we craft solutions that exceed your expectations at every turn. From the moment you step into our space, you'll discover a dedication to excellence that reflects in every design, every product, and every interaction. Let us elevate your beauty journey with services tailored just for you.          </p>
        </div>

        {/* Image Section */}
        <div className='md:w-2/5'>
          <img className='w-full rounded-md' src={assets.aboutwhychooseus} alt="Why Choose Us" />
        </div>
      </div>
      
    </div>
  )
}
export default about