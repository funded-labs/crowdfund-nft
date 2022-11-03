/* This example requires Tailwind CSS v2.0+ */
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, MailIcon, ScaleIcon, CashIcon, PuzzleIcon, ArrowPathIcon,
  CloudArrowUpIcon,
  CogIcon,
  LockClosedIcon,
  ServerIcon,
  ShieldCheckIcon, } from '@heroicons/react/outline'

  import Divider from '@/components/about/divider'
import Escrow from '../escrow'
const transferFeatures = [
  {
    id: 1,
    name: 'Proof of participation',
    description:
      'NFTs provide proof of participation to backers - so that their status as an early contributor, and claim to rewards are stored on the IC Blockchain.',
    icon: LightningBoltIcon,
  },
  {
    id: 2,
    name: 'Cheap and Global',
    description:
      'Using the IC Blockchain allows for project creators to open up their crowdfunding round to a global audience, with cheap transaction fees and instant global payments.',
    icon: GlobeAltIcon,
  },
  {
    id: 3,
    name: 'Low risk',
    description:
      'With Blockchain, the crowdfunding process can be run on smart contract - with tamperproof funds management systems to assure automatic triggers for reimbursements, fund releases and NFT disbursements.',
    icon: ScaleIcon,
  },
]
const communicationFeatures = [
  {
    id: 1,
    name: 'Reverse Gas Model',
    description:
      'The IC runs on a reverse gas model, meaning no gas fees for users - simply a flat fee of 0.0001 ICP. This makes payments affordable, and reimbursements possible.',
    icon: CashIcon,
  },
  {
    id: 2,
    name: 'Inter-operability',
    description:
      'Our platform can be easily integrated with other IC systems. We have partnered with PlugWallet, Entrepot and more to build a complete blockchain service.',
    icon: PuzzleIcon,
  },
  {
    id: 3,
    name: 'Our Escrow Canister',
    description: 
    'We have built an escrow canister which handles funds for crowdfunding projects autonomously. If you wish to check out our escrow canister code, have a look at our GitHub repo.',
    icon: GlobeAltIcon,
  }
]

export default function Feature() {
  return (
    <>
    <div className="py-16 bg-white overflow-hidden lg:py-4">
    <div className="mx-auto max-w-md px-4 z-10 text-left sm:max-w-3xl sm:px-6 lg:max-w-5xl lg:px-0">
        <h2 className="text-lg font-semibold text-blue-500">WHY CROWDFUND?</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Fairer, faster, cheaper.
        </p>
        <p className="mx-auto mt-5  text-xl text-gray-500">
        What makes CrowdFund NFT different?
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {transferFeatures.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-blue-700 p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="z-0 relative max-w-xl mx-auto px-4 sm:px-6 lg:px-0 lg:max-w-5xl">
        <svg
          className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-neutral-100" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={784} fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>
       
        <Escrow/>
        <div className="mx-auto max-w-md text-left sm:max-w-3xl lg:max-w-5xl py-16 ">
        <h2 className="text-lg font-semibold text-blue-600">WHY ICP?</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Built on the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 to-orange-500">Internet Computer.</span>
        </p>
        <p className=" mt-5 max-w-4xl text-left text-xl text-gray-500">
        With the IC, our platform is hosted entirely on chain. From NFT assets, to our backend and frontend code - the platform is run entirely on decentralised systems. Other benefits of the IC include:
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {communicationFeatures.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-gradient-to-b from-neutral-900 to-black p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        <div className="relative mt-12 sm:mt-16 lg:mt-4">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            

            <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
             { <svg
                className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                width={784}
                height={404}
                fill="none"
                viewBox="0 0 784 404"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-red-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={784} height={404} fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)" />
              </svg>}
              {/* <img
                className="relative mx-auto"
                width={490}
                src="assets/features_thumb.png"
                alt=""
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
