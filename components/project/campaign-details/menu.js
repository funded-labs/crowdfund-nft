import classNames from "classnames";

const menuItems = [
    {
        label: "Project overview",
        id: "story"
    },
    {
        label: "Rewards",
        id: "rewards"
    }
];

export default function Menu({ selected = "story", onSelect = () => {}, isLoading }) {
    if (isLoading) {
        return (
            <div className="w-full animate-pulse rounded-2xl bg-gray-200 h-64" />
        );
    }


    return (
        <div className="w-full  p-4 pl-0 rounded-2xl">
            <div className="w-full flex flex-col space-y-1">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={classNames(
                            "text-left appearance-none py-2 border-l-4 border-transparent",
                            "px-8 text-gray-400 cursor-pointer",
                            selected === item.id ? "border-blue-500 text-blue-500" : "hover:border-gray-100"
                        )}
                        onClick={() => onSelect(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    )
}