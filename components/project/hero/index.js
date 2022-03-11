import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Principal } from '@dfinity/principal'
// import { addDays, differenceInCalendarDays } from 'date-fns'
import { useBackend } from '@/context/backend'
import { makeEscrowActor } from '@/ui/service/actor-locator'
// import Modal from '@/components/shared/modal'
// import ExampleModal from './example-modal'
import { Spinner } from '@/components/shared/loading-spinner'
import InstructionModal from './instruction-modal'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Hero({ isLoading, project }) {
    const router = useRouter()
    const [hasShownInstructions, setHasShownInstructions] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('')
    // const [loadingStats, setLoadingStats] = useState(false)
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

    const [launchDate, setLaunchDate] = useState(null)

    const [showCaptcha, setShowCaptcha] = useState(false)
    const [hasPassedCaptcha, setHasPassedCaptcha] = useState(false)

    const { backend, getPlugPrincipal } = useBackend()
    const escrowActor = makeEscrowActor()

    const status = Object.keys(project?.status?.[0] || { submitted: null })[0]

    useEffect(async () => {
        if (!project) return
        if (launchDate === null) {
            const ld = await backend.getLaunchDate(project.id)
            if (Array.isArray(ld)) setLaunchDate(ld[0])
        }
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

    const backProjectButtonClick = () => {
        if (stats.endTime === 0) return

        if (!(status === 'whitelist' || status === 'live'))
            return alert('This project is not yet live.')

        if (!hasPassedCaptcha) return setShowCaptcha(true)

        if (hasShownInstructions) return backProject()
        setExampleModal(true)
    }

    const backProject = async () => {
        setLoading(true)
        setLoadingMessage('Getting Plug Wallet principal...')
        const plugPrincipal = await getPlugPrincipal()
        if (!plugPrincipal) {
            setLoading(false)
            return alert('You must connect Plug in order to back a project.')
        }

        setLoadingMessage('Loading escrow account id...')
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
                setLoadingMessage('Requesting transfer from Plug...')
                return window.ic.plug
                    .requestTransfer(params)
                    .then((plugResult) => {
                        console.log(plugResult)
                        setLoadingMessage('Confirming transfer...')
                        return escrowActor
                            .confirmTransfer(parseInt(project.id), accountid)
                            .then(() =>
                                router.push(
                                    '/success?projectId=' + project.id,
                                    '/success.html?projectId=' + project.id
                                )
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
                if (error.message === 'Principal is not on whitelist.') {
                    return alert(
                        'Your Plug Wallet is not on the whitelist. Please come back when the project is open to everyone.'
                    )
                } else if (
                    error.message === 'Project is past crowdfund close date.'
                ) {
                    return alert(
                        'This project is past its crowdfund close date. Please refer to our home page for other project to fund.'
                    )
                } else if (
                    error.message ===
                    'Principal already has an uncancelled subaccount.'
                ) {
                    return alert(
                        'You have already backed this project. This project only allows to be backed once per user.'
                    )
                } else if (error.message === 'Not enough subaccounts.') {
                    return alert(
                        'This project is fully funded, or enough people are currently completing payments to fund it fully.'
                    )
                } else {
                    return alert(error.message)
                }
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

    const { title, twitterLink, discordLink } = project

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

    console.log(stats)
    console.log((stats.nftsSold * stats.nftPriceE8S) / 100_000_000)
    console.log((stats.nftNumber * stats.nftPriceE8S) / 100_000_000)
    console.log(
        Math.min(
            (stats.nftsSold * stats.nftPriceE8S) / 100_000_000,
            (stats.nftNumber * stats.nftPriceE8S) / 100_000_000
        )
    )

    console.log(JSON.stringify(launchDate))

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
                                className={`absolute left-0 top-0 bg-blue-600 h-3 rounded-full`}
                                style={{
                                    width: `${(stats.nftNumber > 0
                                        ? (stats.nftsSold / stats.nftNumber) *
                                          100
                                        : 0
                                    ).toString()}%`,
                                }}
                            />
                        </div>
                        <div className='w-full flex flex-col py-3'>
                            <p className='text-blue-600 text-2xl font-medium'>
                                {Math.min(
                                    (stats.nftsSold * stats.nftPriceE8S) /
                                        100_000_000,
                                    (stats.nftNumber * stats.nftPriceE8S) /
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
                            <p className='text-gray-400 text-lg'>
                                price per NFT
                            </p>
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
                            <div style={{ textAlign: 'center' }}>
                                {loading && loadingMessage}
                            </div>
                            {stats.endTime > 0 &&
                            stats.nftsSold >= stats.nftNumber ? (
                                <div style={{ textAlign: 'center' }}>
                                    This project is now fully funded!
                                </div>
                            ) : (
                                <button
                                    disabled={loading || stats.endTime <= 0}
                                    className={`
                                    flex flex-row justify-center shadow-lg bg-blue-600 text-white text-sm 
                                    font-medium rounded-full w-full appearance-none focus:outline-none py-3 
                                    px-4 hover:bg-blue-700
                                `}
                                    type='button'
                                    onClick={backProjectButtonClick}>
                                    {loading ? (
                                        <span className='h-5 w-5'>
                                            <Spinner show={true} />
                                        </span>
                                    ) : launchDate !== null &&
                                      status === 'approved' ? (
                                        <>Launching on {launchDate}</>
                                    ) : (
                                        <>Crowdfund this project</>
                                    )}
                                </button>
                            )}
                            {showCaptcha && !hasPassedCaptcha && (
                                <ReCAPTCHA
                                    sitekey='6LfzZaceAAAAALKgbi6cblAmKHmIGmzp4CGJ-xEt'
                                    onChange={() => {
                                        console.log('captcha successful')
                                        setHasPassedCaptcha(true)
                                        if (hasShownInstructions)
                                            return backProject()
                                        setExampleModal(true)
                                    }}
                                />
                            )}
                            {showExampleModal && (
                                <InstructionModal
                                    onClose={() => {
                                        setExampleModal(false)
                                        setHasShownInstructions(true)
                                        backProject()
                                    }}
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
                            <div className='w-6/12 flex flex-row space-x-1 justify-start'>
                                {twitterLink && (
                                    <a
                                        className={`
                                            py-2 px-2 text-gray-900 text-sm hover:text-blue-600 hover:scale-105 duration-200
                                            cursor-pointer
                                        `}
                                        href={twitterLink}
                                        target='_blank'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='currentColor'
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'>
                                            <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                                        </svg>
                                    </a>
                                )}
                                {discordLink && (
                                    <a
                                        href={discordLink}
                                        target='_blank'
                                        className={`
                                            py-2 px-2 text-gray-900 text-sm hover:text-blue-600 hover:scale-105 duration-200
                                            cursor-pointer
                                        `}>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='currentColor'
                                            width='24'
                                            height='24'
                                            viewBox='0 0 71 55'>
                                            <path d='M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z' />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
