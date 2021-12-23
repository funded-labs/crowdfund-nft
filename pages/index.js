/* eslint-disable @next/next/no-img-element */
// Next, React
import Head from "next/head"
import { useState, useEffect } from "react"
import Featured from "../components/home/featured"
import Hero from "../components/home/hero"
import NearlyFunded from "../components/home/nearly-funded"
import Navbar from "../components/shared/navbar"
import styles from "../styles/Home.module.css"

// Dfinity
import { makeHelloActor } from "../ui/service/actor-locator"
const hello = makeHelloActor()

function HomePage() {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState("")
    const [greetingMessage, setGreetingMessage] = useState("")

    function onChangeName(e) {
        const newName = e.target.value
        setName(newName)
    }

    async function sayGreeting() {
        setGreetingMessage("")
        setLoading("Loading...")

        const greeting = await hello.greet(name)

        setLoading("")
        setGreetingMessage(greeting)
    }

    return (
        <div className="w-full">
            <Navbar />

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
            <main className="bg-red-100">
                <h3 className={styles.title}>
                    Welcome to Next.js Internet Computer Starter Template!
                </h3>

                <img
                    src="/logo.png"
                    alt="DFINITY logo"
                    className={styles.logo}
                />

                <section>
                    <label htmlFor="name">Enter your name: &nbsp;</label>
                    <input
                        id="name"
                        alt="Name"
                        type="text"
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
