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
                    h-8 px-2 rounded-lg text-sm focus:outline-none
                    ml-2 bg-blue-600 text-white flex flex-row space-x-1
                    font-medium items-center focus:outline-none
                    px-3 text-sm
                `}
                type='button'>
                <span>Create a Project</span>
            </button>
        </Link>
        </>
    )
}
