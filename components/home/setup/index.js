/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/outline'

const tiers = [
  {
    name: 'How to set up',
    href: 'https://plugwallet.ooo',
    priceMonthly: 'Plug Wallet',
    description:
      'A wallet to store and manage NFTs, Tokens, and connect to dApps on the Internet Computer.',
    features: [
      'Log into IC apps from your browser using Pricipal ID',
      'Manage, send and receive all your IC assets from one place, with one ID.',
      'Save contacts (aka name IDs) in a local storage address book.',
    ],
  },
  {
    name: 'How to set up',
    href: 'https://smartcontracts.org/docs/ic-identity-guide/auth-how-to.html',
    priceMonthly: 'Internet Identity',
    description:
      'Internet Identity is an anonymous blockchain authentication framework supported by the Internet Computer.',
    features: [
      'Create Identity Anchors - assigned to cryptographically enabled devices',
      'Fingerprint sensor on laptop',
      'Face ID system on phone',
      'Portable HSM - such as YubiKey or Ledger Wallet',
    ],
  },
]

export default function Setup() {
  return (
    <div className='bg-blue-700'>
      <div className='pt-12 sm:pt-16 lg:pt-24'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl space-y-3 lg:max-w-none'>
            <p className='text-3xl font-bold text-white sm:text-3xl lg:text-3xl'>
              Get set up on CrowdFund NFT
            </p>
            <h2 className='mx-auto max-w-4xl text-center font-semibold leading-6 text-gray-100'>
              To use CrowdFund NFT, you will need a Plug Wallet, containing ICP
              tokens. You may also need to set up Internet Identity, if you
              intend to submit a project.
            </h2>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-gray-50 pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24'>
        <div className='relative'>
          <div className='absolute inset-0 h-3/4 bg-blue-700' />
          <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-md space-y-4 lg:grid lg:max-w-5xl lg:grid-cols-2 lg:gap-5 lg:space-y-0'>
              {tiers.map((tier) => (
                <div
                  key={tier.description}
                  className='flex flex-col overflow-hidden rounded-lg shadow-lg'
                >
                  <div className='bg-white px-6 py-8 sm:p-10 sm:pb-6'>
                    <div>
                      <h3
                        className='inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-indigo-600'
                        id='tier-standard'
                      >
                        {tier.name}
                      </h3>
                    </div>
                    <div className='mt-4 flex items-baseline text-2xl font-extrabold'>
                      {tier.priceMonthly}
                    </div>
                    <p className='mt-5 text-lg text-gray-500'>
                      {tier.description}
                    </p>
                  </div>
                  <div className='flex flex-1 flex-col justify-between space-y-6 bg-gray-50 px-6 pt-6 pb-8 sm:p-10 sm:pt-6'>
                    <ul role='list' className='space-y-4'>
                      {tier.features.map((feature) => (
                        <li key={feature} className='flex items-start'>
                          <div className='flex-shrink-0'>
                            <CheckIcon
                              className='h-6 w-6 text-green-500'
                              aria-hidden='true'
                            />
                          </div>
                          <p className='ml-3 text-base text-gray-700'>
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <div className='rounded-md shadow'>
                      <a
                        href={tier.href}
                        target='_blank'
                        className='flex items-center justify-center rounded-md border border-transparent bg-blue-700 px-5 py-3 text-base font-medium text-white hover:bg-gray-900'
                        aria-describedby='tier-standard'
                      >
                        Get started
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='relative mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:mt-5 lg:px-8'>
          <div className='mx-auto max-w-md lg:max-w-5xl'>
            <div className='rounded-lg bg-gray-100 px-6 py-8 sm:p-10 lg:flex lg:items-center'>
              <div className='flex-1'>
                <div>
                  <h3 className='inline-flex rounded-full bg-white px-4 py-1 text-sm font-semibold uppercase tracking-wide text-gray-800'>
                    How to buy ICP tokens
                  </h3>
                </div>
                <div className='mt-4 text-lg text-gray-600'>
                  To use CrowdFund NFT, you will also need to have ICP tokens
                  transferred to your Plug Wallet.{' '}
                  <span className='font-semibold text-gray-900'>
                    You can buy ICP tokens on Coinbase, Binance, or any other
                    major exchange
                  </span>
                  .
                </div>
              </div>
              <div className='mt-6 rounded-md shadow lg:mt-0 lg:ml-10 lg:flex-shrink-0'>
                <a
                  href='https://www.dfinitycommunity.com/best-exchanges-to-buy-icp/'
                  target='_blank'
                  className='flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50'
                >
                  Where to buy ICP tokens
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
