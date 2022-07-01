import { useState } from 'react'
import Sidebar from '../sidebar'

export default function End() {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <div className=''>
            <button
                className={`
                    h-8 px-2 rounded-lg text-sm focus:outline-none
                    ml-2 bg-blue-600 text-white flex flex-row space-x-1
                    font-medium items-center focus:outline-none
                    px-3 text-sm
                `}
                type='button'
                onClick={() => setShowSidebar(true)}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4 6h16M4 12h16M4 18h16'
                    />
                </svg>
                <span>Create a Project / Login</span>
            </button>
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
        </div>
    )
}
