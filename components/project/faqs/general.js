import Link from 'next/link'

export default function General({ project }) {
  return (
    <div
      id='nft-collection-nfts'
      className='flex w-full flex-col items-start space-y-5'
    >
      <div className='flex w-full flex-col space-y-3 rounded-2xl bg-white p-8 text-gray-600 shadow'>
        <p className='text-2xl font-bold text-black'>
          Why can't I see an NFT in my wallet when I invested in a project?
        </p>
        <p>
          You will receive an NFT in your wallet when the project gets fully
          funded.
        </p>
        <p>
          If the project does not get fully funded, you will get reimbursed in
          full. You will only lose the ICP transaction fee (0.001 ICP).
        </p>
      </div>

      <div className='flex w-full flex-col space-y-3 rounded-2xl bg-white p-8 text-gray-600 shadow'>
        <p className='text-2xl font-bold text-black'>
          Why is there a minimum amount to invest?
        </p>
        <p>
          There is a minimum amount to invest since each project comes with a
          limited amount of NTFs.
        </p>
        <p>
          This means that you can invest, at a minimum, enough to receive one
          NFT. You can invest in increments of the amount of NFTs you wish to
          receive in exchange for backing a project.
        </p>
      </div>

      <div className='flex w-full flex-col space-y-3 rounded-2xl bg-white p-8 text-gray-600 shadow'>
        <p className='text-2xl font-bold text-black'>
          How do I collect my rewards?
        </p>
        <p>
          It is the responsibility of the project creator to provide you with
          your rewards.
        </p>
        <p>
          If you need to contact the project creator, we provide Discord and
          Twitter links for you to get in touch with the projects that are live
          on CrowdFund NFT.
        </p>
      </div>

      <div className='flex w-full flex-col space-y-3 rounded-2xl bg-white p-8 text-gray-600 shadow'>
        <p className='text-2xl font-bold text-black'>
          Who do I contact for support?
        </p>
        <p>
          If you have any questions or concerns, please contact CrowdFund NFT at
          the following email address:
        </p>
        <p>info [at] crowdfund-nft.com</p>
      </div>

      <Link href='/p/terms' passHref as='/p/terms.html'>
        <a
          className={`
                        w-full cursor-pointer bg-blue-600 px-4 py-3
                        text-center text-sm text-white hover:bg-blue-700 focus:outline-none
                    `}
        >
          Read more about us in our T&amp;C's
        </a>
      </Link>
    </div>
  )
}
