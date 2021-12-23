import classNames from "classnames";

const tabs = [
    {
        label: "Campaign Details",
        id: "campaign-details",
    },
    {
        label: "NFT Collection",
        id: "nft-collection"
    },
    {
        label: "FAQs",
        id: "faqs"
    }
]

export default function Tabs({ selected, onSelect = () => {} }) {
    return (
        <section className="w-full border-b-2">
            <div className="w-full max-w-5xl px-4 mx-auto flex pt-1 text-gray-900">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={classNames(
                            "appearance-none rounded-none font-medium px-4 text-sm py-4",
                            "border-b-4 hover:text-gray-500",
                            selected === tab.id ? "border-blue-600" : "border-transparent"
                        )}
                        type="button"
                        onClick={() => onSelect(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </section>
    )
}