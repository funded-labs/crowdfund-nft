const nfts = [
    {
        id: "#1998"
    },
    {
        id: "#1996"
    },
    {
        id: "#8675"
    }
];

export default function NFTs({ selected = "story", onSelect = () => {} }) {
    return (
        <div className="w-full shadow p-4 rounded-2xl bg-white flex flex-col items-start">
            <p className="font-bold text-base text-black">
                NFT&apos;s
            </p>

            <p className="text-gray-600 my-10 w-full">
                When you invest in this project, you will be randomly allocated an NFT from the
                following collection:
            </p>

            <p className="text-center font-semibold w-full mb-10">
                Collection Title - &apos;10,000&apos; total NTF&apos;s
            </p>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
                {nfts.map(nft => (
                    <div key={nft.id} className="w-full flex flex-col space-y-2">
                        <p className="font-semibold">
                            {nft.id}
                        </p>
                        <figure className="w-full rounded-lg border bg-gray-300 h-40">
                            {/* <img src="" /> */}
                        </figure>
                    </div>
                ))}
            </div>
        </div>
    )
}