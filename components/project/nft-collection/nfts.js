import exampleNFTs from './example-nfts'

export default function NFTs({ project }) {
  const { nftVolume } = project

  const nfts = exampleNFTs.hasOwnProperty(project.id)
    ? exampleNFTs[project.id]
    : []

  return (
    <div
      id='nft-collection-nfts'
      className='flex w-full flex-col items-start rounded-2xl bg-white p-8 shadow'
    >
      <p className='text-2xl font-bold text-black'>NFTs</p>

      <p className='my-2 w-full font-light text-neutral-500'>
        When you back this project, you will be randomly allocated an NFT from
        this collection if the project gets fully funded.
      </p>

      {/* <p className='text-center font-semibold w-full mb-10'>
                Collection Title - {nftVolume} total NTF's
            </p> */}

      {nfts.length > 0 && (
        <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-3'>
          {nfts.map((nft) => (
            <div key={nft.id} className='flex w-full flex-col space-y-2'>
              <p className='font-semibold'>{nft.id}</p>
              <figure className='w-full rounded-lg border bg-gray-300'>
                <img src={nft.url} />
              </figure>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
