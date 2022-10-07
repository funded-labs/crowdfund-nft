import { List } from "./list";
import Search from "./search";
import { useProjectTokens, useProjectRewards } from "../../../hooks/use-project";

export default function NftRewardsTracking() {

    const { data: tokens } = useProjectTokens("qaa6y-5yaaa-aaaaa-aaafa-cai" ?? null)
    const { data: rewards } = useProjectRewards("qaa6y-5yaaa-aaaaa-aaafa-cai" ?? null)

    console.log("Tokens: ", tokens)
    console.log("Rewards: ", rewards)

    return (
        <div className="w-full flex flex-col space-y-4">
            <div className='w-full rounded-2xl shadow bg-white overflow-hidden flex flex-col p-4'>
                <div className="w-full flex flex-col">
                    <h3 className='text-2xl font-medium'>NFTs and reward tracking</h3>

                    <Search />

                    <List rewards={rewards} tokens={tokens} />
                </div>
            </div>
        </div>
    )
}