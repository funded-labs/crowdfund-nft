/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  AnnotationIcon,
  ChatAlt2Icon,
  InboxIcon,
  MenuIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

const solutions = [
  {
    name: 'Inbox',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: InboxIcon,
  },
  {
    name: 'Messaging',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: AnnotationIcon,
  },
  { name: 'Live Chat', description: "Your customers' data will be safe and secure.", href: '#', icon: ChatAlt2Icon },
  {
    name: 'Knowledge Base',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: QuestionMarkCircleIcon,
  },
]
const navigation = [
  { name: 'Pricing', href: '#' },
  { name: 'Partners', href: '#' },
  { name: 'Company', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CTA() {
  return (
    <div className="bg-white">

      <main>
      <div className="mx-auto mt-24 max-w-7xl px-4 sm:mt-24 sm:px-6">
            <div className="text-center">
              <h1 className="text-6xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-7xl">
                <span className="block md:text-7xl">Crowdfunding</span>
                <span className="block text-neutral-900">on the <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-transparent bg-clip-text">blockchain!</span></span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-xl tracking-tight font-regular text-neutral-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Using smart contract technology to build a safer, cheaper and global crowdfunding service - with a new NFT model.
              </p>
            </div>
            <div className="relative py-4 sm:py-8">
          <div className="absolute inset-0 flex flex-col" aria-hidden="true">
            <div className="flex-1" />
            <div className="w-full flex-1 bg-white" />
          </div>
          
          <div className="aspect-w-16 aspect-h-9 relative rounded-xl max-w-5xl mx-auto">
  
</div>
        </div>
        <div className="bg-white rounded-xl max-w-5xl mx-auto">
        <div className="mx-auto max-w-5xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-center text-xl font-medium text-neutral-300">
            Trusted by premier Internet Computer companies
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className="h-8" src="/assets/kinic.png" alt="Tuple" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img className="h-8" src="/assets/bink.png" alt="Mirage" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="h-8"
                src="/assets/cosmicraftsgrey.png"
                alt="Cosmicrafts"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
              <img
                className="h-8"
                src="/assets/cubetopia.png"
                alt="Cubetopia"
              />
            </div>
            <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
              <img
                className="h-8"
                src="/assets/catalyze.png"
                alt="Catalyze"
              />
            </div>
          </div>
        </div>
        </div>
        </div>
      </main>
    </div>
  )
}
