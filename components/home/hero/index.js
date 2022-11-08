import AcademicCapIcon, { EnvelopeIcon } from '@heroicons/react/outline/AcademicCapIcon';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className='w-full '>
            <div className='w-full py-16 pt-72 sm:pt-48 max-w-5xl mx-auto flex flex-col'>
                <h1 className='text-center leading-8 text-6xl sm:leading-8 font-bold tracking-tight text-gray-900 sm:text-7xl'>
                    Crowdfund <span className="block sm:inline">the <span className="text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-600 to-blue-600">future.</span></span>
                    <br />
                
                </h1>
                <button
                        type="button"
                        className="inline-flex my-10 items-center rounded-full border border-transparent bg-gradient-to-br from-blue-500 to-blue-600 w-1/3  mx-auto px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <div className="mx-auto flex">
                    {/* <AcademicCapIcon className="-ml-1 mr-3 h-5 w-5 sm:h-7 sm:w-7" aria-hidden="true" /> */}
                        <p className="text-center text-lg sm:text-xl">
                            <Link href='/create-a-project'>
                            Get started
                            </Link>
                        </p>
                        </div>
                </button>
                <div className="mt-10 bg-clear pb-4">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-clear" />
          <div className="relative mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <dl className="rounded-lg sm:grid sm:grid-cols-3 space-y-4">
                <div className="flex flex-col border-b sm:mt-4 border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2  text-md font-regular leading-6 text-neutral-500">projects funded</dt>
                  <dd className="order-1 text-4xl font-bold tracking-tight text-blue-600">21</dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-md font-regular leading-6 text-neutral-500">towards the future of the IC</dt>
                  <dd className="order-1 text-4xl font-bold tracking-tight text-blue-600"><div>
                            <img
                                src='/assets/IClogo.png'
                                className='h-6 inline-block'
                            />{' '}
                            14,781 ICP
                        </div></dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-md font-regular leading-6 text-neutral-500">NFTs minted</dt>
                  <dd className="order-1 text-4xl font-bold tracking-tight text-blue-600">1508</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    
                {/* <div className='text-center mt-4'>
                    <div className='px-4 w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-1'>
                        To date
                    </div>
                    <div className='flex justify-around text-center text-3xl leading-8 font-bold tracking-tight text-blue-500 sm:text-3xl mb-1'>
                        <div>
                            <img
                                src='/assets/IClogo.png'
                                className='h-4 inline-block'
                            />{' '}
                            14,781 ICP
                        </div>
                    </div>
                    <div className='px-4 w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-4'>
                        raised by projects on CrowdFund NFT
                    </div>
                </div> */}
                <div className='text-center mt-4'>
                    <a href='https://dfinity.org' target='_blank'>
                        <img
                            src='/assets/icbadge.svg'
                            className='w-125 h-18 sm:h-8 hover:scale-105 duration-200 cursor-pointer d-inline-block'
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
