import Link from 'next/link'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import End from './end'

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
                    'py-1 pt-3 fixed z-20 w-full text-white bg-white',
                    'transition-all duration-300 border-b',
                    hasScrolled ? 'border-gray-200' : 'border-transparent'
                )}>
                <div className='w-full max-w-5xl mx-auto px-4 flex flex-row justify-between items-center'>
                    <div className='flex flex-row'>
                        <Link href='/' passHref>
                            <img
                                src='/assets/logo.png'
                                className='w-25 h-8 hover:scale-105 duration-200 cursor-pointer'
                                alt=''
                            />
                        </Link>
                    </div>

                    <nav className='hidden lg:flex space-x-10'>
                        <Link href='/about' passHref as='/about.html'>
                            <a
                                className={`
                                    text-gray-500 text-sm bg-transparent px-2 py-px hover:text-gray-700
                                    transform transition duration-200 cursor-pointer hover:underline
                                `}>
                                About
                            </a>
                        </Link>
                        <Link href='https://medium.com/@luke_71499/crowdfund-nft-an-alternative-to-traditional-crowdfunding-using-nfts-89ef15bd65d8'>
                            <a
                                className={`
                                    text-gray-500 text-sm bg-transparent px-2 py-px hover:text-gray-700
                                    transform transition duration-200 cursor-pointer hover:underline
                                `}
                                target='_blank'>
                                Whitepaper
                            </a>
                        </Link>
                        <Link href='mailto:info@crowdfund-nft.com' passHref>
                            <a
                                className={`
                                    text-gray-500 text-sm bg-transparent px-2 py-px hover:text-gray-700
                                    transform transition duration-200 cursor-pointer hover:underline
                                `}>
                                Contact
                            </a>
                        </Link>
                    </nav>

                    <End />
                </div>
            </div>
            <div className='h-16' />
        </>
    )
}
