import { useBackend } from '@/context/backend'
import Link from 'next/link'

export default function End() {
    const { backendWithAuth } = useBackend()

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
                    font-medium items-center focus:outline-none
                    px-3 text-sm border-blue-600 border-2
                `}
                type='button'>
                <span>{backendWithAuth ? 'Manage project' : 'Login'}</span>
            </button>
        </Link>
        <Link
            href='/create-a-project'
            as='/create-a-project.html'
            passHref
        >
            <button
                className={`
                    h-12 rounded-full
                    ml-2 bg-gradient-to-br from-neutral-800 to-black text-white flex flex-row space-x-1
                    font-medium items-center focus:outline-none
                    px-8 text-sm
                `}
                type='button'
                onClick={() => setShowSidebar(true)}>
                {/* <svg
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
                </svg> */}
                <span className="text-md">Start a Crowdfund</span>
            </button>
        </Link>
        </>
    )
}
