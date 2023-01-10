import { List } from './list'
import {
  useProjectTokens,
  useProjectRewards,
  useProjectNFTCanister,
} from '../../../hooks/use-project'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function NftRewardsTracking() {
  const router = useRouter()
  const { projectId } = router.query

  const { data: nftCanister } = useProjectNFTCanister(projectId)
  const { data: tokens } = useProjectTokens(nftCanister ?? null)
  const { data: rewards } = useProjectRewards(nftCanister ?? null)
  const [selectedToken, setSelectedToken] = useState('')

  return (
    <div className='flex w-full flex-col space-y-4'>
      <div className='flex w-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow'>
        <div className='flex w-full flex-col'>
          <h3 className='text-2xl font-medium'>NFTs and reward tracking</h3>

          <div className='my-2 flex w-full flex-row justify-start'>
            <input
              className='w-96 rounded bg-gray-200 py-2 px-4'
              placeholder='Search by NFT number'
              value={selectedToken}
              onChange={(event) => {
                setSelectedToken(event.target.value)
                if (event.target.value === '0' && tokens.length > 0) {
                  setSelectedToken(0)
                } else if (
                  parseInt(event.target.value) &&
                  parseInt(event.target.value) < tokens.length
                ) {
                  setSelectedToken(parseInt(event.target.value))
                } else {
                  setSelectedToken('')
                }
              }}
            />
          </div>

          {
            <List
              rewards={rewards}
              tokens={tokens}
              selectedToken={selectedToken}
              nftCanister={nftCanister}
            />
          }
        </div>
      </div>
    </div>
  )
}
