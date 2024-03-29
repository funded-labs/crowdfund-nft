import { Spinner } from '@/components/shared/loading-spinner'
import Modal from '@/components/shared/modal'
import { createActor } from '@/helpers/createActor'
import { Principal } from '@dfinity/principal'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { create } from 'react-modal-promise'
import QRCode from 'react-qr-code'
import Input from '@/components/forms/input'
import { addMinutes, differenceInSeconds } from 'date-fns'

export const idlFactory = ({ IDL }) => {
  const AccountIdText = IDL.Text
  const Result_1 = IDL.Variant({ ok: IDL.Null, err: IDL.Text })
  const Result_2 = IDL.Nat64
  const Result = IDL.Variant({ ok: AccountIdText, err: IDL.Text })
  return IDL.Service({
    cancelTransfer: IDL.Func([AccountIdText], [], []),
    confirmTransfer: IDL.Func([AccountIdText], [Result_1], []),
    getNewAccountId: IDL.Func(
      [IDL.Principal, IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
      [Result],
      [],
    ),
    accountBalance: IDL.Func([IDL.Text, IDL.Text], [Result_2], []),
  })
}

const BitcoinSupportModal = ({
  isOpen,
  wallet,
  project,
  canisterPrincipal,
  selectedTier,
  onResolve,
  onReject,
}) => {
  const [walletAddress, setWalletAddress] = useState()
  const [loadingLabel, setLoadingLabel] = useState()

  const [refundWalletAddress, setRefundWalletAddress] = useState()
  const [emailAddress, setEmailAddress] = useState()

  const [stepFinishDeadline, setStepFinishDeadline] = useState()
  const [remainingSeconds, setRemainingSeconds] = useState()

  const intervalRef = useRef()
  const countdownIntervalRef = useRef()

  const price8s = useMemo(() => {
    return project.stats?.nftStats[selectedTier]?.priceSatoshi || 0
  }, [project, selectedTier])

  const price = useMemo(() => {
    return price8s / 100000000
  }, [price8s])

  const escrowActor = useMemo(() => {
    return createActor(canisterPrincipal, idlFactory)
  }, [canisterPrincipal])

  const getWalletAddress = useCallback(() => {
    if (!escrowActor || !wallet) return

    if (!refundWalletAddress)
      return alert('Please input BTC refund wallet address')

    setLoadingLabel('Obtaining BTC address')
    escrowActor
      .getNewAccountId(
        Principal.from(wallet.id),
        selectedTier,
        'BTC',
        refundWalletAddress || '',
        emailAddress || '',
      )
      .then((result) => {
        if (result.ok) {
          setWalletAddress(result.ok)
          setStepFinishDeadline(addMinutes(new Date(), 20))
        }
        if (result.err) onReject(result.err)
      })
      .catch(onReject)
      .finally(() => setLoadingLabel())
  }, [escrowActor, wallet, refundWalletAddress, emailAddress])

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      clearInterval(countdownIntervalRef.current)
    }
  }, [intervalRef])

  useEffect(() => {
    clearInterval(countdownIntervalRef.current)

    if (!stepFinishDeadline) return

    countdownIntervalRef.current = setInterval(() => {
      const seconds = differenceInSeconds(stepFinishDeadline, new Date())
      setRemainingSeconds(Math.max(seconds, 0))
    }, 1000)
  }, [stepFinishDeadline])

  useEffect(() => {
    if (remainingSeconds === 0) onReject('Time is up')
  }, [remainingSeconds])

  const setCheckTransactionInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      escrowActor
        .accountBalance(walletAddress, 'BTC')
        .then((result) => {
          const walletBalance = Number(result)
          if (walletBalance == 0) return

          if (parseFloat(walletBalance) >= parseFloat(price8s) * 0.9) {
            onResolve()
            return
          }

          if (walletBalance < price8s) {
            setLoadingLabel(
              `Transfer received, however it was ${
                (price8s - walletBalance) / 100_000_000
              } BTC short. Please send over the remaining amount to the same bitcoin address before the timer runs out`,
            )
          }
        })
        .catch(console.log)
    }, 30 * 1000)
  }, [escrowActor, walletAddress, price8s, setLoadingLabel])

  const markBTCAsPaid = useCallback(() => {
    setLoadingLabel('Marking payment as processed by user')

    escrowActor
      .confirmTransfer(walletAddress)
      .then(() => {
        setLoadingLabel(
          'Waiting for payment confirmation.\nUsually it takes around 10 minutes to receive first confirmation',
        )
        setStepFinishDeadline(addMinutes(new Date(), 119))
        setCheckTransactionInterval()
      })
      .catch(onReject)
  }, [escrowActor, walletAddress])

  const renderGetAddressStep = () => (
    <div className='w-full'>
      <Input
        label='Please input your Bitcoin wallet address:'
        onChange={(e) => setRefundWalletAddress(e.target.value)}
      />
      <div className='mb-6 text-sm text-gray-400'>
        If the crowdfunding project doesn't reach its goal in 30 days, we'll
        refund your pledge to this Bitcoin address, minus transaction fees. Make
        sure to input the correct address as bitcoin transactions are
        irreversible. We shall not be held liable for any errors or mistakes in
        the address provided.
      </div>
      <Input
        label='E-mail:'
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <div className='mb-6 text-sm text-gray-400'>
        We want to make sure we have a way to contact you in case of a problem
        with your transaction. We won't share your email with anyone else.
        Providing your email address is optional.
      </div>

      <button
        disabled={project.stats.endTime <= 0}
        className={`
            flex w-full cursor-pointer appearance-none flex-row justify-center rounded-xl bg-gradient-to-b from-neutral-800 
            to-black py-5 px-4 text-lg font-medium text-white 
            hover:bg-blue-700 focus:outline-none
          `}
        type='button'
        onClick={getWalletAddress}
      >
        <>Continue</>
      </button>
    </div>
  )

  const renderConfirmButton = () => {
    return (
      <button
        disabled={project.stats.endTime <= 0}
        className={`
              flex w-full cursor-pointer appearance-none flex-row justify-center rounded-xl bg-gradient-to-b from-neutral-800 
              to-black py-5 px-4 text-lg font-medium text-white 
              hover:bg-blue-700 focus:outline-none
            `}
        type='button'
        onClick={markBTCAsPaid}
      >
        <>I have transfered funds</>
      </button>
    )
  }

  const renderBtcAddress = () => (
    <div className='flex flex-col items-center space-y-4'>
      <div className='text-center font-medium text-gray-600'>
        Unique BTC Deposit address
      </div>
      {walletAddress && <QRCode value={walletAddress} className='h-40 w-40' />}
      <div className='text-center font-medium text-blue-600'>
        {walletAddress}
      </div>
      <div className='mb-2 text-center text-lg font-bold text-gray-600'>
        Please transfer exact amount of {price} BTC
      </div>
      {renderConfirmButton()}
      <div>
        <div className='mb-1 text-center text-xs text-gray-600'>
          Please note that when sending Bitcoin, you are responsible for
          ensuring that the full amount (including any transaction fees) is sent
          to our specified address
        </div>
        <div className='mb-1 text-center text-xs font-bold text-gray-600'>
          In the event that an insufficient amount is received due to deducted
          fees, we will not be able to credit your account or process your
          transaction
        </div>
        <div className='text-center text-xs text-gray-600'>
          By participating in this crowdfunding project, you understand and
          acknowledge that we shall not be held liable for any errors or
          mistakes in the address provided, including but not limited to sending
          funds to the wrong address.
        </div>
      </div>
    </div>
  )

  const renderLoading = () => (
    <div className='flex flex-col items-center'>
      <div className='h-8 w-8'>
        <Spinner show={true} />
      </div>
      <div className='mt-3 text-center font-medium text-gray-600'>
        {loadingLabel}
      </div>
    </div>
  )

  const pad = (number) => {
    if (number < 10) return `0${number}`
    return `${number}`
  }

  const renderTimer = () => {
    if (!remainingSeconds) return

    const hours = Math.floor(remainingSeconds / 3600)
    const minutes = Math.floor((remainingSeconds - hours * 3600) / 60)
    const seconds = remainingSeconds - hours * 3600 - minutes * 60

    let timer = ''

    if (hours < 1) {
      timer = `${pad(minutes)}:${pad(seconds)}`
    } else {
      timer = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }

    return <div className='mt-2 mb-4 text-4xl font-medium'>{timer}</div>
  }

  return (
    <Modal show={isOpen} size='static' width='100%' height='100%' transparent>
      <div className=' mx-auto h-full w-full rounded-md bg-white p-6'>
        <div className='mx-auto flex flex h-full flex-1 flex-col items-center overflow-auto rounded-md border-2 border-gray-200 p-4'>
          <div className='flex flex-row items-center'>
            <img src='assets/bitcoin.svg' />
            <div className='ml-2 flex flex-row items-end'>
              <div className='text-5xl font-medium'>{price}</div>
              <div className='ml-2 text-2xl text-gray-600'>BTC</div>
            </div>
          </div>
          <div className='flex w-full flex-1 content-center items-center justify-center'>
            {!walletAddress && !loadingLabel && renderGetAddressStep()}
            {!loadingLabel && walletAddress && renderBtcAddress()}
            {loadingLabel && renderLoading()}
          </div>
          {renderTimer()}
        </div>
      </div>
    </Modal>
  )
}

export const bitcoinSupportPromise = create(BitcoinSupportModal)
