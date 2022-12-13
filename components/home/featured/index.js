import Link from "next/link";

export default function Featured() {
    return (
      <div className="bg-white">
        <div className="mx-8 sm:mx-auto max-w-5xl py-16 sm:py-12 ">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Featured projects</h2>
            <Link href='/search' as='/search.html'>
              <a className="hidden text-sm font-semibold text-blue-600 hover:text-blue-500 sm:block">
                View all projects
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </Link>
          </div>
  
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
              <img
                src="https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/id=238"
                alt="Seers"
                className="object-cover object-center group-hover:opacity-75"
              />
              <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-75" />
              <div className="flex items-end p-6">
                <div>
                  <h3 className="font-semibold text-xl text-white">
                    <a href="https://crowdfund-nft.com/project.html?projectId=63">
                      <span className="absolute inset-0" />
                      Seers
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Seers is a web3 decentralized social network
                  </p>
                  <p aria-hidden="true" className="mt-1 text-sm font-semibold text-blue-300">
                    Raising 24000 ICP
                  </p>
                </div>
              </div>
            </div>
            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
              <img
                src="https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/id=331"
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-75 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                  <h3 className="font-semibold text-xl text-white">
                    <a href="https://crowdfund-nft.com/project.html?projectId=69">
                      <span className="absolute inset-0" />
                      CrowdFund NFT
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                  Crowdfunding on the IC, soon in BTC!
                  </p>
                  <p aria-hidden="true" className="mt-1 text-sm text-blue-300">
                    Raising 5 BTC
                  </p>
                </div>
              </div>
            </div>
            <div className="group aspect-w-2 aspect-h-1 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
              <img
                src="https://3mena-gaaaa-aaaak-aajja-cai.raw.ic0.app/id=334"
                alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              />
              <div
                aria-hidden="true"
                className="bg-gradient-to-b from-transparent to-black opacity-75 sm:absolute sm:inset-0"
              />
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                  <h3 className="font-semibold text-xl text-white">
                    <a href="https://crowdfund-nft.com/project.html?projectId=72">
                      <span className="absolute inset-0" />
                      Hot or Not
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Web3’s answer to TikTok
                  </p>
                  <p aria-hidden="true" className="mt-1 text-sm font-semibold text-blue-300">
                    9990 ICP Raised
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="mt-6 sm:hidden">
            <Link href='/search' as='/search.html'>
              <div className="block text-sm font-semibold text-blue-600 hover:text-blue-500">
                View all projects
                <span aria-hidden="true"> &rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  