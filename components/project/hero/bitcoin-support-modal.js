import Modal from '@/components/shared/modal'
import { useState } from 'react'
import { create } from 'react-modal-promise'
import QRCode from "react-qr-code"

const BitcoinSupportModal = ({ isOpen, onResolve, onReject } ) => {
  const [walletAddress, setWalletAddress] = useState()
  const [loading, setLoading] = useState()

  const renderFundButton = () => {
    const action = walletAddress ? markBTCAsPaid : backProjectButtonClick
    const actionLabel = walletAddress ? 'I have transfered funds' : 'Fund this project'

    return (
        <button
            disabled={
                loading || project.stats.endTime <= 0
            }
            className={`
            flex flex-row justify-center bg-gradient-to-b from-neutral-800 to-black cursor-pointer text-white text-lg 
            font-medium rounded-xl w-full appearance-none focus:outline-none py-5 
            px-4 hover:bg-blue-700
        `}
            type='button'
            onClick={action}>
            {loading ? (
                <span className='h-5 w-5'>
                    <Spinner show={true} />
                </span>
            ) : launchDate &&
                launchDate !== '' &&
                status === 'approved' ? (
                <>Launching on {launchDate}</>
            ) : (
                <>{actionLabel}</>
            )}
        </button>
    )
}


  return (
    <Modal show={isOpen} size="sn" width="100%" height="100%">
      {walletAddress && <QRCode value={walletAddress}/>}
      {renderFundButton()}
    </Modal>
  )
}

export const bitcoinSupportPromise = create(BitcoinSupportModal)
