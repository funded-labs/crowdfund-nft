export default function HowItWorks() {
  return (
    <section className='w-full bg-blue-600 py-10 text-white'>
      <div className='mx-auto flex w-full max-w-5xl flex-col'>
        <div className='w-full py-3 text-center text-3xl font-semibold'>
          How CrowdFund NFT works?
        </div>
        <p className='w-full text-center text-sm'>
          Crowdfunding on the Blockchain, using the Internet Computer.
        </p>
        <div className='grid w-full grid-cols-1 gap-12 py-8 md:grid-cols-3'>
          <div className='flex w-full flex-col items-center'>
            <img src='/assets/work_thumb_1.png' className='h-20 w-20' />
            <p className='mt-2 text-2xl font-semibold'>
              Log in with Internet Identity
            </p>
            <p className='text-center'>
              Both project backers and creators can access the platform with
              internet identity, and connect with PlugWallet.
            </p>
          </div>

          <div className='flex w-full flex-col items-center'>
            <img src='/assets/work_thumb_2.png' className='h-20 w-20' />
            <p className='mt-2 text-2xl font-semibold'>
              Launch or invest in projects
            </p>
            <p className='text-center'>
              Describe your new venture and how it is going to help the world!
              Browse projects to invest in.
            </p>
          </div>

          <div className='flex w-full flex-col items-center'>
            <img src='/assets/work_thumb_3.png' className='h-20 w-20' />
            <p className='mt-2 text-2xl font-semibold'>
              Carry projects to their goal!
            </p>
            <p className='text-center'>
              Using NFTs as proof of ownership for investment, support projects
              through their journey!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
