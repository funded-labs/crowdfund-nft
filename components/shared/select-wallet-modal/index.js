import Modal from '@/components/shared/modal'
import { create } from 'react-modal-promise'
import { useBackend } from '@/context/backend'
import { Principal } from '@dfinity/principal'

const SelectWalletModal = ({ isOpen, onResolve, onReject }) => {
  const { wallets } = useBackend()

  return (
    <Modal show={isOpen} size='sn' width='100%' height='100%'>
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center space-y-4'>
        <img src='/assets/logo.png' className='w-2/3' />
        <p>Select your wallet</p>
        {Object.keys(wallets).map((w) => (
          <button
            key={w}
            type='button'
            className={`mt-5 flex flex-row items-center justify-center space-x-1 rounded rounded border border-transparent bg-slate-600 px-4 py-2 font-medium text-black shadow-xl hover:bg-slate-400`}
            onClick={() =>
              wallets[w]['principal']
                ? onResolve({ wallet: w, id: wallets[w]['principal'] })
                : wallets[w]['getPrincipal']().then((p) =>
                    onResolve({ wallet: w, id: p }),
                  )
            }
          >
            <img src={'/assets/' + w + '.png'} className='h-8' />
            <span className='px-2 font-medium text-white'>
              {'Connect ' + w[0].toUpperCase() + w.slice(1) + ' Wallet'}
            </span>
          </button>
        ))}
        <button onClick={() => onReject('error')} className='hover:opacity-80'>
          Close
        </button>
      </div>
    </Modal>
  )
}

export const selectWalletModalPromise = create(SelectWalletModal)
