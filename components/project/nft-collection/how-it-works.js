export default function HowItWorks() {
  return (
    <div
      id='nft-collection-how-it-works'
      className='flex w-full flex-col items-start rounded-2xl bg-white p-8 shadow'
    >
      <p className='text-2xl font-bold text-black'>How It Works</p>

      <div className='flex flex-row space-y-4  font-light text-neutral-600'>
        <div className='flex w-1/2 flex-col'>
          <p className='mt-6'>
            When you back a project, you transfer ICP tokens into an escrow
            wallet owned and controlled by Crowdfund NFT.
          </p>
          <p className='mt-6'>
            The reason for this is that projects do not receive any funds until
            they meet their funding goal.
          </p>
          <p className='mt-6'>
            If a project does not meet its goal in the specified timeframe,
            project backers are reimbursed - they have only lost the transaction
            fee (only 0.001 ICP flat fee per transaction).
          </p>
          <p className='mt-6'>
            If a project does meet its funding goal then funds are released from
            The Crowdfund NFT escrow wallet into the project creator's wallet.
            Similarly, NFTs are delivered to project backers wallets.
          </p>
        </div>
        <div className='flex w-1/2'>
          <img src='/assets/hhh8.png' className='' />
        </div>
      </div>
    </div>
  )
}
