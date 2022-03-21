export default function Hero() {
    return (
        <section className='w-full py-20 bg-gradient-to-br from-blue-500 to-blue-600'>
            <div className='w-full max-w-5xl mx-auto flex flex-col px-4'>
                <div className="w-full flex flex-col space-y-10 md:flex-row md:space-x-10 py-10">
                    <div className="w-full md:w-6/12 font-bold text-4xl md:text-6xl text-white">
                        Crowdfunding on the <span className="underline hover:text-blue-800 duration-500">Blockchain</span>,
                        using <span className="italic">NFTs</span>
                    </div>
                    <div className="w-full md:w-6/12 flex flex-col justify-center">
                        <ul className="text-gray-300 font-medium text-2xl">
                            <li className="flex flex-row space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Proof of ownership</span>
                            </li>
                            <li className="flex flex-row space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Cheaper and Global investing</span>
                            </li>
                            <li className="flex flex-row space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Raise faster</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <a href='https://dfinity.org' target='_blank' className='text-center mt-4'>
                    <img
                        src='/assets/icbadge.svg'
                        className='w-125 h-8 hover:scale-105 duration-200 cursor-pointer d-inline-block'
                        style={{ display: 'inline-block' }}
                        alt=''
                    />
                </a>

                {/* <div className="w-full max-w-lg mx-auto">
                    <div className="w-full flex flex-row justify-between text-sm lg:text-base px-4">
                        <span className="inline-block">Design</span>
                        <span className="inline-block">Tech</span>
                        <span className="inline-block">Crypto</span>
                        <span className="inline-block">Film</span>
                        <span className="inline-block">Music</span>
                        <span className="inline-block">Art</span>
                    </div>
                </div> */}
            </div>
        </section>
    )
}