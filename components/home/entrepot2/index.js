/* This example requires Tailwind CSS v2.0+ */
import { ExternalLinkIcon } from '@heroicons/react/solid'

export default function Entrepot2() {
    return (
      <div className="bg-blue-50">
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-3xl">
            <span className="block">Trade NFTs on secondary marketplace</span>
            <span className="block text-teal-400">in partnership with Entrepot</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="https://entrepot.app/marketplace"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base uppercase font-medium rounded-md text-white bg-teal-400 hover:bg-teal-800"
              >
                Explore on Entrepot
                <ExternalLinkIcon className="-mr-1 ml-3 h-5 w-5 text-white" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  