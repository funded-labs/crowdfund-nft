import Modal from '@/components/shared/modal'
import { create } from 'react-modal-promise'
import { useBackend } from '@/context/backend'
import { Principal } from '@dfinity/principal'

const SelectWalletModal = ({ isOpen, onResolve, onReject } ) => {
    const { wallets } = useBackend()

    return (
        <Modal show={isOpen} size="sn" width="100%" height="100%">
            <div className="w-full h-full mx-auto flex flex-col items-center justify-center space-y-4">
                <img src="/assets/logo.png" className="w-2/3" />
                <p>Select your wallet</p>
                {Object.keys(wallets).map(w => (
                    <button
                        key={w}
                        type='button'
                        className={`flex flex-row space-x-1 justify-center items-center bg-slate-600 border border-transparent rounded rounded font-medium text-black hover:bg-slate-400 px-4 py-2 mt-5 shadow-xl`}
                        onClick={() => wallets[w]['principal'] ?
                            onResolve({'wallet': w, 'id': wallets[w]['principal']}) :
                            wallets[w]['getPrincipal']().then(p => onResolve({'wallet': w, 'id': p}))
                        }
                    >
                        <img
                            src={'/assets/' + w + '.png'}
                            className='h-8'
                        />
                        <span className='px-2 font-medium text-white'>
                            {'Connect ' + w[0].toUpperCase() + w.slice(1) + ' Wallet'}
                        </span>
                    </button>
                ))}
                <button
                    onClick={() => onReject('error')}
                    className="hover:opacity-80"
                >
                    Close
                </button>
            </div>
        </Modal>
    )
}

export const selectWalletModalPromise = create(SelectWalletModal)