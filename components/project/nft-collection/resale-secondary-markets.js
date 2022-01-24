export default function ResaleSecondaryMarkets() {
    return (
        <>
            <div className="w-full shadow p-4 rounded-2xl bg-white flex flex-col items-start mb-5">
                <p className="font-bold text-base text-black">
                    Resale &amp; Secondary Markets
                </p>
                
                <div className="flex flex-col space-y-4 text-gray-600">
                    <p>
                        As a backer, who holds NFTs generated through Crowdfund NFT, you are
                        entitled to sell your NFTs on secondary marketplaces. However, buyers
                        on secondary marketplaces are not legally entitled to rewards. They are
                        simply buying the NFT itself, not the rewards associated with it.
                    </p>
                    <p>
                        Once NFTs reach secondary marketplaces, there is an exit from the
                        contractual agreement between backers and creators. The only legally binding
                        contact with regards to rewards exists between creators and backers on
                        Crowdfund NFT, secondary NFT owners and buyers do not form part of this legally
                        binding agreement. This means that creators are not obliged to provide rewards
                        to secondary NFT owners, although they can choose to do so if they please.
                    </p>
                </div>
            </div>
            
            <a
                className={`
                    bg-blue-600 text-white text-sm focus:outline-none hover:bg-blue-700
                    px-4 py-3 cursor-pointer w-full text-center
                `}
            >
                Read more about us in our T&amp;C's
            </a>
        </>
    )
}