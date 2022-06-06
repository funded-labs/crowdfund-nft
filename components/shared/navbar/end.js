import Link from 'next/link'
import { Principal } from '@dfinity/principal'
import { useBackend } from '@/context/backend'

export default function End() {
    const { getPlugPrincipal, plugPrincipal } = useBackend()
    return (
        <div className='flex flex-row space-x-4'>
            <button
                onClick={async () => {
                    if (plugPrincipal)
                        return alert('Plug is already connected.')

                    await getPlugPrincipal()
                    alert('Thank you for connecting Plug.')
                    // GET 1 ICP from wallet

                    // const params = {
                    //     // to: 'lcn6v-rndou-4p3oy-gqxkd-5zmsq-c6qrg-rv746-ojpkq-z6sae-k2gax-tqe',
                    //     to: '60682264a0ee9db1af3b082a6ee183b6b3a44bd180018b19603d76fde450f580',
                    //     amount: 1_000_000,
                    // }
                    // window.ic.plug
                    //     .requestTransfer(params)
                    //     .catch((error) => console.error(error))
                }}>
                <img
                    src='/assets/plug.png'
                    className='w-25 h-8 hover:scale-105 duration-200 cursor-pointer'
                    alt=''
                />
            </button>

            <Link href='/create-a-project' passHref as='/create-a-project.html'>
                <a
                    className={`
                        appearance-none rounded-lg px-2 py-1 bg-blue-600 text-white font-medium
                        text-xs flex flex-col justify-center cursor-pointer hover:bg-blue-700
                    `}
                    href='/create-a-project.html'>
                    Create a project
                </a>
            </Link>
            {/* <div className='hidden lg:inline-flex rounded-lg bg-gray-200 px-2 py-1 flex flex-row text-gray-400 items-center'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                </svg>
                <input className='w-32 bg-transparent focus:outline-none px-1 text-sm' />
            </div> */}
        </div>
    )
}
