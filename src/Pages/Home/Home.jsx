import React from 'react'
import HeroSlider from './Hero'
import Habites from './Habites'
import WhyBuildHabit from './WhyBuildHabit'
import Review from './Review'
const Home = () => {
  return (
    <div className='bg-[#e0f6fa] h-full'>
        <HeroSlider></HeroSlider>
        <Habites></Habites>
        <WhyBuildHabit></WhyBuildHabit>
        <Review></Review>
    </div>
  )
}

export default Home

