export default function End() {
    return (
        <div className="flex flex-row space-x-4">
            <img src="/assets/metamask.png" className="w-8 h-8 hover:scale-105 duration-200 cursor-pointer" />
            <button
                className={`
                    appearance-none rounded-lg px-2 py-1 text-gray-900 font-medium
                    text-xs hover:bg-gray-200
                `}
            >
                Log In
            </button>
            <button
                className={`
                    appearance-none rounded-lg px-2 py-1 bg-blue-600 text-white font-medium
                    text-xs hover:bg-blue-700
                `}
            >
                Sign up
            </button>
            <div className="rounded-lg bg-gray-200 px-2 py-1 flex flex-row text-gray-400 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input className="w-32 bg-transparent focus:outline-none px-1 text-sm" />
            </div>
        </div>
    )
}