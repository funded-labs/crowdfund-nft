import { useState, useEffect } from 'react'
import Featured from '../components/home/featured'
import Hero from '../components/home/hero'
import NearlyFunded from '../components/home/nearly-funded'
import Navbar from '../components/shared/navbar'
import { useBackend } from '@/context/backend'
import Footer from '@/components/shared/footer'
import LandingPopup, { LOCALSTORAGE_KEY } from '@/components/home/landing-popup'

function HomePage() {
    const { backend, login } = useBackend()
    const [profile, setProfile] = useState({})
    const [profiles, setProfiles] = useState([])
    const [test, setTest] = useState('')
    const [showWelcomeMessage, setWelcomeMessage] = useState(true)

    useEffect(() => {
        const dontShow = localStorage.getItem(LOCALSTORAGE_KEY)

        if (dontShow === 'true') {
            setWelcomeMessage(false)
        }
    }, [])

    async function sayGreeting() {
        if (!backend) return alert('You must log in for this feature')
        const greeting = await backend.greet()
        alert(greeting)
    }

    if (showWelcomeMessage) {
        return <LandingPopup onContinue={() => setWelcomeMessage(false)} />
    }

    return (
        <div className='w-full'>
            <Navbar />

            <Hero />

            <Featured />

            {/* <NearlyFunded /> */}

            <Footer />
        </div>
    )
}

export default HomePage
