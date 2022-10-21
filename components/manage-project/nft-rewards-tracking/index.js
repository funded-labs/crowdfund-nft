import { List } from "./list";
import { useProjectTokens, useProjectRewards, useProjectNFTCanister } from "../../../hooks/use-project";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NftRewardsTracking() {
    const router = useRouter()
    const { projectId } = router.query

    const { data: nftCanister } = useProjectNFTCanister(projectId)
    const { data: tokens } = useProjectTokens(nftCanister ?? null)
    const { data: rewards } = useProjectRewards(nftCanister ?? null)

    const [selectedToken, setSelectedToken] = useState('')

    return (
        <div className="w-full flex flex-col space-y-4">
            <div className='w-full rounded-2xl shadow bg-white overflow-hidden flex flex-col p-4'>
                <div className="w-full flex flex-col">
                    <h3 className='text-2xl font-medium'>NFTs and reward tracking</h3>

                     <div className="w-full flex flex-row justify-start my-2">
                        <input
                            className="py-2 px-4 bg-gray-200 rounded w-96"
                            placeholder="Search by NFT number"
                            value={selectedToken}
                            onChange={event => {
                                setSelectedToken(event.target.value)
                                if (event.target.value === '0' && tokens.length > 0) {
                                    setSelectedToken(0)
                                } else if (parseInt(event.target.value) && parseInt(event.target.value) < tokens.length) {
                                    setSelectedToken(parseInt(event.target.value))
                                } else {
                                    setSelectedToken('')
                                }
                            }}
                        />
                    </div>

                    {<List rewards={rewards} tokens={tokens} selectedToken={selectedToken} nftCanister={nftCanister} />}
                </div>
            </div>
        </div>
    )
}