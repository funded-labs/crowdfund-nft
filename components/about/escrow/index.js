/* This example requires Tailwind CSS v2.0+ */
import { InboxIcon, CubeIcon, SparklesIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/outline'
import Link from 'next/link'
const posts = [
  {
    title: 'Boost your conversion rate',
    href: '#',
    category: { name: 'Article', href: '#', color: 'bg-indigo-100 text-indigo-800' },
    description:
      'Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.',
    date: 'Jan 13, 2022',
    datetime: '2020-03-16',
    author: {
      name: 'Luke Dugdale',
      href: '#',
      imageUrl:
        'https://kn5ky-6iaaa-aaaai-qbikq-cai.ic0.app/assets/luke.png',
    },
    readingTime: '6 min',
  },
  
]
export default function Escrow() {
  return (
    <>
    <div className="py-12 relative">
    <div className="relative rounded-xl  bg-white shadow-lg">
      <div className="h-56 bg-blue-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1506755594592-349d12a7c52a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
          alt=""
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2 className="text-md font-regular text-blue-600">FROM THE BLOG</h2>
          <p className="mt-2 text-3xl font-medium tracking-tight text-black sm:text-4xl">An alternative to traditional crowdfunding platforms</p>
          <p className="mt-3 text-md text-neutral-600 font-serif">
          CrowdFund NFT is an alternative to Kickstarter, Go Fund Me, and other traditional crowdfunding platforms. Its unique approach? It runs entirely on the Internet Computer blockchain, and uses NFTs to provide backers with ‘proof of ownership’ in the projects they help crowdfund. 
          </p>
          <div className="mt-4">
            <div className="inline-flex rounded-md">
              <Link href="#"
             className="inline-flex items-center justify-center font-sans border-transparent bg-clear px-5 py-3 text-sm font-medium text-blue-600 hover:bg-gray-50"
              >
                <p className="text-blue-600 cursor-pointer">Read the full article</p>
                {/* <ArrowTopRightOnSquareIcon className="-mr-1 ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
               */}
              </Link>
              
            </div>
          </div>
          {posts.map((post, idx) => (
          <div className="mt-6 flex items-center" key={idx}>
                <div className="flex-shrink-0">
                  <a href={post.author.href}>
                    <span className="sr-only">{post.author.name}</span>
                    <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" />
                  </a>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <a href={post.author.href}>{post.author.name}</a>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={post.datetime}>{post.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime} read</span>
                  </div>
                </div>
              </div>
          ))}
          
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
