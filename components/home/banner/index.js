/* This example requires Tailwind CSS v2.0+ */
import { XIcon } from '@heroicons/react/outline'

export default function Banner() {
  return (
    <div className="relative bg-transparent">
      <div className="max-w-7xl mx-auto py-12 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500">
            <span className="md:hidden">We have launched our marketplace!</span>
            <span className="hidden md:inline">Big news! You can now trade on our new secondary marketplace</span>
            <span className="block sm:ml-2 sm:inline-block">
              <a href="https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app" target="_blank" className="text-black font-bold underline">
                {' '}
                Explore our marketplace <span aria-hidden="true">&rarr;</span>
              </a>
            </span>
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
          <button
            type="button"
            className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
