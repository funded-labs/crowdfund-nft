import classNames from 'classnames'

const tabs = [
  {
    label: 'About Project',
    id: 'campaign-details',
  },
  {
    label: 'NFT Collection',
    id: 'nft-collection',
  },
  {
    label: 'FAQs',
    id: 'faqs',
  },
  {
    label: 'Activity',
    id: 'activity',
  },
]

export default function TabBar({ selected, onSelect = () => {}, isLoading }) {
  if (isLoading) {
    return (
      <section className='w-full border-b-2 bg-white'>
        <div className='mx-auto flex w-full max-w-7xl flex-row space-x-2 px-4 pt-1 text-gray-900'>
          <div className='h-12 w-32 animate-pulse bg-gray-200' />
          <div className='h-12 w-32 animate-pulse bg-gray-200' />
          <div className='h-12 w-32 animate-pulse bg-gray-200' />
        </div>
      </section>
    )
  }

  return (
    <section className='w-full border-b-2 bg-white'>
      <div className='scrollbar-hidden mx-auto flex w-full max-w-7xl overflow-x-scroll px-4 pt-1 text-gray-900'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={classNames(
              'font-regular appearance-none rounded-none px-4 py-4 text-sm',
              'flex-shrink-0 border-b-4 px-4 hover:text-gray-500',
              selected === tab.id ? 'border-blue-600 ' : 'border-transparent',
            )}
            type='button'
            onClick={() => onSelect(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  )
}
