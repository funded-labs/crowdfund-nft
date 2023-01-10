import { useState } from 'react'

import Item from './item'

export default function Grid({
  isLoading,
  isLoadingStats = false,
  items = [],
  stats = {},
}) {
  const [showAll, setShowAll] = useState(items.length > 4 ? false : true)

  if (isLoading === true || items.length < 1) {
    return (
      <div className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-4'>
        {[0, 0, 0, 0].map((item, index) => (
          <Item key={index} item={item} isLoading={true} />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-4'>
        {items
          .slice(0, showAll ? items.length : Math.min(items.length, 4))
          .map((item, index) => (
            <Item
              key={index}
              item={item}
              isLoadingStats={isLoadingStats}
              stats={stats}
            />
          ))}
      </div>
      {!showAll && (
        <div className='mt-5 text-center'>
          <button
            onClick={() => setShowAll(true)}
            className='inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Show more
          </button>
        </div>
      )}
    </>
  )
}
