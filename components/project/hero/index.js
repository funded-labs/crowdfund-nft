import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Principal } from '@dfinity/principal'
import { Actor, HttpAgent } from '@dfinity/agent'
import { selectWalletModalPromise } from '../../shared/select-wallet-modal'
import ledgerIdlFactory from '../../../idls/nns_ledger.did'
import colors from 'tailwindcss/colors'
import { AccountIdentifier } from '@dfinity/nns'
import { handleStoicConnect } from '@/helpers/wallets'
import { useBackend } from '@/context/backend'
import { makeEscrowActor } from '@/ui/service/actor-locator'
import { Spinner } from '@/components/shared/loading-spinner'
import InstructionModal from './instruction-modal'
import ReCAPTCHA from 'react-google-recaptcha'
import PricePerNFT from './price-per-nft'
import ViewOnMarketplace from '../view-on-marketplace'
import { bitcoinSupportPromise } from './bitcoin-support-modal'
import { createActor } from '@/helpers/createActor'

export const v1Factory = ({ IDL }) => {
  const AccountIdText = IDL.Text
  const Result_1 = IDL.Variant({ ok: IDL.Null, err: IDL.Text })
  const Result = IDL.Variant({ ok: AccountIdText, err: IDL.Text })
  return IDL.Service({
    cancelTransfer: IDL.Func([AccountIdText], [], []),
    confirmTransfer: IDL.Func([AccountIdText], [Result_1], []),
    getNewAccountId: IDL.Func([IDL.Principal], [Result], []),
  })
}

export const v2Factory = ({ IDL }) => {
  const AccountIdText = IDL.Text
  const Result_1 = IDL.Variant({ ok: IDL.Null, err: IDL.Text })
  const Result = IDL.Variant({ ok: AccountIdText, err: IDL.Text })
  return IDL.Service({
    cancelTransfer: IDL.Func([AccountIdText], [], []),
    confirmTransfer: IDL.Func([AccountIdText], [Result_1], []),
    getNewAccountId: IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
  })
}

