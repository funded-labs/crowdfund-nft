/* This example requires Tailwind CSS v2.0+ */
import { ExternalLinkIcon } from '@heroicons/react/solid'

export default function Entrepot() {
  return (
    <div className='bg-black-100 relative'>
      <div className='relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
        <div className='md:ml-auto md:w-1/2 md:pl-10'>
          <h2 className='text-base font-semibold uppercase tracking-wider text-gray-600'>
            Explore our Secondary Marketplace
          </h2>
          <p className='mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl'>
            CrowdFund NFTs on Entrepot
          </p>
          <p className='mt-3 text-lg text-white'>
            All NFTs minted from successfully funded projects on CrowdFund NFT
            are available to trade on Entrepot, our secondary marketplace
            partner.
          </p>
          <div className='mt-8'>
            <div className='inline-flex rounded-md shadow'>
              <a
                href='#'
                className='inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-teal-400 hover:bg-gray-50'
              >
                Explore our NFTs on Entrepot
                <ExternalLinkIcon
                  className='-mr-1 ml-3 h-5 w-5 text-teal-400'
                  aria-hidden='true'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
