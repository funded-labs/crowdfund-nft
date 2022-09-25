import { List } from "./list";
import Search from "./search";

const _items = [
    {
        id: "127",
        thumbUrl: "",
        rewards: [
            {
                title: "Discord benefits",
                redeemedAt: new Date()
            },
            {
                title: "Project posting",
                redeemedAt: null
            },
            {
                title: "Early access to new projects",
                redeemedAt: null
            },
            {
                title: "Rarity raffle",
                redeemedAt: null
            },
        ]
    },
    {
        id: "129",
        thumbUrl: "",
        rewards: [
            {
                title: "Discord benefits",
                redeemedAt: new Date()
            },
            {
                title: "Project posting",
                redeemedAt: null
            },
            {
                title: "Early access to new projects",
                redeemedAt: null
            },
            {
                title: "Rarity raffle",
                redeemedAt: new Date()
            },
        ]
    }
]

export default function NftRewardsTracking() {
    return (
        <div className="w-full flex flex-col space-y-4">
            <div className='w-full rounded-2xl shadow bg-white overflow-hidden flex flex-col p-4'>
                <div className="w-full flex flex-col">
                    <h3 className='text-2xl font-medium'>NFTs and reward tracking</h3>

                    <Search />

                    <List items={_items} />
                </div>
            </div>
        </div>
    )
}