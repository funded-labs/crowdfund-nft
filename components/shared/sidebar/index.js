import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useBackend } from '@/context/backend'

const navigation = [
  // { name: 'My NFTs', icon: HomeIcon, href: '#', current: true },
  // { name: 'Listed NFTs', icon: UsersIcon, href: '#', current: false },
  // { name: 'Activity', icon: FolderIcon, href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ show, onClose }) {
  const { wallets } = useBackend()
  const [loadingStoic, setLoadingStoic] = useState(false)

  useEffect(() => {
    if (show === false) return
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [show])

  useEffect(() => {
    setTimeout(() => setLoadingStoic(false), 10000)
  })

  return (
    <>
      <div
        className={classNames(
          'absolute top-0 left-0 z-30 h-screen w-screen cursor-pointer bg-neutral-900 opacity-50 duration-200',
          show === false ? 'hidden' : null,
        )}
        onClick={onClose}
      />
      <aside
        className={classNames(
          'fixed top-0 -right-96 z-30 flex h-full w-96 flex-col p-5 pt-16 text-white transition-all duration-500 ease-out md:p-10 md:pl-5',
          'bg-white',
          show ? 'mr-96' : null,
        )}
      >
        <div
          className='absolute top-3 right-3 flex h-8 w-8 cursor-pointer flex-row items-center justify-center rounded-full bg-white bg-opacity-50 text-gray-900'
          onClick={onClose}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-5 w-5 text-gray-900'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </div>

        {/* <div className='flex items-center flex-shrink-0 px-4'>
                    <img
                        className='h-8 w-auto'
                        src='/assets/logo.png'
                        alt='Workflow'
                    />
                </div> */}
        <div className='mt-5 flex flex-grow flex-col'>
          <nav className='flex-1 space-y-2 bg-white px-2' aria-label='Sidebar'>
            <div className='space-y-1'>
              <h3
                className='px-3 text-xs font-semibold uppercase tracking-wider text-gray-500'
                id='projects-headline'
              >
                Connect your wallet
              </h3>
              <h3 className='group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600'>
                Connect your wallet to buy and sell NFTs from the Crowdfund NFT
                marketplace.
              </h3>
              <div className='items-left flex w-full flex-col px-4 py-4'>
                {Object.keys(wallets).map((w) =>
                  wallets[w]['principal'] ? (
                    <div key={w} className='flex items-center py-3 text-black'>
                      <img src={'/assets/' + w + '.png'} className='h-8' />{' '}
                      <span className='px-2'>
                        {wallets[w]['principal'].substring(0, 5)}
                        ...
                        {wallets[w]['principal'].substring(
                          wallets[w]['principal'].length - 3,
                        )}
                      </span>
                    </div>
                  ) : !(w === 'stoic' && loadingStoic) ? (
                    <button
                      key={w}
                      type='button'
                      className={` mx-auto mt-1 flex w-full 
                                                flex-row items-center  justify-center  space-x-1 rounded-full border border-transparent bg-white bg-gradient-to-t from-neutral-100 to-white px-4 py-4 font-medium text-neutral-800 shadow-md`}
                      onClick={() => {
                        if (w === 'stoic') setLoadingStoic(true)
                        wallets[w]['getPrincipal']().then(() =>
                          setLoadingStoic(false),
                        )
                      }}
                    >
                      <img src={'/assets/' + w + '.png'} className='h-8' />
                      <span className='font-regular px-2 text-sm text-neutral-900'>
                        {'Connect ' +
                          w[0].toUpperCase() +
                          w.slice(1) +
                          ' Wallet'}
                      </span>
                    </button>
                  ) : (
                    <div
                      className={`mt-5 flex flex-row items-center justify-center space-x-1 
                                                rounded rounded border border-transparent bg-slate-600 px-4 py-2 font-medium text-black shadow-xl hover:bg-slate-400`}
                    >
                      <span className='px-2 font-medium text-white'>
                        Loading...
                      </span>
                    </div>
                  ),
                )}
              </div>
              <div className='relative'>
                <div
                  className=' inset-1 my-4 flex items-center'
                  aria-hidden='true'
                >
                  <div className='w-full border-t border-gray-300' />
                </div>
              </div>
              <h3
                className='px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500'
                id='projects-headline'
              >
                START A CROWDFUND
              </h3>
              <h3 className='group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600'>
                Create a project, design your NFTs and launch in minutes.
              </h3>
              <div className='space-y-3'>
                <Link
                  href='/create-a-project'
                  passHref
                  as='/create-a-project.html'
                >
                  <a
                    className={`
                                        mx-4 mt-5 flex  h-12 flex-row items-center  justify-center space-x-1 rounded-full border border-transparent bg-blue-600
                                            px-4 py-2 font-medium text-white shadow-md hover:bg-blue-700
                                        `}
                    href='/create-a-project.html'
                  >
                    Create a project
                  </a>
                </Link>
                <Link
                  href='/p/project-creator-guide'
                  passHref
                  as='/p/project-creator-guide.html'
                >
                  <a
                    className={`
                                        mx-4 flex h-12 flex-row items-center justify-center  space-x-1 rounded-full border border-transparent bg-white
                                            px-4  py-2 font-medium text-neutral-800 shadow-md hover:bg-neutral-100
                                        `}
                    href='/p/project-creator-guide'
                  >
                    Creator guide
                  </a>
                </Link>
              </div>
            </div>
            <div className='space-y-1 py-12'>
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} as={item.href + '.html'}>
                  <a
                    className={classNames(
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6 flex-shrink-0',
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}
