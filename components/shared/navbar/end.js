import Link from "next/link";

export default function End() {
    return (
        <div className='flex flex-row space-x-4'>
            <img
                src='/assets/plug.png'
                className='w-25 h-8 hover:scale-105 duration-200 cursor-pointer'
                alt=''
            />
            <Link href="/create-a-project" passHref as="/create-a-project.html">
                <a
                    className={`
                        appearance-none rounded-lg px-2 py-1 bg-blue-600 text-white font-medium
                        text-xs flex flex-col justify-center cursor-pointer hover:bg-blue-700
                    `}
                    href="/create-a-project.html"
                >
                    Create a project
                </a>
            </Link>
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
