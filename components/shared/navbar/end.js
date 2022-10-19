import Link from 'next/link'
import { useState } from 'react'
import Sidebar from '../sidebar'

export default function End() {
    const [showSidebar, setShowSidebar] = useState(false)

    return (
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
                type='button'
                onClick={() => setShowSidebar(true)}>
                <span>Create a Project</span>
            </button>
        </Link>
    )
}
