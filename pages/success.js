import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Success() {
    // todo:
    // if it's possible to call the backend with
    // some kind of ID to prevent users directly navigating
    // to this page, and also show a slightly customised message
    // that would be good...

    useEffect(() => {
        confetti()
    }, [])

    const handleShare = () => {
        if (!window) return

        const message = encodeURI(
            `I just backed a project on @crowdfundnft. Help get it fully funded!`
        )

        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const projectId = urlParams.get('projectId')
        const url = encodeURI(
            `https://kn5ky-6iaaa-aaaai-qbikq-cai.ic0.app/${
                projectId ? `project.html?projectId=${projectId}` : ''
            }`
        )

        window.location = `https://twitter.com/intent/tweet?text=${message}&url=${url}`
    }

    return (
        <div className='w-full flex flex-col'>
            <Head>
                <title>
                    You have successfully backed a project on CrowdFund NFT!
                </title>
            </Head>
            <Navbar />

            <div className='w-screen h-screen bg-white flex flex-col justify-center'>
                <div className='w-full max-w-6xl px-4 mx-auto items-center flex flex-col space-y-4'>
                    <p className='text-5xl lg:text-7xl font-bold text-blue-600 text-center'>
                        Congratulations!
                    </p>
                    <p className='max-w-xl text-center text-gray-500'>
                        Thank you for backing this project on CrowdFund NFT! If
                        the project reaches its funding goal, your NFT will be
                        transferred to your wallet - if the project does not get
                        fully funded, you will be reimbursed.
                    </p>

                    <p className='max-w-xl text-center'>
                        Keep an eye out for our progress, and check your wallet
                        once the crowdfunding round ends!
                    </p>
                    <Link href='/' passHref>
                        <a className='text-sm hover:text-blue-600'>
                            &larr; Back to homepage
                        </a>
                    </Link>

                    <div className='pt-10 w-full max-w-lg'>
                        <div
                            className={`
                                border rounded-lg -rotate-1 hover:rotate-0 duration-300
                                flex flex-row justify-between
                            `}>
                            <div className='p-4 flex flex-col justify-center items-start'>
                                <p>
                                    Make sure this project gets fully funded by
                                    sharing it with your friends!
                                </p>
                            </div>
                            <button
                                className={`
                                    bg-gray-100 w-3/12 p-2 flex flex-row justify-center items-center
                                    text-blue-400 hover:bg-blue-400 hover:text-white overflow-hidden
                                    duration-200 cursor-pointer focus:outline-none appearance-none
                                `}
                                type='button'
                                onClick={handleShare}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    width='30'
                                    height='30'
                                    viewBox='0 0 24 24'>
                                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
