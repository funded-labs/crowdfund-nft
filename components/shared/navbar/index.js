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
                    'py-6 fixed z-20 w-full text-white bg-white',
                    'transition-all duration-300 border-b',
                    hasScrolled ? 'border-gray-200' : 'border-transparent'
                )}>
                <div className='w-full max-w-7xl mx-auto px-4 flex flex-row justify-between items-center'>
                    

                    <nav className='hidden lg:flex space-x-2'>
                        <Link href='/about' passHref as='/about.html'>
                            <a
                                className={`
                                    text-neutral-900 text-sm bg-transparent px-2 py-px hover:text-gray-700
                                    transform transition duration-200 cursor-pointer hover:underline
                                `}>
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
                                    text-neutral-900 text-sm bg-transparent px-2 py-px hover:text-gray-700
                                    transform transition duration-200 cursor-pointer hover:underline
                                `}>
                                Trade
                                <span className="inline-flex ml-1 items-center rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 px-2 py-px text-xs font-medium text-white">
                                New
                            </span>
                            </a>
                            
                        </Link>
                        
                    </nav>
                    <div className='flex flex-row'>
                        <a href='/'>
                            <img
                                src='/assets/logo.png'
                                className='w-25 h-8 hover:scale-105 duration-200 cursor-pointer'
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
