import Modal from '@/components/shared/modal'
import { useBackend } from '@/context/backend'
import { ArrowLeftIcon } from '@heroicons/react/outline'

export default function PromptLoginModal() {
  const { login } = useBackend()

  const renderButton = (name, action, image) => (
    <button
      type='button'
      onClick={action}
      className={`
                mx-auto flex w-1/2 justify-center rounded-full bg-gradient-to-t from-neutral-100 to-white px-4 py-4 font-medium text-neutral-800 shadow-md
            `}
    >
      {name}
      <img className='ml-2 flex w-12' src={image} />
    </button>
  )

  return (
    <Modal show={true} size='sm'>
      <div className='flex w-full flex-col items-center p-4 md:px-10 md:py-10'>
        <div className='mx-auto flex w-full flex-col items-center space-y-4'>
          <img src='/assets/logo.png' className='mt-36 flex w-1/3' />

          {renderButton(
            'Connect Internet Identity',
            login,
            '/assets/IClogo.png',
          )}
          {renderButton(
            'Connect with',
            () => login('nfid'),
            '/assets/nfid-logo.png',
          )}

          <a
            href='/'
            className='font-regular flex items-center pt-8 text-sm text-neutral-500 hover:opacity-80 '
          >
            <ArrowLeftIcon className='h-4 pr-2' />
            Back to homepage
          </a>
        </div>
      </div>
    </Modal>
  )
}
