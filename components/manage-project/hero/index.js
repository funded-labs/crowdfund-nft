import ViewOnMarketplace from '@/components/project/view-on-marketplace'

export default function Hero({ isLoading, project }) {
  const handleShare = () => {
    if (!window) return

    const message = encodeURI(`${project.title} on @crowdfundnft`)
    const url = encodeURI(window.location)

    window.location = `https://twitter.com/intent/tweet?text=${message}&url=${url}`
  }

  return (
    <section className='w-full bg-white'>
      <div className='mx-auto flex w-full max-w-5xl flex-col px-4 py-5'>
        <h3 className='text-2xl font-medium'>icApps</h3>
        <div className='flex w-full flex-col space-y-4'>
          <div className='flex w-full flex-col'>
            <figure className='mb-1 h-96 w-full overflow-hidden rounded-xl bg-yellow-500'>
              <img className='h-full w-full bg-blue-500 object-cover' />
            </figure>
          </div>

          <div className='flex w-full flex-col'>
            <div className='relative h-3 overflow-hidden rounded-full bg-gray-200'>
              <div
                className={'absolute left-0 top-0 h-3 rounded-full bg-blue-600'}
                style={{
                  width: '100%',
                }}
              />
            </div>
            <div className='flex w-full flex-col py-3'>
              <p className='text-2xl font-medium text-blue-600'>
                <img src='/assets/IClogo.png' className='inline-block h-3' />{' '}
                2680 ICP
              </p>
              <p className='text-lg text-gray-400'>pledged of 2680 ICP goal</p>
            </div>

            {/* <PricePerNFT
                            stats={project.stats}
                            {...{ selectedTierState }}
                        /> */}
            <div className='w-full py-2'>
              <div className='flex flex-col space-y-2'>
                <p className='text-center'>This project is now fully funded!</p>
                <ViewOnMarketplace project={{}} />
              </div>
            </div>
            <div className='flex w-full flex-row items-center space-x-8'>
              <div className='w-6/12 p-3'>
                <button
                  className={`
                                        w-full border border-gray-300 bg-white py-3 px-4 text-sm text-gray-900
                                        hover:border-blue-600
                                    `}
                  type='button'
                  onClick={handleShare}
                >
                  Share
                </button>
              </div>
              <div className='flex w-6/12 flex-row justify-start space-x-1'>
                <a
                  className={`
                                            cursor-pointer py-2 px-2 text-sm text-gray-900 duration-200 hover:scale-105
                                            hover:text-blue-600
                                        `}
                  target='_blank'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                  </svg>
                </a>
                <a
                  target='_blank'
                  className={`
                                            cursor-pointer py-2 px-2 text-sm text-gray-900 duration-200 hover:scale-105
                                            hover:text-blue-600
                                        `}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    width='24'
                    height='24'
                    viewBox='0 0 71 55'
                  >
                    <path d='M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const threeDecimals = (number) => Math.round(number * 1000) / 1000
