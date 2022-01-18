import { useEffect, useState } from 'react'
import { useBackend } from '@/context/backend'

export default function End() {
    const { backend, login } = useBackend()
    const [principal, setPrincipal] = useState()

    useEffect(() => {
        if (!backend) return
        backend.getOwnIdText().then((id) => {
            console.log(id)
            setPrincipal(id)
        })
    }, [backend])

    return (
        <div className='flex flex-row space-x-4'>
            <img
                src='/assets/plug.png'
                className='w-25 h-8 hover:scale-105 duration-200 cursor-pointer'
                alt=''
            />
            {/* <button
                className={`
                    appearance-none rounded-lg px-2 py-1 text-gray-900 font-medium
                    text-xs hover:bg-gray-200
                `}
            >
                Log In
            </button> */}
            <button
                className={`
                    appearance-none rounded-lg px-2 py-1 bg-blue-600 text-white font-medium
                    text-xs ${!backend ? 'hover:bg-blue-700' : 'cursor-auto'}
                `}
                onClick={login}>
                {!backend ? (
                    <>Log In / Sign up</>
                ) : !principal ? (
                    <>Logged in</>
                ) : (
                    <>
                        {principal.slice(0, 4) +
                            '...' +
                            principal.slice(principal.length - 2)}
                    </>
                )}
            </button>
            <div className='hidden lg:inline-flex rounded-lg bg-gray-200 px-2 py-1 flex flex-row text-gray-400 items-center'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                </svg>
                <input className='w-32 bg-transparent focus:outline-none px-1 text-sm' />
            </div>
        </div>
    )
}
