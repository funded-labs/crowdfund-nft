import { useEffect, useState } from 'react'
import { Principal } from '@dfinity/principal'
// import { addDays, differenceInCalendarDays } from 'date-fns'
import { useBackend } from '@/context/backend'
import { makeEscrowActor } from '@/ui/service/actor-locator'
// import Modal from '@/components/shared/modal'
import ExampleModal from './example-modal'
import { Spinner } from '@/components/shared/loading-spinner'

export default function Hero({ isLoading, project }) {
    const [loading, setLoading] = useState(false)
    const [loadingStats, setLoadingStats] = useState(false)
    const [showExampleModal, setExampleModal] = useState(false)
    const [stats, setStats] = useState({
        nftNumber: project?.nftVolume ? Number(project.nftVolume) : 0,
        nftPriceE8S: project
            ? Number(BigInt(project?.goal) / project?.nftVolume) * 100_000_000
            : 0,
        endTime: 0,
        nftsSold: 0,
        openSubaccounts: 0,
    })

    const { backendWithAuth, getPlugPrincipal, login } = useBackend()
    const backend = backendWithAuth
    const escrowActor = makeEscrowActor()

    const status = Object.keys(project?.status?.[0] || { submitted: null })[0]

    useEffect(async () => {
        if (!project) return
        const newStats = await escrowActor.getProjectStats(parseInt(project.id))
        if (newStats?.nftNumber > 0)
            setStats({
                nftNumber: Number(newStats.nftNumber),
                nftPriceE8S: Number(newStats.nftPriceE8S),
                endTime: Number(newStats.endTime),
                nftsSold: Number(newStats.nftsSold),
                openSubaccounts: Number(newStats.openSubaccounts),
            })
        else
            setStats({
                nftNumber: Number(project.nftVolume),
                nftPriceE8S:
                    Number(BigInt(project?.goal) / project?.nftVolume) *
                    100_000_000,
                endTime: 0,
                nftsSold: 0,
                openSubaccounts: 0,
            })
    }, [project])

    const handleShare = () => {
        if (!window) return

        const message = encodeURI(`${project.title} on @crowdfundnft`)
        const url = encodeURI(window.location)

        window.location = `https://twitter.com/intent/tweet?text=${message}&url=${url}`
    }

    const backProject = async () => {
        if (stats.endTime === 0) return
        if (!(status === 'whitelist' || status === 'live'))
            return alert('This project is not yet live.')
        if (!backend) {
            if (
                confirm(
                    'You must sign in with internet identity before you can back a project.'
                )
            ) {
                const _backend = await login()
                if (!_backend)
                    return alert(
                        "You'll need to sign in with internet identity to back this project 1."
                    )
                return
            } else {
                return alert(
                    "You'll need to sign in with internet identity to back this project."
                )
            }
        }
        setLoading(true)
        const plugPrincipal = await getPlugPrincipal()
        if (!plugPrincipal) {
            setLoading(false)
            return alert('You must connect Plug in order to back a project.')
        }

        escrowActor
            .requestSubaccount(
                parseInt(project.id),
                Principal.from(plugPrincipal)
            )
            .then((accountid) => {
                console.log(accountid)
                console.log(Number(stats.nftPriceE8S))

                const params = {
                    to: accountid,
                    amount: Number(stats.nftPriceE8S),
                }
                return window.ic.plug
                    .requestTransfer(params)
                    .then((plugResult) => {
                        console.log(plugResult)
                        return escrowActor.confirmTransfer(
                            parseInt(project.id),
                            accountid
                        )
                    })
                    .catch((error) => {
                        console.error(error)
                        return escrowActor.cancelTransfer(
                            parseInt(project.id),
                            accountid
                        )
                    })
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => setLoading(false))
    }

    if (isLoading) {
        return (
            <section className='w-full bg-white'>
                <div className='w-full max-w-5xl mx-auto flex flex-col px-4 py-5'>
                    <div className='animate-pulse bg-gray-200 h-14 w-96 rounded mb-3' />
                    <div className='w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8'>
                        <div className='w-full lg:w-7/12 flex flex-col'>
                            <figure className='w-full h-96 bg-gray-200 animate-pulse rounded-xl mb-1' />
                        </div>

                        <div className='w-full lg:w-5/12 flex flex-col'>
                            <div className='h-3 bg-gray-200 animate-pulse rounded-full relative overflow-hidden' />
                            <div className='w-full flex flex-col py-3'>
                                <div className='bg-gray-200 h-10 animate-pulse w-20 rounded mb-2' />
                                <div className='bg-gray-200 h-6 animate-pulse w-40 rounded' />
                            </div>
                            <div className='w-full flex flex-col py-3'>
                                <div className='bg-gray-200 h-10 animate-pulse w-20 rounded mb-2' />
                                <div className='bg-gray-200 h-6 animate-pulse w-40 rounded' />
                            </div>
                            <div className='w-full flex flex-col py-3'>
                                <div className='bg-gray-200 h-10 animate-pulse w-20 rounded mb-2' />
                                <div className='bg-gray-200 h-6 animate-pulse w-40 rounded' />
                            </div>
                            <div className='w-full py-2'>
                                <div className='rounded-full bg-gray-200 animate-pulse rounded-full w-full h-12' />
                            </div>

                            <div className='w-full flex flex-row space-x-8 items-center'>
                                <div className='w-6/12 p-3'>
                                    <div className='rounded bg-gray-200 animate-pulse h-12' />
                                </div>
                                <div className='w-6/12 flex flex-row justify-between'>
                                    <span className='bg-gray-200 animate-pulse h-5 w-5 rounded-full' />
                                    <span className='bg-gray-200 animate-pulse h-5 w-5 rounded-full' />
                                    <span className='bg-gray-200 animate-pulse h-5 w-5 rounded-full' />
                                    <span className='bg-gray-200 animate-pulse h-5 w-5 rounded-full' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const { title, goal } = project

    const Status = () => {
        switch (status) {
            case 'whitelist':
                return <>open to whitelist</>
            case 'live':
                return <>live</>
            default:
                return <>not live</>
        }
    }

    return (
        <section className='w-full bg-white'>
            <div className='w-full max-w-5xl mx-auto flex flex-col px-4 py-5'>
                <p className='text-2xl font-medium mb-3'>
                    {title}{' '}
                    <span className='text-gray-400 text-sm'>
                        (<Status />)
                    </span>
                </p>
                <div className='w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8'>
                    <div className='w-full lg:w-7/12 flex flex-col'>
                        <figure className='w-full h-96 bg-yellow-500 rounded-xl mb-1 overflow-hidden'>
                            <img
                                src={project.cover}
                                className='w-full h-full object-cover'
                            />
                        </figure>
                    </div>

                    <div className='w-full lg:w-5/12 flex flex-col'>
                        <div className='h-3 bg-gray-200 rounded-full relative overflow-hidden'>
                            <div
                                className={`absolute left-0 top-0 bg-blue-600 h-3 rounded-full w-${(stats.nftNumber >
                                0
                                    ? stats.nftsSold / stats.nftNumber
                                    : 0
                                ).toString()}`}
                            />
                        </div>
                        <div className='w-full flex flex-col py-3'>
                            <p className='text-blue-600 text-2xl font-medium'>
                                {(
                                    (stats.nftsSold * stats.nftPriceE8S) /
                                    100_000_000
                                ).toString()}{' '}
                                ICP
                            </p>
                            <p className='text-gray-400 text-lg'>
                                pledged of{' '}
                                {(
                                    (stats.nftNumber * stats.nftPriceE8S) /
                                    100_000_000
                                ).toString()}{' '}
                                ICP goal
                            </p>
                        </div>
                        <div className='w-full flex flex-col py-3'>
                            <p className='text-blue-600 text-2xl font-medium'>
                                {(stats.nftPriceE8S / 100_000_000).toString()}{' '}
                                ICP
                            </p>
                            <p className='text-gray-400 text-lg'>price</p>
                        </div>
                        <div className='w-full flex flex-col py-3'>
                            <p className='text-blue-600 text-2xl font-medium'>
                                {stats.endTime > 0
                                    ? Math.round(
                                          (stats.endTime - Date.now()) /
                                              (1000 * 60 * 60 * 24)
                                      ).toString()
                                    : '-'}
                            </p>
                            <p className='text-gray-400 text-lg'>days to go</p>
                        </div>
                        <div className='w-full py-2'>
                            <button
                                disabled={loading}
                                className={`
                                    flex flex-row justify-center shadow-lg bg-blue-600 text-white text-sm 
                                    font-medium rounded-full w-full appearance-none focus:outline-none py-3 
                                    px-4 hover:bg-blue-700
                                `}
                                type='button'
                                onClick={backProject}>
                                {loading ? (
                                    <span className='h-5 w-5'>
                                        <Spinner show={true} />
                                    </span>
                                ) : (
                                    <>Back this project</>
                                )}
                            </button>
                            {showExampleModal && (
                                <ExampleModal
                                    onClose={() => setExampleModal(false)}
                                />
                            )}
                        </div>

                        <div className='w-full flex flex-row space-x-8 items-center'>
                            <div className='w-6/12 p-3'>
                                <button
                                    className={`
                                        bg-white border border-gray-300 py-3 w-full px-4 text-gray-900 text-sm
                                        hover:border-blue-600
                                    `}
                                    type='button'
                                    onClick={handleShare}>
                                    Share
                                </button>
                            </div>
                            {/* <div className="w-6/12 flex flex-row justify-between">
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
