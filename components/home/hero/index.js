import AcademicCapIcon, {
  EnvelopeIcon,
} from '@heroicons/react/outline/AcademicCapIcon'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className='w-full '>
      <div className='mx-auto flex w-full max-w-5xl flex-col py-16 pt-72 sm:pt-48'>
        <h1 className='text-center text-6xl font-bold leading-8 tracking-tight text-gray-900 sm:text-7xl sm:leading-8'>
          Crowdfund{' '}
          <span className='block sm:inline'>
            the{' '}
            <span className='bg-gradient-to-br from-cyan-600 to-blue-600 bg-clip-text text-6xl text-transparent sm:text-7xl'>
              future.
            </span>
          </span>
          <br />
        </h1>
        <button
          type='button'
          className='my-10 mx-auto inline-flex w-1/2 items-center rounded-full border border-transparent bg-gradient-to-br from-blue-500 to-blue-600  px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-1/3'
        >
          <div className='mx-auto flex'>
            {/* <AcademicCapIcon className="-ml-1 mr-3 h-5 w-5 sm:h-7 sm:w-7" aria-hidden="true" /> */}
            <p className='text- text-center sm:text-xl'>
              <Link href='/create-a-project'>Get started</Link>
            </p>
          </div>
        </button>
        <div className='bg-clear mt-10 pb-4'>
          <div className='relative'>
            <div className='bg-clear absolute inset-0 h-1/2' />
            <div className='relative mx-auto max-w-7xl px-8 sm:px-6 lg:px-8'>
              <div className='mx-auto max-w-4xl'>
                <dl className='space-y-4 rounded-lg sm:grid sm:grid-cols-3'>
                  <div className='flex flex-col border-b border-gray-100 p-6 text-center sm:mt-4 sm:border-0 sm:border-r'>
                    <dt className='text-md font-regular  order-2 mt-2 leading-6 text-neutral-500'>
                      projects funded
                    </dt>
                    <dd className='order-1 text-4xl font-bold tracking-tight text-blue-600'>
                      13
                    </dd>
                  </div>
                  <div className='flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r'>
                    <dt className='text-md font-regular order-2 mt-2 leading-6 text-neutral-500'>
                      towards the future
                    </dt>
                    <dd className='order-1 text-4xl font-bold tracking-tight  text-blue-600'>
                      <div>
                        <img
                          src='/assets/IClogo.png'
                          className='inline-block h-6'
                        />{' '}
                        39,793 ICP
                      </div>
                    </dd>
                  </div>
                  <div className='flex flex-col  border-t border-gray-100 p-6  text-center sm:border-0 sm:border-l'>
                    <dt className='text-md font-regular order-2 mt-2 leading-6 text-neutral-500'>
                      NFTs minted
                    </dt>
                    <dd className='order-1 text-4xl font-bold tracking-tight text-blue-600'>
                      2,975
                    </dd>
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
                            29,803 ICP
                        </div>
                    </div>
                    <div className='px-4 w-full max-w-5xl mx-auto text-gray-400 uppercase font-semibold text-sm mb-4'>
                        raised by projects on CrowdFund NFT
                    </div>
                </div> */}
        <div className='mt-4 text-center'>
          <a href='https://dfinity.org' target='_blank'>
            <img
              src='/assets/icbadge.svg'
              className='w-125 h-18 d-inline-block cursor-pointer duration-200 hover:scale-105 sm:h-8'
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
