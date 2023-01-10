export default function ResaleSecondaryMarkets() {
  return (
    <>
      <div
        id='nft-collection-resale-and-secondary-market'
        className='mb-5 flex w-full flex-col items-start rounded-2xl bg-white p-8 shadow'
      >
        <p className='text-2xl font-bold text-black'>
          Resale &amp; Secondary Markets
        </p>

        <div className='mt-4 flex flex-col space-y-4 font-light text-neutral-600'>
          <p>
            As a backer, who holds NFTs generated through Crowdfund NFT, you are
            entitled to sell your NFTs on secondary marketplaces.
          </p>
          <p>
            Once NFT’s reach secondary marketplaces, there is a transfer of the
            contractual agreement between backers and creators. The only legally
            binding contract with regards to rewards exists between creators and
            NFT holders, secondary NFT owners and buyers collect rights to all
            rewards that have not yet been delivered. This means that creators
            are obliged to provide rewards to secondary NFT owners.
          </p>
          <p>Secondary market fees:</p>
          <p>
            CrowdFund NFT charges a fee for selling NFT’s minted by CrowdFund
            NFT on secondary marketplaces. The “Royalty” fee will depend on the
            marketplace where the NFT is sold. In most cases, we will charge the
            maximum fee that the platform allows. To find out what this fee is,
            please visit the Terms of the NFT Marketplace you are using to
            resell NFT’s.
          </p>
          <a
            className={`
                    w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-3
                    text-center text-sm text-white hover:bg-blue-700 focus:outline-none
                `}
            href='/p/terms.html'
          >
            Read more about us in our T&amp;C's
          </a>
        </div>
      </div>
    </>
  )
}
