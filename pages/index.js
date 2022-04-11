import { useState, useEffect } from 'react'
import Featured from '../components/home/featured'
import LiveSoon from '../components/home/live-soon'
import Hero from '../components/home/hero'
import Entrepot from '@/components/home/entrepot'
// import NearlyFunded from '../components/home/nearly-funded'
import Navbar from '../components/shared/navbar'
import Footer from '@/components/shared/footer'
import Entrepot2 from '@/components/home/entrepot2'
import Setup from '@/components/home/setup'

const HomePage = () => (
    <div className='w-full'>
        <Navbar />

        <Hero />

        <Featured />

        <LiveSoon />

        <Entrepot2 />

        <Setup />

        {/* <NearlyFunded /> */}

        <Footer />
    </div>
)

export default HomePage
