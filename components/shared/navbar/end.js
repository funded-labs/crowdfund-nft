import { useBackend } from '@/context/backend'
import Link from 'next/link'
import { useState } from 'react'
import Sidebar from '../sidebar'

export default function End() {
    const { backendWithAuth } = useBackend()
    const [showSidebar, setShowSidebar] = useState(false)

    return (
        <>
        <Link
            href='/manage-project'
            as='/manage-project.html'
            passHref
        >
            <button
                className={`
                    h-8 px-2 rounded-lg text-sm focus:outline-none
                    ml-2 bg-white text-blue-600 flex flex-row space-x-1
                    font-medium items-center 
                `}
                type='button'>
                <span>{backendWithAuth ? 'Manage project' : 'Login'}</span>
            </button>
        </Link>
        <button
            className={`
                h-12 rounded-full
                ml-2 bg-gradient-to-br from-neutral-800 to-black text-white flex flex-row space-x-1
                font-medium items-center focus:outline-none
                px-8 text-sm
            `}
            type='button'
            onClick={() => setShowSidebar(true)}>
            <span className="text-md">Start <span className="hidden sm:inline">a Crowdfund</span></span>
        </button>
        <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
        </>
    )
}
