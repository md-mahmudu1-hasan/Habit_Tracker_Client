import React from 'react'
import HeroSlider from './Hero'
import Habites from './Habites'
import WhyBuildHabit from './WhyBuildHabit'
import Review from './Review'
import Features from './Features'
import Loader from '../Loader/Loader'
import useAuth from '../../Hooks/useAuth'
import HowCanThisHelp from './HowCanThisHelp'
import HowWeOperate from './HowWeOperate'
import FAQ from './FAQ'
const Home = () => {

  const {loading} = useAuth();
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className='bg-[#e0f6fa] dark:bg-[#020617] h-full'>
        <HeroSlider></HeroSlider>
        <Habites></Habites>
        <WhyBuildHabit></WhyBuildHabit>
        <Features></Features>
        <Review></Review>
        <HowCanThisHelp></HowCanThisHelp>
        <HowWeOperate></HowWeOperate>
        <FAQ></FAQ>
    </div>
  )
}

export default Home

