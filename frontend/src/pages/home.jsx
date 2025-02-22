import React from 'react'
import Hero from '../components/Hero'
import LandingAbout from '../components/LandingAbout'
import LandingServices from '../components/LandingServices'
import Menuu from '../components/Menuu'
import Testimonial from '../components/Testimonal'
import Gallery from '../components/Galleryy'
import BestSeller from '../components/BestSeller'
import LatestCollection from '../components/LatestCollection'

const home = () => {
  return (
    <div>
      <Hero/>
      <LandingAbout/>
      <LandingServices/>
      <Menuu/>
      <Testimonial/>
      <LatestCollection/>
      <BestSeller/>
      <Gallery/> 
    </div>
  )
}

export default home
