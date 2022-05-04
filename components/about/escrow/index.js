/* This example requires Tailwind CSS v2.0+ */
import { InboxIcon, CubeIcon, SparklesIcon } from '@heroicons/react/outline'

export default function Escrow() {
  return (
    <div className="relative bg-white pt-16 pb-10 overflow-hidden">
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-blue-500">
                  <CubeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Our Escrow Canister
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  We have built an escrow canister on the IC Blockchain, which manages all of the funds collection and disbursements for crowdfunding projects. It is a controller less (or blackhole) canister, that is both open-source and verifiable. This means there can be no tampering from the CrowdFund NFT team when it comes to funds. All tokens on the platform are collected, stored and distributed through smart contract technology. If you wish to check out our escrow canister code, have a look at our GitHub repo.
                </p>
                <div className="mt-6">
                  <a
                    href="https://github.com/CrowdFund-NFT/escrow_manager"
                    className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700"
                  >
                    GitHub Link
                  </a>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
  )
}
