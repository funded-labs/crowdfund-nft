export default function Steps() {
  return (
    <section className='hidden w-full bg-gray-100 py-7'>
      <div className='mx-auto flex grid w-full max-w-5xl grid-cols-3 gap-8 px-4 text-sm text-gray-600'>
        <div className='flex w-full flex-row items-start'>
          <div className='mr-2 text-2xl font-bold text-blue-600'>1</div>
          <div className='font-medium'>
            Buy an NFT to support this project, with ownership of this NFT comes
            the perks mentioned in the Campaign description below
          </div>
        </div>

        <div className='flex w-full flex-row items-start'>
          <div className='mr-2 text-2xl font-bold text-blue-600'>2</div>
          <div className='font-medium'>
            You will receive an email notification if this projct gets fully
            funded, where your contractual right to perks will be sent, subject
            to proof of NFT ownership.
          </div>
        </div>

        <div className='flex w-full flex-row items-start'>
          <div className='mr-2 text-2xl font-bold text-blue-600'>3</div>
          <div className='font-medium'>
            Your NFT will be delivered to your MetaMask or PlugWallet, where it
            is your responsibility to keep ownership of this NFT - and your
            right to resell.
          </div>
        </div>
      </div>
    </section>
  )
}
