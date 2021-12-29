import Meta from "./meta";

export default function Hero() {
    return (
        <section className="w-full">
            <div className="w-full max-w-5xl mx-auto flex flex-col px-4">
                <p className="text-2xl font-medium">
                    Comic Book Reboot
                </p>
                <p className="text-lg text-gray-400">
                    Comic book designed by Catherine Lodef for NFT release January 2022
                </p>
                <div className="w-full flex flex-row space-x-8">
                    <div className="w-7/12 flex flex-col">
                        <figure className="w-full h-96 bg-yellow-500 rounded-xl mb-1"></figure>
                        <Meta />
                    </div>

                    <div className="w-5/12 flex flex-col">
                        <div className="h-3 bg-gray-200 rounded-full relative overflow-hidden">
                            <div className="absolute left-0 top-0 bg-blue-600 w-7/12 h-3 rounded-full" />
                        </div>
                        <div className="w-full flex flex-col py-3">
                            <p className="text-blue-600 text-2xl font-medium">
                                £39,543
                            </p>
                            <p className="text-gray-400 text-lg">
                                pledged of £51,000 goal
                            </p>
                        </div>
                        <div className="w-full flex flex-col py-3">
                            <p className="text-blue-600 text-2xl font-medium">
                                387
                            </p>
                            <p className="text-gray-400 text-lg">
                                backers
                            </p>
                        </div>
                        <div className="w-full flex flex-col py-3">
                            <p className="text-blue-600 text-2xl font-medium">
                                25
                            </p>
                            <p className="text-gray-400 text-lg">
                                days to go
                            </p>
                        </div>
                        <div className="w-full py-2">
                            <button
                                className={`
                                    shadow-lg bg-blue-600 text-white text-sm font-medium rounded-full w-full
                                    appearance-none focus:outline-none py-3 px-4 hover:bg-blue-700
                                `}
                            >
                                Back this project
                            </button>
                        </div>

                        <div className="w-full flex flex-row space-x-8 items-center">
                            <div className="w-6/12 p-3">
                                <button
                                    className={`
                                        bg-white border border-gray-300 py-3 w-full px-4 text-gray-900 text-sm
                                        hover:border-blue-600
                                    `}
                                >
                                    Remind me
                                </button>
                            </div>
                            <div className="w-6/12 flex flex-row justify-between">
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                                <span className="bg-gray-300 h-5 w-5 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}