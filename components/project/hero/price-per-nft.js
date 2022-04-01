const _priceTiers = [
    {
        id: "bronze",
        label: "Bronze",
        price: 121000000
    },
    {
        id: "silver",
        label: "Silver",
        price: 190000000
    },
    {
        id: "gold",
        label: "Gold",
        price: 250000000
    },
]

export default function PricePerNFT({ nftPriceE8S, priceTiers = [] }) {

    if (_priceTiers.length > 1) {
        return (
            <div className="w-full flex flex-col">
                <p className="mb-1 text-gray-700 text-sm">
                    This project has {_priceTiers.length} reward {_priceTiers.length === 1 ? "tier" : "tiers"}.
                </p>
                <div className="w-full grid grid-cols-3 gap-3">
                    {_priceTiers.map(tier => (
                        <div className="bg-gray-50 border rounded-lg py-4 px-2">
                            <p className="text-xs text-center font-medium text-gray-500">{tier.label}</p>
                            <p className="font-bold text-4xl text-center">
                                {(tier.price / 100_000_000).toFixed(1).toString()}
                                <span className="text-base font-normal text-gray-500 pl-1">ICP</span>
                                <p className="text-xs font-light text-center text-gray-400">price per NFT</p>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col py-3'>
            <p className='text-blue-600 text-2xl font-medium'>
                {(nftPriceE8S / 100_000_000).toString()}{' '}ICP
            </p>
            <p className='text-gray-400 text-lg'>
                price per NFT
            </p>
        </div>
    )
}