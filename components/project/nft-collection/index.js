import Menu from "./menu";
import NFTs from "./nfts";

export default function NFTCollection() {
    return (
        <div className="w-full">
            <div className="w-full max-w-5xl mx-auto px-4 flex flex-row py-4 space-x-4">
                <div className="w-3/12 flex flex-col space-y-4">
                    <Menu />
                </div>

                <div className="w-9/12 flex flex-col">
                    <NFTs />
                </div>
            </div>
        </div>
    )
}