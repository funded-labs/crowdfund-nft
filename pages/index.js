import { useState, useEffect } from 'react'
import Featured from '../components/home/featured'
import Hero from '../components/home/hero'
import NearlyFunded from '../components/home/nearly-funded'
import Navbar from '../components/shared/navbar'
import { useBackend } from '@/context/backend'
import Footer from '@/components/shared/footer'

function HomePage() {
    const { backend, login } = useBackend()
    const [profile, setProfile] = useState({})
    const [profiles, setProfiles] = useState([])
    const [test, setTest] = useState('')

    useEffect(() => {
        if (!backend) return
        backend.getOwnId().then((id) => setTest(id))
        backend.getMyProfile().then((profile) => setProfile(profile))
        backend.searchProfiles('s').then((profiles) => setProfiles(profiles))
    }, [backend])

    async function sayGreeting() {
        if (!backend) return alert('You must log in for this feature')
        const greeting = await backend.greet()
        alert(greeting)
    }

    return (
        <div className='w-full'>
            <Navbar />

            <Hero />

            <Featured />

            <NearlyFunded />

            <Footer />
        </div>
    )
}

export default HomePage
