import Menu from './menu'
import NFTs from './nfts'
import Rewards from './rewards'
import HowItWorks from './how-it-works'
import ResaleSecondaryMarkets from './resale-secondary-markets'

export default function NFTCollection({ project }) {
  return (
    <div className='w-full'>
      <div className='mx-auto flex w-full max-w-7xl flex-col space-y-4 px-4 py-4 md:flex-row md:space-y-0 md:space-x-4'>
        <div className='flex w-full flex-col space-y-4 md:w-3/12'>
          <Menu />
        </div>

        <div className='flex w-full flex-col space-y-8 md:w-9/12'>
          <NFTs project={project} />
          <Rewards project={project} />
          <HowItWorks />
          <ResaleSecondaryMarkets />
        </div>
      </div>
    </div>
  )
}
