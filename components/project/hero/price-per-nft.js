export default function PricePerNFT({ stats, currency, selectedTierState, }) {
    if (stats.nftStats.length > 1) {
        const tiers = stats.nftStats
        const [selectedTier, setSelectedTier] = selectedTierState
        return (
            <div className='w-full flex flex-col'>
                <p className='mb-1 text-gray-700 text-sm'>
                    This project has {tiers.length} reward tiers.
                </p>
                <div
                    className={`w-full grid grid-cols-${
                        tiers.length > 2 ? 3 : 2
                    } gap-${currency === "ICP" ? 3 : 1}`}>
                    {tiers.map((tier, index) => {
                        const isSelected = selectedTier === index
                        const soldOut = tier.sold >= tier.number
                        return (
                            <div
                                key={`tier${tier.priceE8S ? tier.priceE8S : tier.priceSatoshi}`}
                                className={`${
                                    isSelected ? 'border-blue-600' : ''
                                } ${
                                    soldOut ? 'opacity-40' : 'cursor-pointer'
                                } border bg-gray-50 rounded-lg py-4`}
                                onClick={() =>
                                    !soldOut && setSelectedTier(index)
                                }>
                                <p
                                    className={`font-bold text-2xl text-center ${
                                        isSelected
                                            ? 'text-blue-600'
                                            : 'text-black'
                                    }`}>
                                    <p className='text-xs font-light text-center text-gray-400'>
                                        Tier price
                                    </p>
                                    {((tier.priceE8S ? tier.priceE8S : tier.priceSatoshi) / 100_000_000)
                                        .toFixed(tier.priceSatoshi ? 3 : 1)
                                        .replace(/\.?0+$/, '')
                                        .toString()}
                                    <span
                                        className={`text-base font-normal pl-1 ${
                                            isSelected
                                                ? 'text-blue-600'
                                                : 'text-gray-500'
                                        }`}>
                                        {currency}
                                    </span>
                                    <p className='text-xs font-light text-center text-gray-400'>
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
        return `${((stats.nftStats[0].priceE8S ? stats.nftStats[0].priceE8S : stats.nftStats[0].priceSatoshi) / 100_000_000).toString()} ${currency}`
    }

    return (
        <div className='w-full flex flex-col'>
            <p className='text-blue-600 text-2xl font-medium'>
                <img src='/assets/IClogo.png' className='h-3 inline-block' />{' '}
                {getFormattedPrice()}
            </p>
            <p className='text-gray-400 text-md font-light'>price per NFT</p>
        </div>
    )
}
