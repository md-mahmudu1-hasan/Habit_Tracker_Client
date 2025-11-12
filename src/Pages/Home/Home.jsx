import React from 'react'
import HeroSlider from './Hero'
import Habites from './Habites'
import WhyBuildHabit from './WhyBuildHabit'
import Review from './Review'
import Features from './Features'
import Loader from '../Loader/Loader'
import useAuth from '../../Hooks/useAuth'
const Home = () => {

  const {loading} = useAuth();
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className='bg-[#e0f6fa] h-full'>
        <HeroSlider></HeroSlider>
        <Habites></Habites>
        <WhyBuildHabit></WhyBuildHabit>
        <Features></Features>
        <Review></Review>
    </div>
  )
}

export default Home

