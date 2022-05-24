export default function Hero() {
    return (
        <section className='w-full py-20'>
            <div className='w-full max-w-5xl mx-auto flex flex-col'>
                <h1 className='text-center text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-3xl'>
                    Crowdfunding on the Blockchain,
                    <br />
                    using NFTs
                </h1>
                <div className='text-center mt-4'>
                    <div className='px-4 w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-1'>
                        To date
                    </div>
                    <div className='flex justify-around text-center text-3xl leading-8 font-bold tracking-tight text-blue-500 sm:text-3xl mb-1'>
                        <div>
                            <img
                                src='/assets/IClogo.png'
                                className='h-4 inline-block'
                            />{' '}
                            5239 ICP
                        </div>
                    </div>
                    <div className='px-4 w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-4'>
                        raised by projects on CrowdFund NFT
                    </div>
                </div>
                <div className='text-center mt-4'>
                    <a href='https://dfinity.org' target='_blank'>
                        <img
                            src='/assets/icbadge.svg'
                            className='w-125 h-8 hover:scale-105 duration-200 cursor-pointer d-inline-block'
                            style={{ display: 'inline-block' }}
                            alt=''
                        />
                    </a>
                </div>

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
