import { useBackend } from '@/context/backend'
import Link from 'next/link'
import { useState } from 'react'
import Sidebar from '../sidebar'

export default function End() {
  const { backendWithAuth } = useBackend()
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <Link href='/manage-project' as='/manage-project.html' passHref>
        <button
          className={`
                    ml-2 flex h-8 flex-row items-center
                    space-x-1 rounded-lg bg-white px-2 text-sm font-medium
                    text-blue-600 focus:outline-none 
                `}
          type='button'
        >
          <span>{backendWithAuth ? 'Manage project' : 'Sign in'}</span>
        </button>
      </Link>
      <button
        className={`
                ml-2 flex
                h-12 flex-row items-center space-x-1 rounded-full bg-gradient-to-br from-neutral-800 to-black
                px-8 text-sm font-medium
                text-white focus:outline-none
            `}
        type='button'
        onClick={() => setShowSidebar(true)}
      >
        <span className='text-md'>
          Start <span className='hidden sm:inline'>a Crowdfund</span>
        </span>
      </button>
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
    </>
  )
}
