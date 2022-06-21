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
        imageSrc:
            'https://s3.amazonaws.com/pf-user-files-01/u-166728/uploads/2022-03-02/sa431zk/3.jpg',
        imageAlt: 'Crowdfund NFT logo',
    },
    {
        id: 2,
        name: 'Cosmicrafts',
        by: 'Omar Hernandez Salmeron',
        href: 'https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app/project.html?p=cosmicrafts',
        description:
            'Cosmicrafts is the first Real-Time Strategy game on the Internet Computer by using the latest Blockchain technology. The funds will go to research and development to create sophisticated and first-class game assets as NFTs, being able to assemble them in parts and upgrade its properties. We are rewarding our investors with our first collection of original and unique artwork NFTs. Created out of our most attractive game assets, each NFT is handcrafted and layered out from its conception as technical drawing, rendering 3D models and stunning visual effects. Cosmicrafts RoadMap for Q2 2022 is important step towards the consolidation of the project on the ecosystem, we are challenged by the new technology that Internet Computer brings in.',
        imageSrc:
            'https://s3.amazonaws.com/pf-user-files-01/u-166728/uploads/2022-03-25/9s43ybs/33.jpg',
        imageAlt: 'Cosmicrafts logo',
    },
    {
        id: 3,
        name: 'IC Whiskers',
        by: 'catpirate.icp',
        href: 'https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app/project.html?p=icwhiskers',
        description:
            'Our project’s first collection will be sold on the CCC NFT marketplace. ICWhiskers will be user’s pass into our project and future airdrops. Izzy, the founder and lead-artist of ICWhiskers has been drawing from 9 years and is learning to use different programs as well. Currently we are focussed on finishing the art. The artist is also working on 10,000 NFT collection called Metacats, which will be airdropped to DSCVR users and certain whitelisted users from our community.',
        imageSrc:
            'https://s3.amazonaws.com/pf-user-files-01/u-166728/uploads/2022-03-28/du33y3t/w3.png',
        imageAlt: 'ICWhiskers logo',
    },
]

export default function Entrepot2() {
    return (
        <div className='bg-slate-50'>
            <div className='max-w-5xl mx-auto pb-10 pt-12 px-4 sm:px-6 lg:pt-24 lg:px-8 lg:flex lg:items-center lg:justify-between'>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 md:text-3xl'>
                    <span className='block'>
                        Trade NFTs
                    </span>
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
            <div className='max-w-5xl mx-auto pb-12 px-4 sm:px-6 lg:pb-24 lg:px-8'>
                <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8'>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className='group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden transition-all hover:scale-105'>
                            <div className='aspect-w-3 aspect-h-2 bg-gray-200 sm:aspect-none sm:h-40'>
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className='w-full h-full object-center object-cover sm:w-full sm:h-full'
                                />
                            </div>
                            <div className='flex-1 p-4 space-y-2 flex flex-col'>
                                <h3 className='text-sm text-gray-900'>
                                    <a href={product.href} target='_blank'>
                                        <span
                                            aria-hidden='true'
                                            className='absolute inset-0'
                                        />
                                        <div className='font-bold'>
                                            {product.name}
                                        </div>
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
