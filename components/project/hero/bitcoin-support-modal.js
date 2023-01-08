import { Spinner } from '@/components/shared/loading-spinner'
import Modal from '@/components/shared/modal'
import { createActor } from '@/helpers/createActor'
import { Principal } from '@dfinity/principal'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { create } from 'react-modal-promise'
import QRCode from "react-qr-code"

export const idlFactory = ({ IDL }) => {
  const AccountIdText = IDL.Text
  const Result_1 = IDL.Variant({ ok: IDL.Null, err: IDL.Text })
  const Result_2 = IDL.Nat64
  const Result = IDL.Variant({ ok: AccountIdText, err: IDL.Text })
  return IDL.Service({
    cancelTransfer: IDL.Func([AccountIdText], [], []),
    confirmTransfer: IDL.Func([AccountIdText], [Result_1], []),
    getNewAccountId: IDL.Func([IDL.Principal, IDL.Nat, IDL.Text], [Result], []),
    accountBalance: IDL.Func([IDL.Text, IDL.Text], [Result_2], [])
  })
}

const BitcoinSupportModal = ({ isOpen, wallet, project, canisterPrincipal, selectedTier, onResolve, onReject } ) => {
  const [walletAddress, setWalletAddress] = useState()
  const [loadingLabel, setLoadingLabel] = useState()
  const intervalRef = useRef()

  const price8s = useMemo(() => {
    return project.stats?.nftStats[selectedTier]?.priceSatoshi || 0
  }, [project, selectedTier])

  const price = useMemo(() => {
    return price8s / 100000000
  }, [price8s])

  const escrowActor = useMemo(() => {
    return createActor(canisterPrincipal, idlFactory)
  }, [canisterPrincipal])

  useEffect(() => {
    if (!escrowActor || !wallet) return

    setLoadingLabel('Obtaining BTC address')
    escrowActor
      .getNewAccountId(Principal.from(wallet.id), selectedTier, "BTC")
      .then((result) => {
        if (result.ok) setWalletAddress(result.ok)
        if (result.err) onReject(result.err)
      })
      .catch(onReject)
      .finally(() => setLoadingLabel())

  }, [escrowActor, wallet])

  console.log(walletAddress)

  useEffect(() => {
    return () => { clearInterval(intervalRef.current) }
  }, [intervalRef])

  const setCheckTransactionInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      escrowActor.accountBalance(walletAddress, 'BTC')
        .then(result => {
          const walletBalance = Number(result)
          if (walletBalance == 0) return

          if (walletBalance == price8s) {
            onResolve()
            return
          }

          if (walletBalance < price8s) {
            setLoadingLabel(`Transfer received, however it was ${price8s - walletBalance} BTC short`)
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
        setLoadingLabel('Waiting for payment confirmation.\nUsually it takes around 10 minutes to receive first confirmation')
        setCheckTransactionInterval()
      })
      .catch(onReject)
  }, [escrowActor, walletAddress])

  const renderConfirmButton = () => {
    return (
        <button
            disabled={
              project.stats.endTime <= 0
            }
            className={`
              flex flex-row justify-center bg-gradient-to-b from-neutral-800 to-black cursor-pointer text-white text-lg 
              font-medium rounded-xl w-full appearance-none focus:outline-none py-5 
              px-4 hover:bg-blue-700
            `}
            type='button'
            onClick={markBTCAsPaid}
        >
          <>I have transfered funds</>
        </button>
    )
  }

  const renderBtcAddress = () => (
    <div className='flex flex-col items-center space-y-6'>
      <div className='text-center text-gray-600 font-medium'>BTC DEPOSIT ADDRESS</div>
      {walletAddress && <QRCode value={`bitcoin:${walletAddress}?amount=${price}`} className='h-40 w-40'/>}
      <div className='text-center text-blue-600 font-medium'>{walletAddress}</div>
      <div className='text-center mb-2 text-gray-600 font-bold'>Please transfer exact amount of {price} BTC</div>
    </div>
  )

  const renderLoading = () => (
    <div className='flex flex-col items-center'>
      <div className='h-8 w-8'>
        <Spinner show={true} />
      </div>
      <div className='mt-3 text-center text-gray-600 font-medium'>{loadingLabel}</div>
    </div>
  )

  return (
    <Modal show={isOpen} size="static" width="100%" height="100%" transparent>
      <div className='w-full h-full p-6 rounded-md mx-auto bg-white'>
        <div className="flex flex-1 p-4 border-2 border-gray-200 h-full rounded-md mx-auto flex flex-col items-center">
          <div className='flex flex-row items-center'>
            <img src='assets/bitcoin.svg' />
            <div className='flex flex-row items-end ml-2'>
              <div className='text-5xl font-medium'>{price}</div>
              <div className='text-gray-600 text-2xl ml-2'>BTC</div>
            </div>
          </div>
          <div className='flex flex-1 items-center'>
            {!loadingLabel && walletAddress && renderBtcAddress()}
            {loadingLabel && renderLoading()}
          </div>
          {!loadingLabel && walletAddress && renderConfirmButton()}
        </div>
      </div>
    </Modal>
  )
}

export const bitcoinSupportPromise = create(BitcoinSupportModal)
