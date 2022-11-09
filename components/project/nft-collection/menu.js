import classNames from "classnames";

const menuItems = [
    {
        label: "NFTs",
        id: "nfts"
    },
    {
        label: "Rewards",
        id: "rewards"
    },
    {
        label: "How it works",
        id: "how-it-works"
    },
    {
        label: "Resale & Secondary Market",
        id: "resale-and-secondary-market"
    }
];

export default function Menu({ selected = "nfts" }) {
    return (
        <div className="w-full  p-4 pl-0 ">
            <div className="w-full flex flex-col space-y-1">
                {menuItems.map(item => (
                    <a
                        key={item.id}
                        className={classNames(
                            "text-left appearance-none py-2 border-l-4 border-transparent",
                            "px-8 text-gray-400 cursor-pointer",
                            selected === item.id ? "border-blue-500 text-blue-500" : "hover:border-gray-100"
                        )}
                        href={`#nft-collection-${item.id}`}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    )
}