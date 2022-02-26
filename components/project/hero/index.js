import { addDays, differenceInCalendarDays } from 'date-fns'
import { useState } from 'react'
import { useBackend } from '@/context/backend'
// import Modal from '@/components/shared/modal'
import ExampleModal from './example-modal'

export default function Hero({ isLoading, project }) {
    const [showExampleModal, setExampleModal] = useState(false)
    const backend = useBackend().backendWithAuth

    const status = Object.keys(project?.status?.[0] || { submitted: null })[0]

    const handleShare = () => {
        if (!window) return

        const message = encodeURI(`${project.title} on @crowdfundnft`)
        const url = encodeURI(window.location)

        window.location = `https://twitter.com/intent/tweet?text=${message}&url=${url}`
    }

    const backProject = () => {
        if (!(status === 'whitelist' || status === 'live'))
            return alert('This project is not yet live.')
        if (!backend)
            alert(
                'You must sign in with internet identity before you can back a project.'
            )
    }

    if (isLoading) {
        return (
            <section className='w-full bg-white'>
                <div className='w-full max-w-5xl mx-auto flex flex-col px-4 py-5'>
                    <div className='animate-pulse bg-gray-200 h-14 w-96 rounded mb-3' />
                    <div className='w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8'>
                        <div className='w-full lg:w-7/12 flex flex-col'>
                            <figure className='w-full h-96 bg-gray-200 animate-pulse rounded-xl mb-1' />
                        </div>

                        <div className='w-full lg:w-5/12 flex flex-col'>
                            <div className='h-3 bg-gray-200 animate-pulse rounded-full relative overflow-hidden' />
                            <div className='w-full flex flex-col py-3'>
                                <div className='bg-gray-200 h-10 animate-pulse w-20 rounded mb-2' />
                                <div className='bg-gray-200 h-6 animate-pulse w-40 rounded' />
                            </div>
                            <div className='w-full flex flex-col py-3'>
                                <div className='bg-gray-200 h-10 animate-pulse w-20 rounded mb-2' />
                                <div className='bg-gray-200 h-6 animate-pulse w-40 rounded' />
                            </div>
                            <div className='w-full flex flex-col py-3'>
                                <div className='bg-gray-200 h-10 animate-pulse w-20 rounded mb-2' />
                                <div className='bg-gray-200 h-6 animate-pulse w-40 rounded' />
                            </div>
                            <div className='w-full py-2'>
                                <div className='rounded-full bg-gray-200 animate-pulse rounded-full w-full h-12' />
                            </div>

                            <div className='w-full flex flex-row space-x-8 items-center'>
                                <div className='w-6/12 p-3'>
                                    <div className='rounded bg-gray-200 animate-pulse h-12' />
                                </div>
                                <div className='w-6/12 flex flex-row justify-between'>
                                    <span className='bg-gray-200 animate-pulse h-5 w-5 rounded-full' />
                                    <span className='bg-gray-200 animate-pulse h-5 w-5 rounded-full' />
                                    <span className='bg-gray-200 animate-pulse h-5 w-5 rounded-full' />
                                    <span className='bg-gray-200 animate-pulse h-5 w-5 rounded-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const { title, goal } = project

    const Status = () => {
        switch (status) {
            case 'whitelist':
                return <>open to whitelist</>
            case 'live':
                return <>live</>
            default:
                return <>not live</>
        }
    }

    return (
        <section className='w-full bg-white'>
            <div className='w-full max-w-5xl mx-auto flex flex-col px-4 py-5'>
                <p className='text-2xl font-medium mb-3'>
                    {title}{' '}
                    <span className='text-gray-400 text-sm'>
                        (<Status />)
                    </span>
                </p>
                <div className='w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8'>
                    <div className='w-full lg:w-7/12 flex flex-col'>
                        <figure className='w-full h-96 bg-yellow-500 rounded-xl mb-1 overflow-hidden'>
                            <img
                                src={project.cover}
                                className='w-full h-full object-cover'
                            />
                        </figure>
                    </div>

                    <div className='w-full lg:w-5/12 flex flex-col'>
                        <div className='h-3 bg-gray-200 rounded-full relative overflow-hidden'>
                            <div
                                className={`absolute left-0 top-0 bg-blue-600 h-3 rounded-full ${
                                    title !== 'CrowdFund NFT' ? 'w-2/5' : ''
                                }`}
                            />
                        </div>
                        <div className='w-full flex flex-col py-3'>
                            <p className='text-blue-600 text-2xl font-medium'>
                                {title === 'CrowdFund NFT'
                                    ? 0
                                    : Math.floor(goal * 0.42)}{' '}
                                ICP
                            </p>
                            <p className='text-gray-400 text-lg'>
                                pledged of {goal} ICP goal
                            </p>
                        </div>
                        <div className='w-full flex flex-col py-3'>
                            <p className='text-blue-600 text-2xl font-medium'>
                                {title === 'CrowdFund NFT'
                                    ? 0
                                    : title.length * 2}ICP
                            </p>
                            <p className='text-gray-400 text-lg'>price</p>
                        </div>
                        <div className='w-full flex flex-col py-3'>
                            <p className='text-blue-600 text-2xl font-medium'>
                                {title === 'CrowdFund NFT'
                                    ? 0
                                    : differenceInCalendarDays(
                                          addDays(
                                              new Date('03/15/2022'),
                                              title.length
                                          ),
                                          new Date()
                                      )}
                            </p>
                            <p className='text-gray-400 text-lg'>days to go</p>
                        </div>
                        <div className='w-full py-2'>
                            <button
                                className={`
                                    shadow-lg bg-blue-600 text-white text-sm font-medium rounded-full w-full
                                    appearance-none focus:outline-none py-3 px-4 hover:bg-blue-700
                                `}
                                type='button'
                                onClick={backProject}>
                                Back this project
                            </button>
                            {showExampleModal && (
                                <ExampleModal
                                    onClose={() => setExampleModal(false)}
                                />
                            )}
                        </div>

                        <div className='w-full flex flex-row space-x-8 items-center'>
                            <div className='w-6/12 p-3'>
                                <button
                                    className={`
                                        bg-white border border-gray-300 py-3 w-full px-4 text-gray-900 text-sm
                                        hover:border-blue-600
                                    `}
                                    type='button'
                                    onClick={handleShare}>
                                    Share
                                </button>
                            </div>
                            {/* <div className="w-6/12 flex flex-row justify-between">
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
