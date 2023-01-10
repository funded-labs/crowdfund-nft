/* This example requires Tailwind CSS v2.0+ */
import { ExternalLinkIcon } from '@heroicons/react/solid'

const products = [
  {
    id: 1,
    name: 'Crowdfund NFT',
    by: 'Crowdfund NFT',
    href: 'https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app/project.html?p=crowdfundnft',
    description:
      'Our own collection of NFTs. Get early access to all future CrowdFund NFT projects by holding one of these.',
    imageSrc: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/id=16',
    imageAlt: 'Crowdfund NFT logo',
  },
  {
    id: 2,
    name: 'Cosmicrafts',
    by: 'Omar Hernandez Salmeron',
    href: 'https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app/project.html?p=cosmicrafts',
    description:
      'Cosmicrafts is the first Real-Time Strategy game on the Internet Computer by using the latest Blockchain technology. The funds will go to research and development to create sophisticated and first-class game assets as NFTs, being able to assemble them in parts and upgrade its properties. We are rewarding our investors with our first collection of original and unique artwork NFTs. Created out of our most attractive game assets, each NFT is handcrafted and layered out from its conception as technical drawing, rendering 3D models and stunning visual effects. Cosmicrafts RoadMap for Q2 2022 is important step towards the consolidation of the project on the ecosystem, we are challenged by the new technology that Internet Computer brings in.',
    imageSrc: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/?id=32',
    imageAlt: 'Cosmicrafts logo',
  },
  {
    id: 3,
    name: 'IC Whiskers',
    by: 'catpirate.icp',
    href: 'https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app/project.html?p=icwhiskers',
    description:
      'Our project’s first collection will be sold on the CCC NFT marketplace. ICWhiskers will be user’s pass into our project and future airdrops. Izzy, the founder and lead-artist of ICWhiskers has been drawing from 9 years and is learning to use different programs as well. Currently we are focussed on finishing the art. The artist is also working on 10,000 NFT collection called Metacats, which will be airdropped to DSCVR users and certain whitelisted users from our community.',
    imageSrc: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/id=45',
    imageAlt: 'ICWhiskers logo',
  },
  {
    id: 4,
    name: 'Sa-chan',
    by: 'Sa-chan',
    href: 'https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app/project.html?p=sachan',
    description:
      'ICPs first live-action NFT, brought to you by Sa-chan, a lover of strawberries',
    imageSrc: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/id=57',
    imageAlt: 'Sa-Chan cover',
  },
  {
    id: 5,
    name: 'Kinic',
    by: 'Wyatt Benno',
    href: 'https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app/project.html?p=kinic',
    description: 'Kinic is a search engine for web3 content.',
    imageSrc:
      'https://kn5ky-6iaaa-aaaai-qbikq-cai.ic0.app/assets/nfts/kinic/cover.png',
    imageAlt: 'Kinic logo',
  },
  {
    id: 6,
    name: 'Internet Computer Footprint',
    by: 'Orlando Hutchings',
    href: 'https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app/project.html?p=icfootprint',
    description: 'IC Footprint NFT',
    imageSrc: 'https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/id=69',
    imageAlt: 'IC Footprint logo',
  },
]

export default function Entrepot2() {
  return (
    <div className='bg-slate-50'>
      <div className='mx-auto max-w-5xl px-4 pb-10 pt-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:pt-24'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 md:text-3xl'>
          <span className='block'>Trade NFTs</span>
          <span className='block text-blue-700'>
            on the CrowdFund NFT Marketplace
          </span>
        </h2>
        {/* <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
                    <div className='inline-flex rounded-md shadow'>
                        <a
                            href='https://entrepot.app/marketplace'
                            target='_blank'
                            className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base uppercase font-medium rounded-md text-white bg-teal-400 hover:bg-teal-800'>
                            Explore on Entrepot
                            <ExternalLinkIcon
                                className='-mr-1 ml-3 h-5 w-5 text-white'
                                aria-hidden='true'
                            />
                        </a>
                    </div>
                </div> */}
      </div>
      <div className='mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-24'>
        <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8'>
          {products.map((product) => (
            <div
              key={product.id}
              className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:scale-105'
            >
              <div className='aspect-w-3 aspect-h-2 bg-gray-200 sm:aspect-none sm:h-40'>
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className='h-full w-full object-cover object-center sm:h-full sm:w-full'
                />
              </div>
              <div className='flex flex-1 flex-col space-y-2 p-4'>
                <h3 className='text-sm text-gray-900'>
                  <a href={product.href} target='_blank'>
                    <span aria-hidden='true' className='absolute inset-0' />
                    <div className='font-bold'>{product.name}</div>
                    by {product.by}
                  </a>
                </h3>
                <p className='text-sm text-gray-500 line-clamp-3'>
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
