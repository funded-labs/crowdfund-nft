import Menu from "./menu";
import NFTs from "./nfts";
import Rewards from "./rewards";
import HowItWorks from "./how-it-works";
import ResaleSecondaryMarkets from "./resale-secondary-markets";

export default function NFTCollection() {
    return (
        <div className="w-full">
            <div className="w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row py-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-3/12 flex flex-col space-y-4">
                    <Menu />
                </div>

                <div className="w-full md:w-9/12 flex flex-col space-y-8">
                    <NFTs />
                    <Rewards />
                    <HowItWorks />
                    <ResaleSecondaryMarkets />
                </div>
            </div>
        </div>
    )
}