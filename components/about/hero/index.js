export default function Hero() {
  return (
    <section className='w-full bg-gradient-to-br from-blue-500 to-blue-600 py-20'>
      <div className='flex w-full flex-col'>
        <div className='flex w-full flex-col space-y-10 py-10 md:flex-row md:space-x-10'>
          <div className='w-full text-6xl font-bold text-white md:w-6/12 md:text-6xl'>
            Crowdfunding on the{' '}
            <span className='underline duration-500 hover:text-blue-800'>
              Blockchain
            </span>
            , using <span className='italic'>NFTs</span>
          </div>
          <div className='flex w-full flex-col justify-center md:w-6/12'>
            <ul className='text-2xl font-medium text-gray-300'>
              <li className='flex flex-row items-center space-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>Proof of ownership</span>
              </li>
              <li className='flex flex-row items-center space-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>Cheap and global</span>
              </li>
              <li className='flex flex-row items-center space-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>Raise faster</span>
              </li>
            </ul>
          </div>
        </div>

        <a
          href='https://dfinity.org'
          target='_blank'
          className='mt-4 text-center'
        >
          <img
            src='/assets/icbadge.svg'
            className='w-125 d-inline-block h-8 cursor-pointer duration-200 hover:scale-105'
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
