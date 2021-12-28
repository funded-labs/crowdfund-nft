export default function Steps() {
    return (
        <section className="w-full bg-gray-100 py-7">
            <div className="w-full max-w-5xl px-4 mx-auto flex grid grid-cols-3 gap-8 text-gray-600 text-sm">
                <div className="flex flex-row items-start w-full">
                    <div className="text-blue-600 text-2xl mr-2 font-bold">
                        1
                    </div>
                    <div className="font-medium">
                        Buy an NFT to support this project, with ownership of this NFT
                        comes the perks mentioned in the Campaign description below
                    </div>
                </div>

                <div className="flex flex-row items-start w-full">
                    <div className="text-blue-600 text-2xl mr-2 font-bold">
                        2
                    </div>
                    <div className="font-medium">
                        You will receive an email notification if this projct gets fully funded, where
                        your contractual right to perks will be sent, subject to proof of NFT
                        ownership.
                    </div>
                </div>

                <div className="flex flex-row items-start w-full">
                    <div className="text-blue-600 text-2xl mr-2 font-bold">
                        3
                    </div>
                    <div className="font-medium">
                        Your NFT will be delivered to your MetaMask or PlugWallet, where it is your
                        responsibility to keep ownership of this NFT - and your right to resell.
                    </div>
                </div>
            </div>
        </section>
    )
}