export const v3Factory = ({ IDL }) => {
  const AccountIdText = IDL.Text
  const Result_1 = IDL.Variant({ ok: IDL.Null, err: IDL.Text })
  const Result = IDL.Variant({ ok: AccountIdText, err: IDL.Text })
  return IDL.Service({
    cancelTransfer: IDL.Func([AccountIdText], [], []),
    confirmTransfer: IDL.Func([AccountIdText], [Result_1], []),
    getNewAccountId: IDL.Func(
      [IDL.Principal, IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
      [Result],
      [],
    ),
  })
}

export default function Hero({ isLoading, project, adminView }) {
  const router = useRouter()
  const [now, setNow] = useState(Date.now())
  const [hasShownInstructions, setHasShownInstructions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  // const [loadingStats, setLoadingStats] = useState(false)
  const [showExampleModal, setExampleModal] = useState(false)

  const selectedTierState = useState(0)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [hasPassedCaptcha, setHasPassedCaptcha] = useState(false)

  const { backend } = useBackend()
  const escrowActor = makeEscrowActor()

  const currency =
    Object.keys(project?.fundingType?.[0]?.[0] || {})?.[0]?.toUpperCase() ||
    'ICP'

  useEffect(() => {
    setInterval(() => setNow(Date.now()), 1000)
  }, [])

  const { data: launchDate } = useQuery(['launchDate', project?.id], () => {
    return backend
      .getLaunchDate(project.id)
      .then((r) => (r !== undefined && Array.isArray(r) ? r[0] : undefined))
  })

  const status = Object.keys(project?.status?.[0] || { archived: null })[0]

  const handleShare = () => {
    if (!window) return

    const message = encodeURI(`${project.title} on @crowdfundnft`)
    const url = encodeURI(window.location)

    window.location = `https://twitter.com/intent/tweet?text=${message}&url=${url}`
  }

  const backProjectButtonClick = () => {
    if (project.stats.endTime === 0) return

    if (!(status === 'whitelist' || status === 'live'))
      return alert('This project is not yet live.')

    if (!hasPassedCaptcha) return setShowCaptcha(true)

    if (hasShownInstructions) return backProject()
    setExampleModal(true)
  }

  const backProject = async () => {
    setLoading(true)
    setLoadingMessage('Getting Wallet principal...')

    const wallet = await selectWalletModalPromise().catch((err) => '')
    if (!wallet) {
      setLoading(false)
      return alert('You must connect a wallet in order to back a project.')
    }

    setLoadingMessage('Loading escrow canister id...')
    const canisterPrincipal = await escrowActor
      .getProjectEscrowCanisterPrincipal(+project.id)
      .catch((error) => {
        console.error(error)
        setLoading(false)
        return alert(
          'Something went wrong loading the escrow canister. This project may not have one yet.',
        )
      })
    if (!Array.isArray(canisterPrincipal) || canisterPrincipal.length < 1) {
      setLoading(false)
      throw new Error('Invalid canister principal')
    }
    let actor
    let isNewActor = true
    let requiresCurrencyParam = false

    try {
      actor = createActor(canisterPrincipal[0], v3Factory)
      requiresCurrencyParam = true
    } catch (e) {
      try {
        actor = createActor(canisterPrincipal[1], v2Factory)
      } catch (e) {
        actor = createActor(canisterPrincipal[0], v1Factory)
        isNewActor = false
      }
    }

    if (currency === 'BTC') {
      bitcoinSupportPromise({
        wallet,
        project,
        canisterPrincipal: canisterPrincipal[0],
        selectedTier: selectedTierState[0],
      })
        .then(() => {
          router.push(
            '/success?projectId=' + project.id,
            '/success.html?projectId=' + project.id,
          )
        })
        .catch((error) => {
          alert(error)
          console.log(error)
        })
        .finally(() => setLoading(false))

      return
    }

    setLoadingMessage('Requesting new account id...')
    let accountIdPromise = isNewActor
      ? requiresCurrencyParam
        ? actor.getNewAccountId(
            Principal.from(wallet.id),
            selectedTierState[0],
            'ICP',
            '',
            '',
          )
        : actor.getNewAccountId(Principal.from(wallet.id), selectedTierState[0])
      : actor.getNewAccountId(Principal.from(wallet.id))

    const accountIdResult = await accountIdPromise
    if (accountIdResult.hasOwnProperty('err')) {
      setLoading(false)
      return alert(accountIdResult.err)
    }
    const accountid = accountIdResult.ok

    setLoadingMessage('Requesting transfer from ' + wallet.wallet + '...')
    let res
    if (wallet.wallet === 'plug') {
      const params = {
        to: accountid,
        amount: Number(project.stats.nftStats[selectedTierState[0]].priceE8S),
      }
      res = await window.ic.plug.requestTransfer(params).catch((error) => {
        console.error(error)
        setLoading(false)
        return { Err: error }
      })
    } else if (wallet.wallet === 'infinity' || wallet.wallet === 'stoic') {
      let accountIdBlob = AccountIdentifier.fromHex(accountid)
      accountIdBlob = accountIdBlob.bytes
      accountIdBlob = Object.keys(accountIdBlob).map((m) => accountIdBlob[m])
      const transferArgs = {
        to: accountIdBlob,
        fee: { e8s: 10000 },
        amount: {
          e8s: Number(project.stats.nftStats[selectedTierState[0]].priceE8S),
        },
        memo: Math.floor(Math.random() * 1000),
        from_subaccount: [], // For now, using default subaccount to handle ICP
        created_at_time: [],
      }
      if (wallet.wallet === 'infinity') {
        const TRANSFER_ICP_TX = {
          idl: ledgerIdlFactory,
          canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
          methodName: 'transfer',
          args: [transferArgs],
          onSuccess: async (r) => {
            res = r
          },
          onFail: (r) => {
            res = r
          },
        }
        await window.ic.infinityWallet
          .batchTransactions([TRANSFER_ICP_TX])
          .catch((error) => {
            console.error(error)
            setLoading(false)
            res = { Err: error }
          })
      } else if (wallet.wallet === 'stoic') {
        const identity = await handleStoicConnect()
        if (identity === false) {
          setLoading(false)
          return alert('You must connect stoic wallet')
        }
        const ledgerActor = Actor.createActor(ledgerIdlFactory, {
          agent: new HttpAgent({
            identity,
          }),
          canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
        })
        res = await ledgerActor.transfer(transferArgs).catch((error) => {
          console.error(error)
          setLoading(false)
          return { Err: error }
        })
      }
    }

    if (res.Err || res.err) {
      setLoading(false)
      if (res.hasOwnProperty('Err') && res.Err.InsufficientFunds) {
        alert('Insufficient Funds')
      }
      console.log(res.hasOwnProperty('Err') ? res.Err : res.Err)
      return actor.cancelTransfer(accountid)
    }
    setLoadingMessage('Confirming transfer...')
    return actor.confirmTransfer(accountid).then((res) => {
      if (res.hasOwnProperty('err')) return alert(res.err)
      setLoading(false)
      router.push(
        '/success?projectId=' + project.id,
        '/success.html?projectId=' + project.id,
      )
    })
  }

  if (isLoading) {
    return (
      <section className='w-full bg-white'>
        <div className='mx-auto flex w-full max-w-7xl flex-col px-4 py-5'>
          <div className='mb-3 h-14 w-96 animate-pulse rounded bg-gray-200' />
          <div className='flex w-full flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8'>
            <div className='flex w-full flex-col lg:w-7/12'>
              <figure className='mb-1 h-96 w-full animate-pulse rounded-xl bg-gray-200' />
            </div>

            <div className='flex w-full flex-col lg:w-5/12'>
              <div className='relative h-3 animate-pulse overflow-hidden rounded-full bg-gray-200' />
              <div className='flex w-full flex-col py-3'>
                <div className='mb-2 h-10 w-20 animate-pulse rounded bg-gray-200' />
                <div className='h-6 w-40 animate-pulse rounded bg-gray-200' />
              </div>
              <div className='flex w-full flex-col py-3'>
                <div className='mb-2 h-10 w-20 animate-pulse rounded bg-gray-200' />
                <div className='h-6 w-40 animate-pulse rounded bg-gray-200' />
              </div>
              <div className='flex w-full flex-col py-3'>
                <div className='mb-2 h-10 w-20 animate-pulse rounded bg-gray-200' />
                <div className='h-6 w-40 animate-pulse rounded bg-gray-200' />
              </div>
              <div className='w-full py-2'>
                <div className='h-12 w-full animate-pulse rounded-full rounded-full bg-gray-200' />
              </div>

              <div className='flex w-full flex-row items-center space-x-8'>
                <div className='w-6/12 p-3'>
                  <div className='h-12 animate-pulse rounded bg-gray-200' />
                </div>
                <div className='flex w-6/12 flex-row justify-between'>
                  <span className='h-5 w-5 animate-pulse rounded-full bg-gray-200' />
                  <span className='h-5 w-5 animate-pulse rounded-full bg-gray-200' />
                  <span className='h-5 w-5 animate-pulse rounded-full bg-gray-200' />
                  <span className='h-5 w-5 animate-pulse rounded-full bg-gray-200' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const { title, twitterLink, discordLink } = project

  const customWLprojects = ['35', '40', '41', '43']

  const Status = () => {
    switch (status) {
      case 'whitelist':
        return project.stats.endTime > 0 ? (
          <>
            Open to whitelist. Public sale in{' '}
            {remainingTimeString(
              project.stats.endTime -
                30 * 1000 * 24 * 60 * 60 +
                (customWLprojects.includes(project.id) ? 3 : 2) *
                  1000 *
                  60 *
                  60,
            )}
          </>
        ) : (
          <>open to whitelist</>
        )
      case 'live':
        return <>live</>
      case 'archived':
        return <>archived</>
      default:
        return project.stats.endTime > 0 ? (
          <>
            Not live. Whitelist in{' '}
            {remainingTimeString(
              project.stats.endTime - 30 * 1000 * 24 * 60 * 60,
            )}
          </>
        ) : (
          <>not live</>
        )
    }
  }

  const goal = (
    project?.stats?.nftStats ?? [{ number: 0, priceE8S: 0 }]
  ).reduce(
    (acc, cur) =>
      acc + cur.number * (cur.priceE8S ? cur.priceE8S : cur.priceSatoshi),
    0,
  )
  const pledged = (
    project?.stats?.nftStats ?? [{ sold: 0, priceE8S: 0 }]
  ).reduce(
    (acc, cur) =>
      acc + cur.sold * (cur.priceE8S ? cur.priceE8S : cur.priceSatoshi),
    0,
  )
  const oversellAmount = (project.stats.nftStats ?? [{ oversellNumber: 0 }])
    .map(
      ({ priceE8S, priceSatoshi, oversellNumber }) =>
        oversellNumber * (priceE8S ? priceE8S : priceSatoshi),
    )
    .reduce((a, b) => a + b)

  const remainingTimeString = (endTime) => {
    const diff = endTime - now
    const days = Math.floor(diff / 1000 / 60 / 60 / 24)
    const hours = Math.floor(diff / 1000 / 60 / 60) - days * 24
    const minutes = Math.floor(diff / 1000 / 60 - days * 24 * 60) - hours * 60
    const seconds =
      Math.floor(diff / 1000 - days * 24 * 60 * 60 - hours * 60 * 60) -
      minutes * 60
    return `${days > 0 ? `${days}d ` : ''}${hours}h ${
      minutes < 10 ? '0' : ''
    }${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`
  }

  function renderProgressBar() {
    const oversellAvailable = !isNaN(oversellAmount)

    let goalPercentageTotal = 0
    let oversellPercentagePledged = 0
    let pledgedPercentageTotal = 0

    if (oversellAvailable) {
      const oversellPercentageTotal = (oversellAmount / goal) * 100
      goalPercentageTotal = 100 - (oversellAmount / goal) * 100
      oversellPercentagePledged =
        pledged >= goal
          ? ((pledged - goal) / ((goal * oversellPercentageTotal) / 100)) *
            oversellPercentageTotal
          : 0
      pledgedPercentageTotal =
        status === 'fully_funded'
          ? goalPercentageTotal
          : (pledged / goal) * goalPercentageTotal
    } else {
      pledgedPercentageTotal =
        status === 'fully_funded' ? 100 : (pledged / goal) * 100
    }

    return (
      <>
        <div className='relative h-3 overflow-hidden rounded-full bg-gray-200'>
          <div
            className={
              'absolute left-0 top-0 h-3 rounded-l-full bg-gradient-to-r from-orange-400 to-pink-500 to-purple-600'
            }
            style={{
              width: `${pledgedPercentageTotal}%`,
            }}
          />
          <div
            className={
              'absolute left-0 top-0 h-3 rounded-r-full bg-gradient-to-r from-green-400 to-green-500 to-green-600'
            }
            style={{
              borderLeft:
                pledged >= goal
                  ? `1px solid ${colors.gray[100]}`
                  : `1px solid ${colors.gray[400]}`,
              marginLeft: `${goalPercentageTotal}%`,
              width: `${oversellPercentagePledged}%`,
            }}
          />
        </div>
        {oversellAvailable && (
          <div
            style={{ paddingLeft: `calc(${goalPercentageTotal}% - 6px)` }}
            className='bottom-arrow'
          />
        )}
      </>
    )
  }

  const currencyIcon = () => {
    const className = 'h-6 inline-block mr-3'
    return currency === 'BTC' ? (
      <img src='assets/bitcoin.svg' className={className} />
    ) : (
      <img src='/assets/IClogo.png' className={className} />
    )
  }

  return (
    <>
      <section className='w-full bg-white'>
        <div className='mx-auto flex w-full max-w-7xl flex-col px-4 py-16'>
          <p className='mb-2 text-5xl font-medium'>
            {title}{' '}
            <span className='text-lg uppercase text-gray-400'>
              (<Status />)
            </span>
          </p>
          {!adminView && (
            <div className='mb-2 flex w-full flex-row items-center space-x-8'>
              <div className='flex w-6/12 flex-row justify-start space-x-1'>
                {twitterLink && (
                  <a
                    className={`
                                            cursor-pointer py-2 px-2 text-sm text-gray-900 duration-200 hover:scale-105
                                            hover:text-blue-600
                                        `}
                    href={twitterLink}
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
                )}
                {discordLink && (
                  <a
                    href={discordLink}
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
                )}
              </div>
            </div>
          )}
          <div className='flex w-full flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8'>
            <div className='flex w-full flex-col lg:w-8/12'>
              <figure className='mb-1 h-96 w-full overflow-hidden rounded-xl bg-yellow-500'>
                <img
                  src={project.cover}
                  className='h-full w-full object-cover'
                />
              </figure>
            </div>

            <div className='flex w-full flex-col rounded-lg bg-white px-8 shadow-lg lg:w-4/12'>
              <div className='flex w-full flex-col py-3'>
                <p className='flex items-center text-3xl font-medium text-blue-600'>
                  {currencyIcon()}
                  {threeDecimals(
                    threeDecimals(pledged / 100_000_000).toString(),
                  ) +
                    ' ' +
                    currency}
                </p>
                <p className='text-md font-light text-gray-400'>
                  pledged of {threeDecimals(goal / 100_000_000).toString()}{' '}
                  {currency} goal
                </p>
              </div>
              {renderProgressBar()}
              <div className='flex w-full grid-cols-2 flex-row space-x-12 py-3'>
                <div className=''>
                  <p className='text-2xl font-medium text-blue-600'>
                    {status === 'fully_funded'
                      ? 0
                      : (status === 'whitelist' || status === 'live') &&
                        project?.stats?.endTime > 0
                      ? remainingTimeString(
                          Math.max(project.stats.endTime, Date.now()),
                        )
                      : '- --:--:--'}
                  </p>
                  <p className='text-md font-light text-gray-400'>to go</p>
                </div>
              </div>
              <div className='flex'>
                <PricePerNFT
                  stats={project.stats}
                  currency={currency}
                  {...{ selectedTierState }}
                />
              </div>

              {(status === 'approved' || status === 'whitelist') &&
                project?.stats?.endTime > 0 && (
                  <div className='mt-2 text-center text-xs'>
                    {status === 'approved' ? (
                      <>
                        Whitelist opens in{' '}
                        {remainingTimeString(
                          project.stats.endTime - 30 * 1000 * 60 * 60 * 24,
                        )}
                      </>
                    ) : (
                      <>
                        Whitelist open! Public release starts in{' '}
                        {remainingTimeString(
                          project.stats.endTime -
                            30 * 1000 * 60 * 60 * 24 +
                            (customWLprojects.includes(project.id) ? 3 : 2) *
                              1000 *
                              60 *
                              60,
                        )}
                      </>
                    )}
                  </div>
                )}
              {/* project.stats} /> */}
              <div className='w-full py-2'>
                <div style={{ textAlign: 'center' }}>
                  {loading && loadingMessage}
                </div>
                {status === 'fully_funded' ||
                (project.stats.endTime > 0 &&
                  pledged >= goal + oversellAmount) ? (
                  <div className='flex flex-col space-y-2'>
                    <p className='text-center'>
                      This project is now fully funded!
                    </p>
                    <ViewOnMarketplace project={project} />
                  </div>
                ) : status === 'archived' ? (
                  <div className='flex flex-col space-y-2'>
                    <p className='text-center'>
                      This project did not reach its funding goal.
                    </p>
                  </div>
                ) : (
                  !adminView && (
                    <button
                      disabled={loading || project.stats.endTime <= 0}
                      className={`
                                    flex w-full cursor-pointer appearance-none flex-row justify-center rounded-xl bg-gradient-to-b from-neutral-800 
                                    to-black py-5 px-4 text-lg font-medium text-white 
                                    hover:bg-blue-700 focus:outline-none
                                `}
                      type='button'
                      onClick={backProjectButtonClick}
                    >
                      {loading ? (
                        <span className='h-5 w-5'>
                          <Spinner show={true} />
                        </span>
                      ) : launchDate &&
                        launchDate !== '' &&
                        status === 'approved' ? (
                        <>Launching on {launchDate}</>
                      ) : pledged >= goal ? (
                        <>Overfund this project</>
                      ) : (
                        <>Fund this project</>
                      )}
                    </button>
                  )
                )}
                {showCaptcha && !hasPassedCaptcha && (
                  <ReCAPTCHA
                    sitekey='6LeV7ysjAAAAAC2Jx7s2pNpbpXjVp0xhpOiM29P0'
                    onChange={() => {
                      setHasPassedCaptcha(true)
                      if (hasShownInstructions) return backProject()
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
                <div className='w-full py-5'>
                  <button
                    className={`
                                    flex w-full appearance-none  flex-row justify-center rounded-lg 
                                    bg-blue-50 py-5 px-4 text-lg font-medium text-blue-700 
                                    hover:bg-white focus:outline-none
                                    `}
                    type='button'
                    onClick={handleShare}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      width='30'
                      height='30'
                      viewBox='0 0 24 24'
                    >
                      <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                    </svg>
                    <p className='ml-4'>Share on Twitter</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const threeDecimals = (number) => Math.round(number * 1000) / 1000
