import { useState } from 'react';
import Sidebar from '../sidebar'

export default function End() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className=''>
            <button
                className={`
                    text-blue-600 flex flex-row space-x-1
                    font-medium items-center focus:outline-none
                    py-2 px-3
                `}
                type="button"
                onClick={() => setShowSidebar(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Menu</span>
            </button>
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
        </div>
    );
}
