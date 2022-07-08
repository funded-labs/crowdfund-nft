import { useQuery } from 'react-query'

import NFTexamplesNew from './nft-examples-new'

const NFTexamples = ({ backend, projectId }) => {
    const { data: nftExamples } = useQuery(
        ['nft-examples', projectId, backend],
        async () => {
            if (!backend) return null
            if (!projectId) return null

            return await backend.getNFTexamples(projectId)
        },
        {
            refetchOnWindowFocus: false,
        }
    )

    return (
        <div className='bg-white pt-4 px-4 flex flex-col space-y-6'>
            <div className='border border-slate-400 rounded-lg bg-slate-100'>
                <div className='px-4 py-4'>
                    NFT Examples
                    <div className='text-xs'>
                        You can edit the NFT examples for the project as the
                        owner or an admin.
                    </div>
                </div>
                <div className='px-4 py-4 border-t border-slate-300 space-y-2 text-sm'>
                    {nftExamples === undefined ? (
                        <>Loading...</>
                    ) : !Array.isArray(nftExamples) ||
                      nftExamples.length === 0 ? (
                        <>No NFT examples for this project</>
                    ) : (
                        <>
                            {nftExamples.map((n) => (
                                <>
                                    <div key={Number(n.id)}>
                                        #{Number(n.id)}
                                    </div>
                                    <img
                                        src={n.img}
                                        style={{
                                            width: '50%',
                                            height: 'auto',
                                        }}
                                    />
                                </>
                            ))}
                        </>
                    )}
                </div>
                <NFTexamplesNew {...{ backend, projectId }} />
            </div>
        </div>
    )
}

export default NFTexamples
