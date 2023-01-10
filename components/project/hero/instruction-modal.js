import Modal from '@/components/shared/modal'
import { useBackend } from '@/context/backend'
import { useState } from 'react'

export default function InstructionModal({ onClose }) {
  // const { login, getPlugPrincipal } = useBackend()
  const [showConnectWallet, setShowConnectWallet] = useState(false)

  const handleLogin = async () => {
    onClose()
    // await login()

    // setShowConnectWallet(true)
  }

  // const handleConnectWallet = async () => {
  //     await getPlugPrincipal()

  //     onClose()
  // }
  return (
    <Modal show={true} size='sm'>
      <div className='flex h-full w-full flex-col items-center justify-center p-4 md:px-10 md:py-10'>
        <div className='mx-auto flex w-full flex-col items-center space-y-4'>
          <div className='w-full text-left text-gray-600'>
            You'll need to connect your wallet before you can back this project.
            The following screens will guide you to connect your Plug Wallet.
            Then, you'll be able to back this project.
            <br />
            <br />
            If the project reaches its funding goal, your NFT will be
            transferred to your wallet - if the project does not get fully
            funded, you will be reimbursed.
          </div>

          <div className='flex w-full flex-col items-center'>
            {showConnectWallet === false && (
              <button
                className={`
                                cursor-pointer rounded-full bg-blue-600 px-12 py-3 text-sm font-semibold
                                uppercase text-white focus:outline-none
                            `}
                type='button'
                onClick={handleLogin}
              >
                I understand
              </button>
            )}
            {showConnectWallet === true && (
              <button
                className={`
                                cursor-pointer rounded-full bg-blue-600 px-12 py-3 text-sm font-semibold
                                uppercase text-white focus:outline-none
                            `}
                type='button'
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
