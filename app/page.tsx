import React from 'react'

import SliderOne from '@/components/Slider/SliderOne'
import Banner from '@/components/Home1/Banner'
import Benefit from '@/components/Home1/Benefit'

import Brand from '@/components/Home1/Brand'
import Steps from '@/components/Home1/Steps'



export default function Home() {
  return (
    <>
    <SliderOne/>
      <Banner />
      <Benefit props="md:py-20 py-10" />
       <Steps/>
      
      <Brand />
     
      
    </>
  )
}
