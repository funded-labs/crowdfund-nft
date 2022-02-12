export default function Hero() {
    return (
        <section className='w-full py-20'>
            <div className='w-full max-w-5xl mx-auto flex flex-col'>
                <h1 className='text-xl lg:text-3xl text-center'>
                    Crowdfunding on the Blockchain,
                    <br />
                    using NFTs
                </h1>

                <div className='py-5 flex flex-col items-center'>
                    <img
                        src='/assets/icbadge.svg'
                        className='w-125 h-8 hover:scale-105 duration-200 cursor-pointer'
                        alt=''
                    />
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
