/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
export default function CTA2() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-5xl py-4 px-4 sm:px-6 lg:px-0">
          <div className="overflow-hidden rounded-lg bg-gradient-to-br from-neutral-100 to-white lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:pl-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-regular tracking-tight text-neutral-900 sm:text-4xl">
                  <span className="block">Ready to get started?</span>
                  <span className="block font-regular">Join <span className="font-bold">crowd<span className="text-blue-600">fund</span></span> today.</span>
                </h2>
                
                <a
                  href="/create-project"
                  className="mt-8 inline-flex items-center rounded-full border border-transparent bg-black px-5 py-3 text-base font-medium text-white shadow hover:bg-neutral-900"
                >
                  Start a Crowdfund
                </a>
              </div>
            </div>
            <div className="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1">
              <img
                className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="/assets/dashboard2.png"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  