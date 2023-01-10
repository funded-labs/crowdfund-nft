import Link from 'next/link'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import End from './end'
import Logo from '@/components/shared/logo'
import Search from './search'

export default function Navbar() {
  const [hasScrolled, setScrolled] = useState(false)

  useEffect(() => {
    const listener = document.addEventListener('scroll', (e) => {
      const scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 41) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    })

    return () => {
      document.removeEventListener('scroll', listener)
    }
  }, [])

  return (
    <>
      <div
        className={classNames(
          'fixed z-20 w-full bg-white py-6 text-white',
          'border-b transition-all duration-300',
          hasScrolled ? 'border-gray-200' : 'border-transparent',
        )}
      >
        <div className='mx-auto flex w-full max-w-7xl flex-row  items-center justify-between px-4 sm:px-0'>
          <nav className='hidden space-x-2 lg:flex'>
            <Link href='/about' passHref as='/about.html'>
              <a
                className={`
                                    transform cursor-pointer bg-transparent px-2 py-px text-sm
                                    text-neutral-900 transition duration-200 hover:text-gray-700 hover:underline
                                `}
              >
                How it works
              </a>
            </Link>
            {/* <Link href='https://medium.com/@luke_71499/crowdfund-nft-an-alternative-to-traditional-crowdfunding-using-nfts-89ef15bd65d8'>
                            <a
                                className={`
                                    text-gray-500 text-sm bg-transparent px-2 py-px hover:text-gray-700
                                    transform transition duration-200 cursor-pointer hover:underline
                                `}
                                target='_blank'>
                                Whitepaper
                            </a>
                        </Link> */}
            <Link href='https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app' passHref>
              <a
                className={`
                                    transform cursor-pointer bg-transparent px-2 py-px text-sm
                                    text-neutral-900 transition duration-200 hover:text-gray-700 hover:underline
                                `}
              >
                Marketplace
                <span className='ml-1 inline-flex items-center rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 px-2 py-px text-xs font-medium text-white'>
                  New
                </span>
              </a>
            </Link>
          </nav>
          <div className='flex flex-row items-center'>
            <a href='/'>
              <img
                src='/assets/logo.png'
                className='w-25 h-10 cursor-pointer duration-200 hover:scale-105'
                alt=''
              />
            </a>
          </div>
          <div className='flex flex-row items-center'>
            <End />
          </div>
        </div>
      </div>
      <div className='h-12' />
    </>
  )
}
