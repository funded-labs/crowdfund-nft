import exampleNFTs from './example-nfts'

export default function NFTs({ project }) {
    const { nftVolume } = project

    const nfts = exampleNFTs.hasOwnProperty(project.id)
        ? exampleNFTs[project.id]
        : []

    return (
        <div
            id='nft-collection-nfts'
            className='w-full shadow p-4 rounded-2xl bg-white flex flex-col items-start'>
            <p className='font-bold text-base text-black'>NFTs</p>

            <p className='text-gray-600 my-2 w-full'>
                When you back this project, you will be randomly allocated an
                NFT from this collection if the project gets fully funded.
            </p>

            {/* <p className='text-center font-semibold w-full mb-10'>
                Collection Title - {nftVolume} total NTF's
            </p> */}

            {nfts.length > 0 && (
                <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {nfts.map((nft) => (
                        <div
                            key={nft.id}
                            className='w-full flex flex-col space-y-2'>
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
