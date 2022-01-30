export default function ResaleSecondaryMarkets() {
    return (
        <>
            <div id="nft-collection-resale-and-secondary-market" className="w-full shadow p-4 rounded-2xl bg-white flex flex-col items-start mb-5">
                <p className="font-bold text-base text-black">
                    Resale &amp; Secondary Markets
                </p>
                
                <div className="flex flex-col space-y-4 text-gray-600">
                    <p>
                        As a backer, who holds NFTs generated through Crowdfund NFT, you are
                        entitled to sell your NFTs on secondary marketplaces.
                    </p>
                    <p>
                        Once NFT’s reach secondary marketplaces, there is a transfer of the contractual agreement between backers and creators. The only legally binding contract with regards to rewards exists between creators and NFT holders, secondary NFT owners and buyers collect rights to all rewards that have not yet been delivered. This means that creators are obliged to provide rewards to secondary NFT owners.
                    </p>
                    <p>
                        Secondary market fees:
                    </p>
                    <p>
                        CrowdFund NFT charges a fee for selling NFT’s minted by CrowdFund NFT on secondary marketplaces. The “Royalty” fee will depend on the marketplace where the NFT is sold. In most cases, we will charge the maximum fee that the platform allows. To find out what this fee is, please visit the Terms of the NFT Marketplace you are using to resell NFT’s.
                    </p>
                </div>
            </div>
            
            <a
                className={`
                    bg-blue-600 text-white text-sm focus:outline-none hover:bg-blue-700
                    px-4 py-3 cursor-pointer w-full text-center
                `}
                href="/terms"
            >
                Read more about us in our T&amp;C's
            </a>
        </>
    )
}