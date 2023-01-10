export default function PricePerNFT({ stats, currency, selectedTierState }) {
  if (stats.nftStats.length > 1) {
    const tiers = stats.nftStats
    const [selectedTier, setSelectedTier] = selectedTierState
    return (
      <div className='flex w-full flex-col'>
        <p className='mb-1 text-sm text-gray-700'>
          This project has {tiers.length} reward tiers.
        </p>
        <div
          className={`grid w-full grid-cols-${tiers.length > 2 ? 3 : 2} gap-${
            currency === 'ICP' ? 3 : 1
          }`}
        >
          {tiers.map((tier, index) => {
            const isSelected = selectedTier === index
            const soldOut = tier.sold >= tier.number
            return (
              <div
                key={`tier${tier.priceE8S ? tier.priceE8S : tier.priceSatoshi}`}
                className={`${isSelected ? 'border-blue-600' : ''} ${
                  soldOut ? 'opacity-40' : 'cursor-pointer'
                } rounded-lg border bg-gray-50 py-4`}
                onClick={() => !soldOut && setSelectedTier(index)}
              >
                <p
                  className={`text-center text-2xl font-bold ${
                    isSelected ? 'text-blue-600' : 'text-black'
                  }`}
                >
                  <p className='text-center text-xs font-light text-gray-400'>
                    Tier price
                  </p>
                  {(
                    (tier.priceE8S ? tier.priceE8S : tier.priceSatoshi) /
                    100_000_000
                  )
                    .toFixed(tier.priceSatoshi ? 3 : 1)
                    .replace(/\.?0+$/, '')
                    .toString()}
                  <span
                    className={`pl-1 text-base font-normal ${
                      isSelected ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {currency}
                  </span>
                  <p className='text-center text-xs font-light text-gray-400'>
                    {tier.sold} / {tier.number} sold
                  </p>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const getFormattedPrice = () => {
    return `${(
      (stats.nftStats[0].priceE8S
        ? stats.nftStats[0].priceE8S
        : stats.nftStats[0].priceSatoshi) / 100_000_000
    ).toString()} ${currency}`
  }

  return (
    <div className='flex w-full flex-col'>
      <p className='text-2xl font-medium text-blue-600'>
        {getFormattedPrice()}
      </p>
      <p className='text-md font-light text-gray-400'>price per NFT</p>
    </div>
  )
}
