// Next, React
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Featured from '../components/home/featured'
import Hero from '../components/home/hero'
import NearlyFunded from '../components/home/nearly-funded'
import Navbar from '../components/shared/navbar'
import styles from '../styles/Home.module.css'

import { AuthClient } from '@dfinity/auth-client'

// Dfinity
import {
    makeBackendActor,
    makeBackendActorWithIdentity,
} from '../ui/service/actor-locator'

function HomePage() {
    const [backend, setBackend] = useState()
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

    const login = async () => {
        const DEV = process.env.NEXT_PUBLIC_IC_HOST === 'http://localhost:8000'
        if (!DEV) {
            // log in using internet identity, otherwise use default identity
            const authClient = await AuthClient.create()
            authClient.login({
                onSuccess: async () => {
                    const identity = await authClient.getIdentity()
                    setBackend(makeBackendActorWithIdentity(identity))
                },
            })
        } else {
            setBackend(makeBackendActor())
        }
    }

    return (
        <div className='w-full'>
            <Navbar />

            {backend ? (
                <div>Logged in</div>
            ) : (
                <button onClick={login}>Login</button>
            )}

            <button onClick={sayGreeting}>Say greeting</button>

            <div>{JSON.stringify(test)}</div>
            <div>{JSON.stringify(profile)}</div>
            <div>{JSON.stringify(profiles)}</div>

            <Hero />

            <Featured />

            <NearlyFunded />
        </div>
    )

    return (
        <div className={styles.container}>
            <Head>
                <title>Internet Computer</title>
            </Head>
            <main className='bg-red-100'>
                <h3 className={styles.title}>
                    Welcome to Next.js Internet Computer Starter Template!
                </h3>

                <img
                    src='/logo.png'
                    alt='DFINITY logo'
                    className={styles.logo}
                />

                <section>
                    <label htmlFor='name'>Enter your name: &nbsp;</label>
                    <input
                        id='name'
                        alt='Name'
                        type='text'
                        value={name}
                        onChange={onChangeName}
                    />
                    <button onClick={sayGreeting}>Send</button>
                </section>
                <section>
                    <label>Response: &nbsp;</label>
                    {loading}
                    {greetingMessage}
                </section>
            </main>
        </div>
    )
}

export default HomePage
