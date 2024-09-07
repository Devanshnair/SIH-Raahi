import React from 'react'
import MainSection from './sections/MainSection'
import MentorExplore from './sections/ExploreMentors'
import CategorySection from './sections/CategorySection'
import Testimonials from './sections/Testimonials'
import Navbar from '../../components/Navbar'

const LandingPage = () => {
  return (
    <div className='bg-zinc-950'>
        <Navbar />
        <MainSection/>
        <MentorExplore />
        <CategorySection />
        <Testimonials />
    </div>
  )
}

export default LandingPage