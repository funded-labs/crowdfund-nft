/* This example requires Tailwind CSS v2.0+ */
import { XIcon } from '@heroicons/react/outline'

export default function Example() {
  return (
    <div className='relative bg-blue-600'>
      <div className='mx-auto max-w-7xl py-7 px-3 sm:px-6 lg:px-8'>
        <div className='pr-16 sm:px-16 sm:text-center'>
          <p className='font-medium text-white'>
            <span className='md:hidden'>We have launched our marketplace!</span>
            <span className='hidden md:inline'>
              Big news! You can now trade on our new secondary marketplace.
            </span>
            <span className='block sm:ml-2 sm:inline-block'>
              <a
                href='https://n5eqg-pqaaa-aaaak-ab3aa-cai.ic0.app'
                target='_blank'
                className='font-bold text-white underline'
              >
                {' '}
                Explore our marketplace <span aria-hidden='true'>&rarr;</span>
              </a>
            </span>
          </p>
        </div>
        <div className='absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-start sm:pt-1 sm:pr-2'></div>
      </div>
    </div>
  )
}
