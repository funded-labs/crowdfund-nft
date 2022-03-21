export default function HowItWorks() {
    return (
        <section className="w-full py-10 bg-blue-600 text-white">
            <div className="w-full max-w-5xl mx-auto flex flex-col">
                <div className="font-semibold text-3xl w-full text-center py-3">
                    How CrowdFund NFT works?
                </div>
                <p className="w-full text-center text-sm">
                    Crowdfunding on the Blockchain, using the Internet Computer.
                </p>
                <div className="w-full py-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="w-full flex flex-col items-center">
                        <img src="/assets/work_thumb_1.png" className="w-20 h-20" />
                        <p className="text-2xl font-semibold mt-2">
                            Log in with Internet Identity
                        </p>
                        <p className="text-center">
                            Both investors and creators can access the platform with internet identity, and connect with PlugWallet.
                        </p>
                    </div>

                    <div className="w-full flex flex-col items-center">
                        <img src="/assets/work_thumb_2.png" className="w-20 h-20" />
                        <p className="text-2xl font-semibold mt-2">
                            Launch or invest in projects
                        </p>
                        <p className="text-center">
                            Describe your new venture and how it is going to help the world! Browse projects to invest in.
                        </p>
                    </div>

                    <div className="w-full flex flex-col items-center">
                        <img src="/assets/work_thumb_3.png" className="w-20 h-20" />
                        <p className="text-2xl font-semibold mt-2">
                            Carry projects to their goal!
                        </p>
                        <p className="text-center">
                            Using NFTs as proof of ownership for investment, support projects through their journey!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}