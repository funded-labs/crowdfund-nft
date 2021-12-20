export default function Hero() {
    return (
        <section className="w-full py-20">
            <div className="w-full max-w-5xl mx-auto flex flex-col">
                <h1 className="text-3xl text-center">
                    Creative projects that push boundaries.<br />
                    Help fund them, with NFT's
                </h1>

                <div className="py-5 flex flex-col items-center">
                    <p className="text-gray-400 uppercase text-sm">
                        To date
                    </p>
                    <p className="text-3xl text-blue-600 font-semibold">
                        $3,000,000
                    </p>
                    <p className="text-gray-400 uppercase text-sm">
                        in funding
                    </p>
                </div>

                <div className="w-full max-w-lg mx-auto">
                    <div className="w-full flex flex-row justify-between">
                        <span className="inline-block">Design</span>
                        <span className="inline-block">Tech</span>
                        <span className="inline-block">Crypto</span>
                        <span className="inline-block">Film</span>
                        <span className="inline-block">Music</span>
                        <span className="inline-block">Art</span>
                    </div>
                </div>
            </div>
        </section>
    )
}