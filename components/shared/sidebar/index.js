import { useEffect } from 'react'
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
    const { getPlugPrincipal, plugPrincipalText } = useBackend()

    useEffect(() => {
        if (show === false) return
        document.body.classList.add('overflow-hidden')

        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [show])

    return (
        <>
            <div
                className={classNames(
                    'absolute top-0 left-0 z-30 w-screen h-screen bg-blue-700 opacity-50 duration-200 cursor-pointer',
                    show === false ? 'hidden' : null
                )}
                onClick={onClose}
            />
            <aside
                className={classNames(
                    'z-30 h-full fixed top-0 -right-96 w-96 text-white flex flex-col p-5 pt-16 md:p-10 md:pl-5 transition-all ease-out duration-500',
                    'bg-white',
                    show ? 'mr-96' : null
                )}>
                <div
                    className='absolute top-3 right-3 h-8 w-8 bg-white rounded-full justify-center items-center flex flex-row bg-opacity-50 text-gray-900 cursor-pointer'
                    onClick={onClose}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        className='h-5 w-5 text-gray-900'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </div>

                <div className='flex items-center flex-shrink-0 px-4'>
                    <img
                        className='h-8 w-auto'
                        src='/assets/logo.png'
                        alt='Workflow'
                    />
                </div>
                <div className='mt-5 flex-grow flex flex-col'>
                    <nav
                        className='flex-1 px-2 space-y-2 bg-white'
                        aria-label='Sidebar'>
                        <div className='space-y-1'>
                            <h3
                                className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'
                                id='projects-headline'>
                                Connect your wallet
                            </h3>
                            <h3 className='group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md'>
                                Connect your wallet to buy and sell NFTs from
                                the crowdfund NFT marketplace.
                            </h3>
                            <div className='w-full flex flex-col items-center'>
                                {plugPrincipalText ? (
                                    <div className='flex items-center text-black'>
                                        <img
                                            src='/assets/plug.png'
                                            className='h-8'
                                        />{' '}
                                        <span className='px-2'>
                                            {plugPrincipalText.substring(0, 5)}
                                            ...
                                            {plugPrincipalText.substring(
                                                plugPrincipalText.length - 3
                                            )}
                                        </span>
                                    </div>
                                ) : (
                                    <button
                                        type='button'
                                        className={`
                        flex flex-row space-x-1 justify-center items-center bg-slate-600 border border-transparent rounded rounded font-medium text-black hover:bg-slate-400 px-4 py-2 mt-5 shadow-xl
                    `}
                                        onClick={getPlugPrincipal}>
                                        <img
                                            src='/assets/plug.png'
                                            className='h-8'
                                        />
                                        <span className='px-2 font-medium text-white'>
                                            Connect Plug Wallet
                                        </span>
                                    </button>
                                )}
                                <Link
                                    href='/create-a-project'
                                    passHref
                                    as='/create-a-project.html'>
                                    <a
                                        className={`
                                        flex flex-row space-x-1 justify-center items-center bg-blue-600 border border-transparent rounded rounded font-medium hover:bg-blue-400 px-4 py-2 mt-5 shadow-xl
                                            py-2 mx-4 justify-center items-center text-white h-12
                                        `}
                                        href='/create-a-project.html'>
                                        Create a project
                                    </a>
                                </Link>
                            </div>
                            <div className='relative'>
                                <div
                                    className='absolute inset-1 mt-4 flex items-center'
                                    aria-hidden='true'>
                                    <div className='w-full border-t border-gray-300' />
                                </div>
                            </div>
                        </div>
                        <div className='py-12 space-y-1'>
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    as={item.href + '.html'}>
                                    <a
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}>
                                        <item.icon
                                            className={classNames(
                                                item.current
                                                    ? 'text-gray-500'
                                                    : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6'
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
