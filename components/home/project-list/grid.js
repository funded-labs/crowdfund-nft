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
            <div className='px-4 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
                {[0, 0, 0, 0].map((item, index) => (
                    <Item key={index} item={item} isLoading={true} />
                ))}
            </div>
        )
    }

    return (
        <>
            <div className='px-4 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
                {items
                    .slice(
                        0,
                        showAll ? items.length : Math.min(items.length, 4)
                    )
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
                <div className='text-center mt-5'>
                    <button
                        onClick={() => setShowAll(true)}
                        className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        Show more
                    </button>
                </div>
            )}
        </>
    )
}
