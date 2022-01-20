export default function HowItWorks() {
    return (
        <div className="w-full shadow p-4 rounded-2xl bg-white flex flex-col items-start">
            <p className="font-bold text-base text-black">
                How It Works
            </p>
            
            <div className="flex flex-col space-y-4 text-gray-600">
                <p>
                    When you invest in a project, you transfer ICP tokens into an escroc
                    wallet owned and controlled by Crowdfund NFT.
                </p>
                <p>
                    The reason for this is that projects do not receive any funds until they
                    meet their funding goal.
                </p>
                <p>
                    If a project does not meet its goal in the specified timeframe, investors
                    are reimbursed - they have only lost the transaction fee (only 0.001 ICP
                    flat fee per transaction).
                </p>
                <p>
                    If a project does meet its funding goalm then funds are released from The
                    Crowdfund NFT escroc wallet into the project creator's wallet. Similarly,
                    NFT's are delivered to investor wallets.
                </p>

                <img src="/assets/how-it-works.png" className="w-full" />
            </div>
        </div>
    )
}