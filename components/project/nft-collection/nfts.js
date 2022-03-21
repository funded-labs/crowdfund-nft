export default function NFTs({ project }) {
    const { nftVolume } = project

    const nfts =
        project.id === '1'
            ? [
                  {
                      id: '#79',
                      url: 'https://2glp2-eqaaa-aaaak-aajoa-cai.raw.ic0.app/?asset=79',
                  },
                  {
                      id: '#160',
                      url: 'https://2glp2-eqaaa-aaaak-aajoa-cai.raw.ic0.app/?asset=160',
                  },
                  {
                      id: '#226',
                      url: 'https://2glp2-eqaaa-aaaak-aajoa-cai.raw.ic0.app/?asset=226',
                  },
              ]
            : project.id === '4'
            ? [
                  {
                      id: '#0',
                      url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=41',
                  },
                  {
                      id: '#1',
                      url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=42',
                  },
                  {
                      id: '#2',
                      url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=43',
                  },
              ]
            : project.id === '6'
            ? [
                  {
                      id: '#1',
                      url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=27',
                  },
                  {
                      id: '#2',
                      url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=28',
                  },
                  {
                      id: '#3',
                      url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=29',
                  },
              ]
            : project.id === '7'
            ? [
                  {
                      id: '#0',
                      url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=37',
                  },
                  {
                      id: '#1',
                      url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=39',
                  },
                  {
                      id: '#2',
                      url: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=38',
                  },
              ]
            : []

    return (
        <div
            id='nft-collection-nfts'
            className='w-full shadow p-4 rounded-2xl bg-white flex flex-col items-start'>
            <p className='font-bold text-base text-black'>NFTs</p>

            <p className='text-gray-600 my-2 w-full'>
                When you invest in this project, you will be randomly allocated
                an NFT from the this collection if the project gets fully
                funded.
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
