const incentives = [
    {
      name: 'Connect your wallet',
      imageSrc: '/assets/wallet_icon.png',
      description: "Connect your Plug wallet or create an Internet Identity to submit a project.",
      id:'1'
    },
    {
      name: 'Create your project',
      imageSrc: '/assets/create_icon.png',
      description: "Tell us all about you and what you're building, get creative with custom NFTs.",
      id:'2'
    },
    {
      name: 'Share with the IC community',
      imageSrc: '/assets/community_icon.png',
      description:
        "Join our growing community of over 3000 ICP fans and builders who will help you get your idea off the ground.",
        id:'3'
    },
  ]
  
  export default function Getstarted() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-5xl px-4  sm:px-6 lg:px-0 py-12">
          <div className="rounded-2xl bg-white ">
            <div className="mx-auto max-w-xl lg:max-w-none">
              <div className="text-left">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                  Get started on Crowdfund <span className="block">in minutes.</span>
                </h2>
              </div>
              <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
                {incentives.map((incentive) => (
                  <div key={incentive.name} className="text-center sm:flex sm:text-left lg:block lg:text-left">
                    <div className="sm:flex-shrink-0">
                      <div className="flow-root mb-4">
                        <img className="mx-auto h-20 w-20" src={incentive.imageSrc} alt="" />
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 px-3.5 py-1.5 h-12 w-12 justify-center text-xl font-semibold text-white">
                    {incentive.id}
                    </span>
                    <div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                      <h3 className="text-2xl font-semibold text-gray-900">{incentive.name}</h3>
                      <p className="mt-2 text-md text-gray-500">{incentive.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  