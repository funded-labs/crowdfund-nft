import Link from 'next/link'
import { handleConnect } from '@/helpers/plugwallet'
import { Principal } from '@dfinity/principal'

export default function End() {
    return (
        <div className='flex flex-row space-x-4'>
            <button
                onClick={() =>
                    handleConnect((data) => {
                        console.log(data)
                        console.log(Buffer.from(data.derKey).toString('hex'))
                        console.log(Buffer.from(data.rawKey).toString('hex'))
                        console.log(
                            Principal.fromHex(
                                Buffer.from(data.derKey).toString('hex')
                            ).toText()
                        )
                        console.log(Object.keys(window.ic.plug))
                        window.ic.plug
                            .createAgent()
                            .then(() => {
                                return window.ic.plug.agent.getPrincipal()
                            })
                            .then((principal) => {
                                console.log(
                                    `Plug's user principal Id is ${principal}`
                                )
                            })

                        window.ic.plug.requestBalance().then((balance) => {
                            console.log(balance)
                        })

                        // GET 1 ICP from wallet

                        const params = {
                            to: 'lcn6v-rndou-4p3oy-gqxkd-5zmsq-c6qrg-rv746-ojpkq-z6sae-k2gax-tqe',
                            amount: 100_000,
                        }
                        // window.ic.plug
                        //     .requestTransfer(params)
                        //     .then((result) => console.log(result))
                        //     .catch((error) => console.error(error))
                    })
                }>
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
